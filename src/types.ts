export enum E_HTTP {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export enum E_TOKEN {
    PAYMENT = 'PAYMENT',
    PAYOUT = 'PAYOUT',
}

export enum E_PAYMENT_STATUS {
    PAID = 'paid',
    PAID_OVER = 'paid_over',
    WRONG_AMOUNT = 'wrong_amount',
    PROCESS = 'process',
    CONFIRM_CHECK = 'confirm_check',
    WRONG_AMOUNT_WAITING = 'wrong_amount_waiting',
    CHECK = 'check',
    FAIL = 'fail',
    CANCEL = 'cancel',
    SYSTEM_FAIL = 'system_fail',
    REFUND_PROCESS = 'refund_process',
    REFUND_FAIL = 'refund_fail',
    LOCKED = 'locked',
}

export interface I_CURRENCY {
    currency: string;
    network?: string;
}

export enum E_COURSE_SOURCE {
    BINANCE = "Binance",
    BINANCEP2P = "BinanceP2P",
    EXMO = "Exmo",
    KUCOIN = "Kucoin",
    GARANTEXIO = "Garantexio",
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

export interface I_CREATE_PAYMENT_RESPONSE {
    state: number;
    result: {
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
}