import AMX from './AMX';
export default class FunctionStub {
    name: string;
    buffer: Buffer;
    index: number;
    constructor(amx: AMX, offset: number, index: number);
    address: number;
}
