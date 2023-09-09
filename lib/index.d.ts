import { E_HTTP, E_TOKEN, I_CREATE_PAYMENT_REQUEST, I_CREATE_PAYMENT_RESPONSE } from './types';
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
