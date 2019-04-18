import { BYTE_SIZE } from './constants';

export default class AMXHeader {
  public buffer: Buffer;

  constructor(buffer: Buffer) {
    if (!Buffer.isBuffer(buffer))
      buffer = Buffer.alloc(BYTE_SIZE);

    if (buffer.length < BYTE_SIZE)
      throw new Error('Buffer size is less than AMX header size.');

    this.buffer = buffer;
  }

  // size
  public get size(): number {
    return this.buffer.readInt32LE(0);
  }

  public set size(value: number) {
    this.buffer.writeInt32LE(value, 0);
  }

  // magic
  public get magic(): number {
    return this.buffer.readUInt16LE(4);
  }

  public set magic(value: number) {
    this.buffer.writeUInt16LE(value, 4);
  }

  // file_version
  public get file_version(): number {
    return this.buffer.readInt8(6);
  }

  public set file_version(value: number) {
    this.buffer.writeInt8(value, 6);
  }

  // amx_version
  public get amx_version(): number {
    return this.buffer.readInt8(7);
  }

  public set amx_version(value: number) {
    this.buffer.writeInt8(value, 7);
  }

  // flags
  public get flags(): number {
    return this.buffer.readInt16LE(8);
  }

  public set flags(value: number) {
    this.buffer.writeInt16LE(value, 8);
  }

  // defsize
  public get defSize(): number {
    return this.buffer.readInt16LE(10);
  }

  public set defSize(value: number) {
    this.buffer.writeInt16LE(value, 10);
  }

  // cod
  public get cod(): number {
    return this.buffer.readInt32LE(12);
  }

  public set cod(value: number) {
    this.buffer.writeInt32LE(value, 12);
  }

  // dat
  public get dat(): number {
    return this.buffer.readInt32LE(16);
  }

  public set dat(value: number) {
    this.buffer.writeInt32LE(value, 16);
  }

  // hea
  public get hea(): number {
    return this.buffer.readInt32LE(20);
  }

  public set hea(value: number) {
    this.buffer.writeInt32LE(value, 20);
  }

  // stp
  public get stp(): number {
    return this.buffer.readInt32LE(24);
  }

  public set stp(value: number) {
    this.buffer.writeInt32LE(value, 24);
  }

  // cip
  public get cip(): number {
    return this.buffer.readInt32LE(28);
  }

  public set cip(value: number) {
    this.buffer.writeInt32LE(value, 28);
  }

  // publics
  public get publics(): number {
    return this.buffer.readInt32LE(32);
  }

  public set publics(value: number) {
    this.buffer.writeInt32LE(value, 32);
  }

  // natives
  public get natives(): number {
    return this.buffer.readInt32LE(36);
  }

  public set natives(value: number) {
    this.buffer.writeInt32LE(value, 36);
  }

  // libraries
  public get libraries(): number {
    return this.buffer.readInt32LE(40);
  }

  public set libraries(value: number) {
    this.buffer.writeInt32LE(value, 40);
  }

  // pubvars
  public get pubvars(): number {
    return this.buffer.readInt32LE(44);
  }

  public set pubvars(value: number) {
    this.buffer.writeInt32LE(value, 44);
  }

  // tags
  public get tags(): number {
    return this.buffer.readInt32LE(0);
  }

  public set tags(value: number) {
    this.buffer.writeInt32LE(value, 0);
  }

  // nametable
  public get nametable(): number {
    return this.buffer.readInt32LE(52);
  }

  public set nametable(value: number) {
    this.buffer.writeInt32LE(value, 52);
  }
}
