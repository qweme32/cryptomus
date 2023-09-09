"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptomusError = void 0;
class CryptomusError extends Error {
    constructor(message) {
        super(message);
        this.name = "CryptomusError";
    }
}
exports.CryptomusError = CryptomusError;
