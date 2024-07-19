"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericError {
    constructor(httpCode, errorMessage) {
        this.httpCode = httpCode;
        this.errorMessage = errorMessage;
    }
    getResponse() {
        return {
            httpCode: this.httpCode,
            errorMessage: this.errorMessage,
        };
    }
}
exports.default = GenericError;
