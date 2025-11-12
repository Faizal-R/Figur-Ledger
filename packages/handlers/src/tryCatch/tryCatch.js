"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = void 0;
const response_1 = require("../response/response");
const tryCatch = (controllerFn) => {
    return async (req, res, next) => {
        try {
            await controllerFn(req, res, next);
        }
        catch (error) {
            (0, response_1.errorResponse)(res, error);
        }
    };
};
exports.tryCatch = tryCatch;
