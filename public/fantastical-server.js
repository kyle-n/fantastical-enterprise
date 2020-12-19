"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT || 8080);
