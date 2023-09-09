"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cryptomus = void 0;
const crypto_1 = require("crypto");
const types_1 = require("./types");
const errors_1 = require("./errors");
const axios_1 = require("axios");
class Cryptomus {
    merchant;
    paymentToken;
    payoutToken;
    constructor(merchant, paymentToken, payoutToken) {
        this.merchant = merchant;
        this.paymentToken = paymentToken;
        this.payoutToken = payoutToken;
    }
    /**
     * Sends a request to the specified route using the given HTTP method and token type.
     *
     * @param {E_HTTP} method - The HTTP method to use for the request.
     * @param {E_TOKEN} type - The type of token to use for authentication.
     * @param {string} route - The route to send the request to.
     * @param {Record<string, any>} data - The data to include in the request.
     * @return {Promise<T>} - A promise that resolves with the response data.
     */
    async request(method, type, route, data) {
        try {
            let response = await axios_1.default.request({
                method,
                url: `https://api.cryptomus.com/${route}`,
                params: method === types_1.E_HTTP.GET ? data : undefined,
                data: method === types_1.E_HTTP.POST ? JSON.stringify(data) : undefined,
                headers: {
                    "Content-Type": "application/json",
                    "Merchant": this.merchant,
                    "Sign": this.makeSignatue(data, type === types_1.E_TOKEN.PAYMENT ? this.paymentToken : this.payoutToken),
                }
            });
            return response.data;
        }
        catch (error) {
            throw new errors_1.CryptomusError(JSON.stringify(error.response.data, undefined, 4));
        }
    }
    /**
     * Creates a payment.
     *
     * @param {I_CREATE_PAYMENT_REQUEST} options - The payment options.
     * @return {Promise<I_CREATE_PAYMENT_RESPONSE>} The response of creating a payment.
     */
    async createPayment(options) {
        return await this.request(types_1.E_HTTP.POST, types_1.E_TOKEN.PAYMENT, "v1/payment", options);
    }
    /**
     * Creates a static wallet.
     *
     * @param {I_CREATE_STATIC_WALLET_REQUEST} options - The options for creating the static wallet.
     * @return {Promise<I_CREATE_STATIC_WALLET_RESPONSE>} A promise that resolves with the response of creating the static wallet.
     */
    async createStaticWallet(options) {
        return await this.request(types_1.E_HTTP.POST, types_1.E_TOKEN.PAYMENT, "v1/wallet", options);
    }
    /**
     * Generates a QR code based on the provided options.
     *
     * @param {I_GEN_QR_REQUEST} options - The options for generating the QR code.
     * @return {Promise<I_GEN_QR_RESPONSE>} - A promise that resolves to the generated QR code response.
     */
    async genQr(options) {
        return await this.request(types_1.E_HTTP.POST, types_1.E_TOKEN.PAYMENT, "v1/wallet/qr", options);
    }
    /**
     * Blocks a static wallet.
     *
     * @param {I_BLOCK_STATIC_WALLER_REQUEST} options - The options for blocking the wallet.
     * @return {Promise<I_BLOCK_STATIC_WALLER_RESPONSE>} - A promise that resolves to the response of the blocking operation.
     */
    async blockStaticWallet(options) {
        return await this.request(types_1.E_HTTP.POST, types_1.E_TOKEN.PAYMENT, "v1/wallet/block-address", options);
    }
    /**
     * Refunds from a blocked wallet.
     *
     * @param {I_REFUND_FROM_BLOCK_WALLET_REQUEST} options - The options for the refund request.
     * @return {Promise<I_REFUND_FROM_BLOCK_WALLET_RESPONSE>} - A promise that resolves to the refund response.
     */
    async refundFromBlockedWallet(options) {
        return await this.request(types_1.E_HTTP.POST, types_1.E_TOKEN.PAYMENT, "v1/wallet/blocked-address-refund", options);
    }
    /**
     * Retrieves the payment information based on the provided options.
     *
     * @param {I_PAYMENT_INFO_REQUEST} options - The payment information request options.
     * @return {Promise<I_PAYMENT_INFO_RESPONSE>} The payment information response.
     */
    async getPayment(options) {
        return await this.request(types_1.E_HTTP.POST, types_1.E_TOKEN.PAYMENT, "v1/payment/info", options);
    }
    /**
     * Generates a signature for the given data and key.
     *
     * @param {Record<string, any>} data - The data to generate the signature for.
     * @param {string} key - The key used in the signature generation.
     * @return {string} The generated signature.
     */
    makeSignatue(data, key) {
        const signatue = (0, crypto_1.createHash)('md5')
            .update(Buffer.from(JSON.stringify(data).replace(/\//g, '\\/')).toString('base64') + key)
            .digest('hex');
        return signatue;
    }
    /**
     * Verifies the signature of the given data.
     *
     * @param {Record<string, any>} data - The data to verify the signature for.
     * @return {boolean} Returns true if the signature is valid, false otherwise.
     */
    verifySignatue(data) {
        let remote = data['sign'];
        delete data['sign'];
        return remote === this.makeSignatue(data, this.paymentToken);
    }
}
exports.Cryptomus = Cryptomus;
