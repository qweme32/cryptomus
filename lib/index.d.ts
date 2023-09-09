import { E_HTTP, E_TOKEN, I_CREATE_PAYMENT_REQUEST, I_CREATE_PAYMENT_RESPONSE, I_CREATE_STATIC_WALLET_REQUEST, I_CREATE_STATIC_WALLET_RESPONSE, I_GEN_QR_REQUEST, I_GEN_QR_RESPONSE } from './types';
export declare class Cryptomus {
    private readonly merchant;
    private readonly paymentToken;
    private readonly payoutToken;
    constructor(merchant: string, paymentToken: string, payoutToken: string);
    /**
     * Sends a request to the specified route using the given HTTP method and token type.
     *
     * @param {E_HTTP} method - The HTTP method to use for the request.
     * @param {E_TOKEN} type - The type of token to use for authentication.
     * @param {string} route - The route to send the request to.
     * @param {Record<string, any>} data - The data to include in the request.
     * @return {Promise<T>} - A promise that resolves with the response data.
     */
    request<T>(method: E_HTTP, type: E_TOKEN, route: string, data: Record<string, any>): Promise<T>;
    /**
     * Creates a payment.
     *
     * @param {I_CREATE_PAYMENT_REQUEST} options - The payment options.
     * @return {Promise<I_CREATE_PAYMENT_RESPONSE>} The response of creating a payment.
     */
    createPayment(options: I_CREATE_PAYMENT_REQUEST): Promise<I_CREATE_PAYMENT_RESPONSE>;
    /**
     * Creates a static wallet.
     *
     * @param {I_CREATE_STATIC_WALLET_REQUEST} options - The options for creating the static wallet.
     * @return {Promise<I_CREATE_STATIC_WALLET_RESPONSE>} A promise that resolves with the response of creating the static wallet.
     */
    createStaticWallet(options: I_CREATE_STATIC_WALLET_REQUEST): Promise<I_CREATE_STATIC_WALLET_RESPONSE>;
    /**
     * Generates a QR code based on the provided options.
     *
     * @param {I_GEN_QR_REQUEST} options - The options for generating the QR code.
     * @return {Promise<I_GEN_QR_RESPONSE>} - A promise that resolves to the generated QR code response.
     */
    genQr(options: I_GEN_QR_REQUEST): Promise<I_GEN_QR_RESPONSE>;
    /**
     * Generates a signature for the given data and key.
     *
     * @param {Record<string, any>} data - The data to generate the signature for.
     * @param {string} key - The key used in the signature generation.
     * @return {string} The generated signature.
     */
    makeSignatue(data: Record<string, any>, key: string): string;
    /**
     * Verifies the signature of the given data.
     *
     * @param {Record<string, any>} data - The data to verify the signature for.
     * @return {boolean} Returns true if the signature is valid, false otherwise.
     */
    verifySignatue(data: Record<string, any>): boolean;
}
