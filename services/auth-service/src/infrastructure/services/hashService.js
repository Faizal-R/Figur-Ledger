"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let HashService = class HashService {
    async hash(password) {
        return await bcryptjs_1.default.hash(password, 10);
    }
    async compare(plainPassword, hashedPassword) {
        return await bcryptjs_1.default.compare(plainPassword, hashedPassword);
    }
};
HashService = __decorate([
    (0, inversify_1.injectable)()
], HashService);
exports.default = HashService;
