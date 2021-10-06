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
var _a = require('bottender/router'), router = _a.router, text = _a.text;
var axios = require('axios');
function App(context) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, router([
                    text(/(hi|hello)/i, SayHi),
                    text('台南', SendFood),
                    text('高雄', SendFood),
                    text('*', defaultReply),
                ])];
        });
    });
}
exports.default = App;
function SayHi(context) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.sendText('Hi!')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function defaultReply(context) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.sendText('聽不懂ㄟ = =')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function SendFood(context) {
    return __awaiter(this, void 0, void 0, function () {
        var url, data;
        var _this = this;
        return __generator(this, function (_a) {
            url = "http://localhost:8080/food/" + encodeURI(context.event.message.text);
            data = [];
            axios.get(url).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res.data.map(function (item) {
                                data.push(FoodBubble(item));
                            });
                            return [4 /*yield*/, context.sendFlex('This is a carousel flex', {
                                    type: 'carousel',
                                    contents: data,
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
var FoodBubble = function (item) {
    return {
        type: 'bubble',
        hero: {
            type: 'image',
            url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
            size: 'full',
            aspectRatio: '20:13',
        },
        body: {
            type: 'box',
            layout: 'vertical',
            contents: [
                {
                    type: 'text',
                    text: item.name,
                    weight: 'bold',
                    size: 'xl',
                },
                {
                    type: 'box',
                    layout: 'vertical',
                    margin: 'lg',
                    contents: [
                        {
                            type: 'box',
                            layout: 'baseline',
                            contents: [
                                {
                                    type: 'text',
                                    text: item.address,
                                    wrap: true,
                                    color: '#666666',
                                    size: 'sm',
                                    flex: 5,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        footer: {
            type: 'box',
            layout: 'vertical',
            contents: [
                {
                    type: 'button',
                    action: {
                        type: 'uri',
                        label: 'Link',
                        uri: item.link,
                    },
                },
            ],
        },
    };
};
