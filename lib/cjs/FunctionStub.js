"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var FunctionStub = /** @class */ (function () {
    function FunctionStub(amx, offset, index) {
        this.name = '';
        var nameOffset;
        if (amx.base.defSize === constants_1.SIZEOF_FUNCSTUBNT) {
            nameOffset = amx.buffer.readInt32LE(offset + index * constants_1.SIZEOF_FUNCSTUBNT + 4);
        }
        else
            nameOffset = offset + index * constants_1.SIZEOF_FUNCSTUB + 4;
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
exports.default = FunctionStub;
//# sourceMappingURL=FunctionStub.js.map