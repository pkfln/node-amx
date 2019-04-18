import * as fs from 'fs-extra';

import AMXHeader from './AMXHeader';
import FunctionStub from './FunctionStub';
import {
  AMX_MAGIC,
  AMX_FLAG_COMPACT,
  AMX_CELL_SIZE,
  AMX_COMPACTMARGIN,
  AMX_MIN_FILE_VERSION,
  AMX_CUR_FILE_VERSION,
  BYTE_SIZE,
} from './constants';

export default class AMX {
  public base: AMXHeader;
  public code: Buffer;
  public codeSize: number;
  public hlw: number;
  public stp: number;
  public hea: number;
  public stk: number;
  public cip: number;
  public frm: number;
  public alt: number;
  public reset_stk: number;
  public reset_hea: number;
  public paramcount: number;
  public debug: number;
  public flags: number;
  public error: number;
  public pri: number;
  public sysreq_d: number;
  public publics: FunctionStub[];
  public natives: FunctionStub[];
  public buffer: Buffer;
  public callbacks: Object;

  constructor(buffer: Buffer) {
    if (!buffer)
      throw new Error('A Buffer must be provided.');

    const amxHeader: AMXHeader = new AMXHeader(buffer);
    const code: Buffer = buffer.slice(amxHeader.cod);

    if (amxHeader.magic !== AMX_MAGIC)
      throw new Error('AMX_ERR_FORMAT: Magic constant does not match.');

    if (amxHeader.file_version < AMX_MIN_FILE_VERSION || amxHeader.amx_version > AMX_CUR_FILE_VERSION)
      throw new Error('AMX_ERR_VERSION: Version not supported.');

    if (!amxHeader.stp)
      throw new Error('AMX_ERR_FORMAT');
    
    if (!((amxHeader.flags & AMX_FLAG_COMPACT) !== 0 || amxHeader.hea === amxHeader.size))
      throw new Error(); // TODO

    if ((amxHeader.flags & AMX_FLAG_COMPACT) !== 0)
      AMX.expand(code, amxHeader.size - amxHeader.cod, amxHeader.hea - amxHeader.cod);

    this.base = amxHeader;
    this.buffer = buffer;
    this.code = code;

    this.hlw = amxHeader.hea - amxHeader.dat;
    this.stp = amxHeader.stp - amxHeader.dat - AMX_CELL_SIZE;
    this.hea = this.hlw;
    this.stk = this.stp;
    
    this.codeSize = amxHeader.dat - amxHeader.cod;

    const data: Buffer = buffer.slice(amxHeader.dat);
    data.writeInt32LE(0, amxHeader.stp - amxHeader.dat - AMX_CELL_SIZE);

    const publicsCount: number = (amxHeader.natives - amxHeader.publics) / amxHeader.defSize;
    for (let i: number = 0; i < publicsCount; i++)
      this.publics.push(new FunctionStub(this, amxHeader.publics, i));

    const nativesCount: number = (amxHeader.libraries - amxHeader.natives) / amxHeader.defSize;
    for (let i: number = 0; i < nativesCount; i++)
      this.natives.push(new FunctionStub(this, amxHeader.natives, i));
  }

  private static expand(code: Buffer, codeSize: number, memSize: number): void {
    interface ISpare {
      memloc: number;
      c: number;
    }
    
    let c: number = 0, spare: ISpare[] = [];
    for (let i: number = 0; i < AMX_COMPACTMARGIN; i++)
      spare[i] = { memloc: 0, c: 0 };

    let sh: number = 0, st: number = 0, sc: number = 0, shift: number = 0;

    if ((memSize % AMX_CELL_SIZE) === 0)
      throw new Error(); // TODO

    while (codeSize > 0) {
      do {
        codeSize--;
      
        if (!(shift < 8 * AMX_CELL_SIZE))
          throw new Error(); // TODO

        if (!(shift > 0 || (code[codeSize] & 0x80) === 0))
          throw new Error(); // TODO
        
        c |= (code[codeSize] & 0x7f) << shift;
        shift += 7;
      } while (codeSize > 0 && (code[codeSize - 1] & 0x80) !== 0);

      if ((code[codeSize] & 0x40) !== 0) {
        while (shift < 8 * AMX_CELL_SIZE) {
          c |= 0xff << shift;
          shift += 8;
        }
      }

      while (sc && spare[sh].memloc > codeSize) {
        code.writeInt32LE(spare[sh].c, spare[sh].memloc);
        sh = (sh + 1) % AMX_COMPACTMARGIN;
        sc--;
      }

      memSize -= AMX_CELL_SIZE;
      
      if (memSize < 0)
        throw new Error(); // TODO

      if (memSize > codeSize || (memSize === codeSize && memSize === 0))
        code.writeInt32LE(c, memSize);
      else {
        if (sc >= AMX_COMPACTMARGIN)
          throw new Error();
        
        spare[st].memloc = memSize;
        spare[st].c = c;
        st = (st + 1) % AMX_COMPACTMARGIN;
        sc++;
      }
    }
    
    if (memSize)
      throw new Error(); // TODO
  }

  private static memcmp(buffer1: Buffer, offset1: number, buffer2: Buffer, offset2: number, length: number): number {
    for (let i: number = 0; i < length; i++, offset1++, offset2++)
      if (buffer1[offset1] !== buffer2[offset2])
        return buffer1[offset1] - buffer2[offset2];
    
    return 0;
  }

  public static async fromFile(filePath: string): Promise<AMX> {
    if (!await fs.pathExists(filePath))
      throw new Error('Path does not exist.');
    
    const fd: number = await fs.open(filePath, 'r');
    const { bytesRead, buffer }: fs.ReadResult = await fs.read(fd, new Buffer(BYTE_SIZE), 0, BYTE_SIZE, 0);

    if (bytesRead < BYTE_SIZE) {
      await fs.close(fd);
      throw new Error('File size is less than AMX header size.');
    }

    const amxHeader: AMXHeader = new AMXHeader(buffer);
    const amxBuffer: Buffer = new Buffer(amxHeader.stp);
    const readResult: fs.ReadResult = await fs.read(fd, amxBuffer, 0, amxHeader.size, 0);

    if (readResult.bytesRead < amxHeader.size) {
      await fs.close(fd);
      throw new Error('File size is less than what AMX header specifies.');
    }

    return new AMX(amxBuffer);
  }
}
