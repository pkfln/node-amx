export default class AMXHeader {
    buffer: Buffer;
    constructor(buffer: Buffer);
    size: number;
    magic: number;
    file_version: number;
    amx_version: number;
    flags: number;
    defSize: number;
    cod: number;
    dat: number;
    hea: number;
    stp: number;
    cip: number;
    publics: number;
    natives: number;
    libraries: number;
    pubvars: number;
    tags: number;
    nametable: number;
}
