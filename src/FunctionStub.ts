import AMX from './AMX';

const SIZEOF_FUNCSTUB: number = 20;
const SIZEOF_FUNCSTUBNT: number = 8;

export default class FunctionStub {
  public name: string;
  public buffer: Buffer;
  public index: number;
  
  constructor(amx: AMX, offset: number, index: number) {
    let nameOffset: number;

    if (!amx)
      throw new Error('AMX cannot be null.');

    if (amx.base!.defsize === SIZEOF_FUNCSTUBNT) {
      nameOffset = amx.buffer.readInt32LE(
        offset + index * SIZEOF_FUNCSTUBNT + 4
      );
    } else
      nameOffset = offset + index * SIZEOF_FUNCSTUB + 4;

    for (let char: number; char = amx.buffer[nameOffset++];)
      this.name += String.fromCharCode(char);

    this.buffer = amx.buffer.slice(offset + index * amx.base!.defsize);
    this.index = index;
  }

  // address
  public get address(): number {
    return this.buffer.readUInt32LE(0);
  }

  public set address(value: number) {
    this.buffer.writeUInt32LE(value, 0);
  }
}
