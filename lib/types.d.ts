export declare enum E_HTTP {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}
export declare enum E_TOKEN {
    PAYMENT = "PAYMENT",
    PAYOUT = "PAYOUT"
}
export declare enum E_PAYMENT_STATUS {
    PAID = "paid",
    PAID_OVER = "paid_over",
    WRONG_AMOUNT = "wrong_amount",
    PROCESS = "process",
    CONFIRM_CHECK = "confirm_check",
    WRONG_AMOUNT_WAITING = "wrong_amount_waiting",
    CHECK = "check",
    FAIL = "fail",
    CANCEL = "cancel",
    SYSTEM_FAIL = "system_fail",
    REFUND_PROCESS = "refund_process",
    REFUND_FAIL = "refund_fail",
    LOCKED = "locked"
}
export interface I_CURRENCY {
    currency: string;
    network?: string;
}
export declare enum E_COURSE_SOURCE {
    BINANCE = "Binance",
    BINANCEP2P = "BinanceP2P",
    EXMO = "Exmo",
    KUCOIN = "Kucoin",
    GARANTEXIO = "Garantexio"
}
export interface I_CREATE_PAYMENT_REQUEST {
    amount: string;
    currency: string;
    order_id: string;
    network?: string;
    url_return?: string;
    url_success?: string;
    url_callback?: string;
    is_payment_multiple?: boolean;
    lifetime?: number;
    to_currency?: string;
    subtract?: number;
    accuracy_payment_percent?: number;
    additional_data?: string;
    currencies?: Array<I_CURRENCY>;
    except_currencies?: Array<I_CURRENCY>;
    course_source?: E_COURSE_SOURCE;
    from_referral_code?: string;
    discount_percent?: number;
    is_refresh?: boolean;
}
export interface I_PAYMENT {
    uuid: string;
    order_id: string;
    amount: string;
    payment_amount: string;
    payer_amount: string;
    discount_percent: number;
    discount: number;
    payer_currency: string;
    currency: string;
    merchant_amount: string;
    network: string;
    address: string;
    from: string;
    txid: string;
    payment_status: E_PAYMENT_STATUS;
    url: string;
    expired_at: string;
    is_final: boolean;
    additional_data: string;
    created_at: string;
    updated_at: string;
}
export interface I_CREATE_PAYMENT_RESPONSE {
    state: number;
    result: I_PAYMENT;
}
export interface I_CREATE_STATIC_WALLET_REQUEST {
    currency: string;
    order_id: string;
    network: string;
    url_callback?: string;
    from_referral_code?: string;
}
export interface I_CREATE_STATIC_WALLET_RESPONSE {
    state: number;
    result: {
        wallet_uuid: string;
        uuid: string;
        address: string;
        currency: string;
        network: string;
        url: string;
    };
}
export interface I_GEN_QR_REQUEST {
    wallet_address_uuid: string;
}
export interface I_GEN_QR_RESPONSE {
    state: number;
    result: {
        image: string;
    };
}
export interface I_BLOCK_STATIC_WALLET_REQUEST {
    uuid?: string;
    order_id?: string;
    is_force_refund?: boolean;
}
export declare enum E_STATIC_WALLET_STATUS {
    BLOCKED = "blocked",
    ACTIVE = "active",
    IN_ACTIVE = "in_active"
}
export interface I_BLOCK_STATIC_WALLET_RESPONSE {
    state: number;
    result: {
        uuid: string;
        status: E_STATIC_WALLET_STATUS;
    };
}
export interface I_REFUND_FROM_BLOCK_WALLET_REQUEST {
    uuid?: string;
    order_id?: string;
    address: string;
}
export interface I_REFUND_FROM_BLOCK_WALLET_RESPONSE {
    state: number;
    result: {
        commission: string;
        amount: string;
    };
}
export interface I_PAYMENT_INFO_REQUEST {
    uuid?: string;
    order_id: string;
}
export interface I_PAYMENT_INFO_RESPONSE {
    state: number;
    result: I_PAYMENT;
}
export interface I_PAYMENT_REFUND_REQUEST {
    address: string;
    is_subtract: boolean;
    uuid?: string;
    order_id?: string;
}
export interface I_PAYMENT_REFUND_RESPONSE {
    state: number;
    result: [];
}
export interface I_RESEND_WEBHOOK_REQUEST {
    uuid?: string;
    order_id?: string;
}
export interface I_RESEND_WEBHOOK_RESPONSE {
    state: number;
    result: [];
}
export interface I_TEST_WEBHOOK_REQUEST {
    url_callback: string;
    currency: string;
    network: string;
    uuid?: string;
    order_id?: string;
    status: E_PAYMENT_STATUS;
}
export interface I_TEST_WEBHOOK_RESPONSE {
    state: number;
    result: [];
}
