export class CryptomusError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "CryptomusError";
    }
}