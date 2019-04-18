"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var AMXHeader = /** @class */ (function () {
    function AMXHeader(buffer) {
        if (!Buffer.isBuffer(buffer))
            buffer = Buffer.alloc(constants_1.BYTE_SIZE);
        if (buffer.length < constants_1.BYTE_SIZE)
            throw new Error('Buffer size is less than AMX header size.');
        this.buffer = buffer;
    }
    Object.defineProperty(AMXHeader.prototype, "size", {
        // size
        get: function () {
            return this.buffer.readInt32LE(0);
        },
        set: function (value) {
            this.buffer.writeInt32LE(value, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "magic", {
        // magic
        get: function () {
            return this.buffer.readUInt16LE(4);
        },
        set: function (value) {
            this.buffer.writeUInt16LE(value, 4);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "file_version", {
        // file_version
        get: function () {
            return this.buffer.readInt8(6);
        },
        set: function (value) {
            this.buffer.writeInt8(value, 6);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "amx_version", {
        // amx_version
        get: function () {
            return this.buffer.readInt8(7);
        },
        set: function (value) {
            this.buffer.writeInt8(value, 7);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "flags", {
        // flags
        get: function () {
            return this.buffer.readInt16LE(8);
        },
        set: function (value) {
            this.buffer.writeInt16LE(value, 8);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "defSize", {
        // defsize
        get: function () {
            return this.buffer.readInt16LE(10);
        },
        set: function (value) {
            this.buffer.writeInt16LE(value, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "cod", {
        // cod
        get: function () {
            return this.buffer.readInt32LE(12);
        },
        set: function (value) {
            this.buffer.writeInt32LE(value, 12);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "dat", {
        // dat
        get: function () {
            return this.buffer.readInt32LE(16);
        },
        set: function (value) {
            this.buffer.writeInt32LE(value, 16);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "hea", {
        // hea
        get: function () {
            return this.buffer.readInt32LE(20);
        },
        set: function (value) {
            this.buffer.writeInt32LE(value, 20);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "stp", {
        // stp
        get: function () {
            return this.buffer.readInt32LE(24);
        },
        set: function (value) {
            this.buffer.writeInt32LE(value, 24);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "cip", {
        // cip
        get: function () {
            return this.buffer.readInt32LE(28);
        },
        set: function (value) {
            this.buffer.writeInt32LE(value, 28);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "publics", {
        // publics
        get: function () {
            return this.buffer.readInt32LE(32);
        },
        set: function (value) {
            this.buffer.writeInt32LE(value, 32);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "natives", {
        // natives
        get: function () {
            return this.buffer.readInt32LE(36);
        },
        set: function (value) {
            this.buffer.writeInt32LE(value, 36);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "libraries", {
        // libraries
        get: function () {
            return this.buffer.readInt32LE(40);
        },
        set: function (value) {
            this.buffer.writeInt32LE(value, 40);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "pubvars", {
        // pubvars
        get: function () {
            return this.buffer.readInt32LE(44);
        },
        set: function (value) {
            this.buffer.writeInt32LE(value, 44);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "tags", {
        // tags
        get: function () {
            return this.buffer.readInt32LE(0);
        },
        set: function (value) {
            this.buffer.writeInt32LE(value, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMXHeader.prototype, "nametable", {
        // nametable
        get: function () {
            return this.buffer.readInt32LE(52);
        },
        set: function (value) {
            this.buffer.writeInt32LE(value, 52);
        },
        enumerable: true,
        configurable: true
    });
    return AMXHeader;
}());
exports.default = AMXHeader;
//# sourceMappingURL=AMXHeader.js.map