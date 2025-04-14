"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.getIpv6ByInterface = getIpv6ByInterface;
exports.getIpv6ByCmd = getIpv6ByCmd;
var child_process_1 = require("child_process");
var iconv = require("iconv-lite"); // 需要先安装 npm install iconv-lite
/**
 * 通过 API 获取 IPv6
 * @returns {string} IPv6地址
 */
function getIpv6ByInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch('https://api6.ipify.org?format=json')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.ip];
                case 3: return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.error('Error fetching public IPv6:', e_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, null];
            }
        });
    });
}
/**
 * 通过命令行获取 IPv6
 * @returns {string} IPv6地址
 */
function getIpv6ByCmd() {
    try {
        // 执行命令并获取 GBK 编码的输出
        var output = (0, child_process_1.execSync)('ipconfig /all', { encoding: 'buffer' });
        // 使用 iconv-lite 转换编码
        var decodedOutput = iconv.decode(output, 'utf-8');
        // console.log(decodedOutput)
        var lines = decodedOutput.split('\r\n');
        var tempPattern = /Temporary/; // 匹配包含"临时"的行
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (tempPattern.test(line)) {
                // 匹配 IPv6 地址格式
                console.log(line);
                var ipv6Regex = /([0-9a-f:%]{5,})/;
                var match = line.match(ipv6Regex);
                if (match && match[0]) {
                    return match[0];
                }
            }
        }
        console.error('No temporary IPv6 address found!');
    }
    catch (e) {
        console.error('Error executing command:', e);
    }
    return "";
}
// console.log(getIpv6ByInterface())
// console.log(getIpv6ByCmd())
