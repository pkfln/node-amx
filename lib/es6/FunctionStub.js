import { SIZEOF_FUNCSTUB, SIZEOF_FUNCSTUBNT } from './constants';
var FunctionStub = /** @class */ (function () {
    function FunctionStub(amx, offset, index) {
        this.name = '';
        var nameOffset;
        if (amx.base.defSize === SIZEOF_FUNCSTUBNT) {
            nameOffset = amx.buffer.readInt32LE(offset + index * SIZEOF_FUNCSTUBNT + 4);
        }
        else
            nameOffset = offset + index * SIZEOF_FUNCSTUB + 4;
        for (var char = 0; char = amx.buffer[nameOffset++];)
            this.name += String.fromCharCode(char);
        this.buffer = amx.buffer.slice(offset + index * amx.base.defSize);
        this.index = index;
    }
    Object.defineProperty(FunctionStub.prototype, "address", {
        // address
        get: function () {
            return this.buffer.readUInt32LE(0);
        },
        set: function (value) {
            this.buffer.writeUInt32LE(value, 0);
        },
        enumerable: true,
        configurable: true
    });
    return FunctionStub;
}());
export default FunctionStub;
//# sourceMappingURL=FunctionStub.js.map