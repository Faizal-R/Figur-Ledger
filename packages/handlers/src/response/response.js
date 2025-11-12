"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
exports.createResponse = createResponse;
const types_1 = require("@figur-ledger/types");
const utils_1 = require("@figur-ledger/utils");
function createResponse(response, statusCode, success, message, data = null) {
    response.status(statusCode).json({
        success,
        message,
        data,
    });
}
const errorResponse = (response, error) => {
    const errorMessage = error instanceof utils_1.CustomError
        ? error.message
        : error instanceof Error
            ? error.message
            : "Something unexpected happened";
    console.log("ErrorResponse : ", error);
    createResponse(response, error instanceof utils_1.CustomError
        ? error.statusCode
        : types_1.statusCodes.INTERNAL_SERVER_ERROR, false, errorMessage);
};
exports.errorResponse = errorResponse;
