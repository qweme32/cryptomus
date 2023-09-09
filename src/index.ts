import { createHash } from 'crypto';
import { E_HTTP, E_TOKEN, I_BLOCK_STATIC_WALLET_REQUEST, I_BLOCK_STATIC_WALLET_RESPONSE, I_CREATE_PAYMENT_REQUEST, I_CREATE_PAYMENT_RESPONSE, I_CREATE_STATIC_WALLET_REQUEST, I_CREATE_STATIC_WALLET_RESPONSE, I_GEN_QR_REQUEST, I_GEN_QR_RESPONSE, I_PAYMENT_INFO_REQUEST, I_PAYMENT_INFO_RESPONSE, I_REFUND_FROM_BLOCK_WALLET_REQUEST, I_REFUND_FROM_BLOCK_WALLET_RESPONSE } from './types';
import { CryptomusError } from './errors';
import axios, { AxiosError } from 'axios';

export class Cryptomus {
    constructor(
        private readonly merchant: string, 
        private readonly paymentToken: string,
        private readonly payoutToken: string,
    ) {}

    /**
     * Sends a request to the specified route using the given HTTP method and token type.
     *
     * @param {E_HTTP} method - The HTTP method to use for the request.
     * @param {E_TOKEN} type - The type of token to use for authentication.
     * @param {string} route - The route to send the request to.
     * @param {Record<string, any>} data - The data to include in the request.
     * @return {Promise<T>} - A promise that resolves with the response data.
     */
    async request<T>( method: E_HTTP, type: E_TOKEN, route: string, data: Record<string, any> ): Promise<T> {
        try {
            let response = await axios.request({
                method,
                url: `https://api.cryptomus.com/${route}`,
                params: method === E_HTTP.GET ? data : undefined,
                data: method === E_HTTP.POST ? JSON.stringify(data) : undefined,
                headers: {
                    "Content-Type": "application/json",
                    "Merchant": this.merchant,
                    "Sign": this.makeSignatue( data, type === E_TOKEN.PAYMENT ? this.paymentToken : this.payoutToken ),
                }
            })
    
            return <T>response.data;
        } catch ( error ) {
            throw new CryptomusError( JSON.stringify(error.response.data, undefined, 4) );
        }
    }

    /**
     * Creates a payment.
     *
     * @param {I_CREATE_PAYMENT_REQUEST} options - The payment options.
     * @return {Promise<I_CREATE_PAYMENT_RESPONSE>} The response of creating a payment.
     */
    async createPayment( options: I_CREATE_PAYMENT_REQUEST ): Promise<I_CREATE_PAYMENT_RESPONSE> {
        return await this.request<I_CREATE_PAYMENT_RESPONSE>( E_HTTP.POST, E_TOKEN.PAYMENT, "v1/payment", options );
    }

    /**
     * Creates a static wallet.
     *
     * @param {I_CREATE_STATIC_WALLET_REQUEST} options - The options for creating the static wallet.
     * @return {Promise<I_CREATE_STATIC_WALLET_RESPONSE>} A promise that resolves with the response of creating the static wallet.
     */
    async createStaticWallet( options: I_CREATE_STATIC_WALLET_REQUEST ): Promise<I_CREATE_STATIC_WALLET_RESPONSE> {
        return await this.request<I_CREATE_STATIC_WALLET_RESPONSE>( E_HTTP.POST, E_TOKEN.PAYMENT, "v1/wallet", options );
    }

    /**
     * Generates a QR code based on the provided options.
     *
     * @param {I_GEN_QR_REQUEST} options - The options for generating the QR code.
     * @return {Promise<I_GEN_QR_RESPONSE>} - A promise that resolves to the generated QR code response.
     */
    async genQr( options: I_GEN_QR_REQUEST ): Promise<I_GEN_QR_RESPONSE> {
        return await this.request<I_GEN_QR_RESPONSE>( E_HTTP.POST, E_TOKEN.PAYMENT, "v1/wallet/qr", options );
    }

    /**
     * Blocks a static wallet.
     *
     * @param {I_BLOCK_STATIC_WALLER_REQUEST} options - The options for blocking the wallet.
     * @return {Promise<I_BLOCK_STATIC_WALLER_RESPONSE>} - A promise that resolves to the response of the blocking operation.
     */
    async blockStaticWallet( options: I_BLOCK_STATIC_WALLET_REQUEST ): Promise<I_BLOCK_STATIC_WALLET_RESPONSE> {
        return await this.request<I_BLOCK_STATIC_WALLET_RESPONSE>( E_HTTP.POST, E_TOKEN.PAYMENT, "v1/wallet/block-address", options );
    }

    /**
     * Refunds from a blocked wallet.
     *
     * @param {I_REFUND_FROM_BLOCK_WALLET_REQUEST} options - The options for the refund request.
     * @return {Promise<I_REFUND_FROM_BLOCK_WALLET_RESPONSE>} - A promise that resolves to the refund response.
     */
    async refundFromBlockedWallet( options: I_REFUND_FROM_BLOCK_WALLET_REQUEST ): Promise<I_REFUND_FROM_BLOCK_WALLET_RESPONSE> {
        return await this.request<I_REFUND_FROM_BLOCK_WALLET_RESPONSE>( E_HTTP.POST, E_TOKEN.PAYMENT, "v1/wallet/blocked-address-refund", options );
    }

    /**
     * Retrieves the payment information based on the provided options.
     *
     * @param {I_PAYMENT_INFO_REQUEST} options - The payment information request options.
     * @return {Promise<I_PAYMENT_INFO_RESPONSE>} The payment information response.
     */
    async getPayment( options: I_PAYMENT_INFO_REQUEST ): Promise<I_PAYMENT_INFO_RESPONSE> {
        return await this.request<I_PAYMENT_INFO_RESPONSE>( E_HTTP.POST, E_TOKEN.PAYMENT, "v1/payment/info", options );
    }

    /**
     * Generates a signature for the given data and key.
     *
     * @param {Record<string, any>} data - The data to generate the signature for.
     * @param {string} key - The key used in the signature generation.
     * @return {string} The generated signature.
     */
    makeSignatue( data: Record<string, any>, key: string ): string {
        const signatue = createHash( 'md5' )
            .update(
                Buffer.from(
                    JSON.stringify( data ).replace( /\//g, '\\/' ),
                ).toString( 'base64' ) + key,
            )
            .digest( 'hex' );

        return signatue;
    }

    /**
     * Verifies the signature of the given data.
     *
     * @param {Record<string, any>} data - The data to verify the signature for.
     * @return {boolean} Returns true if the signature is valid, false otherwise.
     */
    verifySignatue( data: Record<string, any> ): boolean {
        let remote = data[ 'sign' ];
        delete data[ 'sign' ];

        return remote === this.makeSignatue( data, this.paymentToken );
    }
}