import { E_HTTP, E_TOKEN, I_BLOCK_STATIC_WALLET_REQUEST, I_BLOCK_STATIC_WALLET_RESPONSE, I_CREATE_PAYMENT_REQUEST, I_CREATE_PAYMENT_RESPONSE, I_CREATE_STATIC_WALLET_REQUEST, I_CREATE_STATIC_WALLET_RESPONSE, I_GEN_QR_REQUEST, I_GEN_QR_RESPONSE, I_PAYMENT_INFO_REQUEST, I_PAYMENT_INFO_RESPONSE, I_PAYMENT_REFUND_REQUEST, I_PAYMENT_REFUND_RESPONSE, I_REFUND_FROM_BLOCK_WALLET_REQUEST, I_REFUND_FROM_BLOCK_WALLET_RESPONSE, I_RESEND_WEBHOOK_REQUEST, I_RESEND_WEBHOOK_RESPONSE, I_TEST_WEBHOOK_REQUEST, I_TEST_WEBHOOK_RESPONSE } from './types';
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
     * Blocks a static wallet.
     *
     * @param {I_BLOCK_STATIC_WALLER_REQUEST} options - The options for blocking the wallet.
     * @return {Promise<I_BLOCK_STATIC_WALLER_RESPONSE>} - A promise that resolves to the response of the blocking operation.
     */
    blockStaticWallet(options: I_BLOCK_STATIC_WALLET_REQUEST): Promise<I_BLOCK_STATIC_WALLET_RESPONSE>;
    /**
     * Refunds from a blocked wallet.
     *
     * @param {I_REFUND_FROM_BLOCK_WALLET_REQUEST} options - The options for the refund request.
     * @return {Promise<I_REFUND_FROM_BLOCK_WALLET_RESPONSE>} - A promise that resolves to the refund response.
     */
    refundFromBlockedWallet(options: I_REFUND_FROM_BLOCK_WALLET_REQUEST): Promise<I_REFUND_FROM_BLOCK_WALLET_RESPONSE>;
    /**
     * Retrieves the payment information based on the provided options.
     *
     * @param {I_PAYMENT_INFO_REQUEST} options - The payment information request options.
     * @return {Promise<I_PAYMENT_INFO_RESPONSE>} The payment information response.
     */
    getPayment(options: I_PAYMENT_INFO_REQUEST): Promise<I_PAYMENT_INFO_RESPONSE>;
    /**
     * Refunds a payment.
     *
     * @param {I_PAYMENT_REFUND_REQUEST} options - The options for refunding the payment.
     * @return {Promise<I_PAYMENT_REFUND_RESPONSE>} The response containing the refund details.
     */
    refundPayment(options: I_PAYMENT_REFUND_REQUEST): Promise<I_PAYMENT_REFUND_RESPONSE>;
    /**
     * Asynchronously resends a webhook.
     *
     * @param {I_RESEND_WEBHOOK_REQUEST} options - The options for resending the webhook.
     * @return {Promise<I_RESEND_WEBHOOK_RESPONSE>} - The response from the resend request.
     */
    resendWebhook(options: I_RESEND_WEBHOOK_REQUEST): Promise<I_RESEND_WEBHOOK_RESPONSE>;
    /**
     * Sends a test webhook request and returns the response.
     *
     * @param {I_TEST_WEBHOOK_REQUEST} options - The options for the test webhook request.
     * @return {Promise<I_TEST_WEBHOOK_RESPONSE>} - A promise that resolves to the response of the test webhook request.
     */
    testPaymentWebhook(options: I_TEST_WEBHOOK_REQUEST): Promise<I_TEST_WEBHOOK_RESPONSE>;
    /**
     * Sends a test payout webhook request and returns the response.
     *
     * @param {I_TEST_WEBHOOK_REQUEST} options - The options for the test webhook request.
     * @return {Promise<I_TEST_WEBHOOK_RESPONSE>} - The response from the test webhook request.
     */
    testPayoutWebhook(options: I_TEST_WEBHOOK_REQUEST): Promise<I_TEST_WEBHOOK_RESPONSE>;
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
