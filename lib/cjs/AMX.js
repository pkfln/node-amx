"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs-extra");
var AMXHeader_1 = require("./AMXHeader");
var FunctionStub_1 = require("./FunctionStub");
var constants_1 = require("./constants");
var AMX = /** @class */ (function () {
    function AMX(buffer) {
        this.publics = [];
        this.natives = [];
        if (!buffer)
            throw new Error('A Buffer must be provided.');
        var amxHeader = new AMXHeader_1.default(buffer);
        var code = buffer.slice(amxHeader.cod);
        if (amxHeader.magic !== constants_1.AMX_MAGIC)
            throw new Error('AMX_ERR_FORMAT: Magic constant does not match.');
        if (amxHeader.file_version < constants_1.AMX_MIN_FILE_VERSION || amxHeader.amx_version > constants_1.AMX_CUR_FILE_VERSION)
            throw new Error('AMX_ERR_VERSION: Version not supported.');
        if (!amxHeader.stp)
            throw new Error('AMX_ERR_FORMAT');
        if (!((amxHeader.flags & constants_1.AMX_FLAG_COMPACT) !== 0 || amxHeader.hea === amxHeader.size))
            throw new Error(); // TODO
        if ((amxHeader.flags & constants_1.AMX_FLAG_COMPACT) !== 0)
            AMX.expand(code, amxHeader.size - amxHeader.cod, amxHeader.hea - amxHeader.cod);
        this.base = amxHeader;
        this.buffer = buffer;
        this.code = code;
        this.hlw = amxHeader.hea - amxHeader.dat;
        this.stp = amxHeader.stp - amxHeader.dat - constants_1.AMX_CELL_SIZE;
        this.hea = this.hlw;
        this.stk = this.stp;
        this.codeSize = amxHeader.dat - amxHeader.cod;
        var data = buffer.slice(amxHeader.dat);
        data.writeInt32LE(0, amxHeader.stp - amxHeader.dat - constants_1.AMX_CELL_SIZE);
        var publicsCount = (amxHeader.natives - amxHeader.publics) / amxHeader.defSize;
        for (var i = 0; i < publicsCount; i++)
            this.publics.push(new FunctionStub_1.default(this, amxHeader.publics, i));
        var nativesCount = (amxHeader.libraries - amxHeader.natives) / amxHeader.defSize;
        for (var i = 0; i < nativesCount; i++)
            this.natives.push(new FunctionStub_1.default(this, amxHeader.natives, i));
    }
    AMX.expand = function (code, codeSize, memSize) {
        var c = 0, spare = [];
        for (var i = 0; i < constants_1.AMX_COMPACTMARGIN; i++)
            spare[i] = { memloc: 0, c: 0 };
        var sh = 0, st = 0, sc = 0, shift = 0;
        if ((memSize % constants_1.AMX_CELL_SIZE) !== 0)
            throw new Error(); // TODO
        while (codeSize > 0) {
            do {
                codeSize--;
                //if (!(shift < 8 * AMX_CELL_SIZE))
                //  throw new Error(); // TODO
                if (!(shift > 0 || (code[codeSize] & 0x80) === 0))
                    throw new Error(); // TODO
                c |= (code[codeSize] & 0x7f) << shift;
                shift += 7;
            } while (codeSize > 0 && (code[codeSize - 1] & 0x80) !== 0);
            if ((code[codeSize] & 0x40) !== 0) {
                while (shift < 8 * constants_1.AMX_CELL_SIZE) {
                    c |= 0xff << shift;
                    shift += 8;
                }
            }
            while (sc && spare[sh].memloc > codeSize) {
                code.writeInt32LE(spare[sh].c, spare[sh].memloc);
                sh = (sh + 1) % constants_1.AMX_COMPACTMARGIN;
                sc--;
            }
            memSize -= constants_1.AMX_CELL_SIZE;
            if (memSize < 0)
                throw new Error(); // TODO
            if (memSize > codeSize || (memSize === codeSize && memSize === 0))
                code.writeInt32LE(c, memSize);
            else {
                if (sc >= constants_1.AMX_COMPACTMARGIN)
                    throw new Error();
                spare[st].memloc = memSize;
                spare[st].c = c;
                st = (st + 1) % constants_1.AMX_COMPACTMARGIN;
                sc++;
            }
        }
        if (memSize)
            throw new Error(); // TODO
    };
    // @ts-ignore
    AMX.memcmp = function (buffer1, offset1, buffer2, offset2, length) {
        for (var i = 0; i < length; i++, offset1++, offset2++)
            if (buffer1[offset1] !== buffer2[offset2])
                return buffer1[offset1] - buffer2[offset2];
        return 0;
    };
    AMX.fromFile = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var fd, _a, bytesRead, buffer, amxHeader, amxBuffer, readResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fs.pathExists(filePath)];
                    case 1:
                        if (!(_b.sent()))
                            throw new Error('Path does not exist.');
                        return [4 /*yield*/, fs.open(filePath, 'r')];
                    case 2:
                        fd = _b.sent();
                        return [4 /*yield*/, fs.read(fd, Buffer.alloc(constants_1.BYTE_SIZE), 0, constants_1.BYTE_SIZE, 0)];
                    case 3:
                        _a = _b.sent(), bytesRead = _a.bytesRead, buffer = _a.buffer;
                        if (!(bytesRead < constants_1.BYTE_SIZE)) return [3 /*break*/, 5];
                        return [4 /*yield*/, fs.close(fd)];
                    case 4:
                        _b.sent();
                        throw new Error('File size is less than AMX header size.');
                    case 5:
                        amxHeader = new AMXHeader_1.default(buffer);
                        amxBuffer = Buffer.alloc(amxHeader.stp);
                        return [4 /*yield*/, fs.read(fd, amxBuffer, 0, amxHeader.size, 0)];
                    case 6:
                        readResult = _b.sent();
                        if (!(readResult.bytesRead < amxHeader.size)) return [3 /*break*/, 8];
                        return [4 /*yield*/, fs.close(fd)];
                    case 7:
                        _b.sent();
                        throw new Error('File size is less than what AMX header specifies.');
                    case 8: return [2 /*return*/, new AMX(amxBuffer)];
                }
            });
        });
    };
    return AMX;
}());
exports.default = AMX;
//# sourceMappingURL=AMX.js.map