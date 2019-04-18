import Opcode from './Opcode';
import AMXHeader from './AMXHeader';
import FunctionStub from './FunctionStub';

const AMX_COMPACTMARGIN: number = 64;
const AMX_CELL_SIZE: number = 4;
const AMX_FLAG_COMPACT: number = 0x04;
const AMX_EXEC_MAIN: number = -1;
const AMX_EXEC_CONT: number = -2;

export default class AMX {
  public base: AMXHeader | null = null;
  public code: Buffer | null = null;
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
}
