"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let JwtService = class JwtService {
    accessSecret;
    refreshSecret;
    accessTokenExpiry;
    refreshTokenExpiry;
    constructor() {
        this.accessSecret = process.env.ACCESS_TOKEN_SECRET;
        this.refreshSecret = process.env.REFRESH_TOKEN_SECRET;
        this.accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
        this.refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;
    }
    signAccessToken(payload) {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        };
        return jsonwebtoken_1.default.sign(payload, secret, options);
    }
    signRefreshToken(payload) {
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: process.env
                .REFRESH_TOKEN_EXPIRY,
        };
        return jsonwebtoken_1.default.sign(payload, secret, options);
    }
    verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, this.accessSecret);
    }
    verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, this.refreshSecret);
    }
    decode(token) {
        const decoded = jsonwebtoken_1.default.decode(token);
        if (!decoded || typeof decoded === "string")
            return null;
        return decoded;
    }
    generateTokenId() {
        return (0, zod_1.uuidv4)().toString();
    }
};
JwtService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], JwtService);
exports.default = JwtService;
