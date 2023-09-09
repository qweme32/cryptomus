"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.E_COURSE_SOURCE = exports.E_PAYMENT_STATUS = exports.E_TOKEN = exports.E_HTTP = void 0;
var E_HTTP;
(function (E_HTTP) {
    E_HTTP["GET"] = "GET";
    E_HTTP["POST"] = "POST";
    E_HTTP["PUT"] = "PUT";
    E_HTTP["PATCH"] = "PATCH";
    E_HTTP["DELETE"] = "DELETE";
})(E_HTTP || (exports.E_HTTP = E_HTTP = {}));
var E_TOKEN;
(function (E_TOKEN) {
    E_TOKEN["PAYMENT"] = "PAYMENT";
    E_TOKEN["PAYOUT"] = "PAYOUT";
})(E_TOKEN || (exports.E_TOKEN = E_TOKEN = {}));
var E_PAYMENT_STATUS;
(function (E_PAYMENT_STATUS) {
    E_PAYMENT_STATUS["PAID"] = "paid";
    E_PAYMENT_STATUS["PAID_OVER"] = "paid_over";
    E_PAYMENT_STATUS["WRONG_AMOUNT"] = "wrong_amount";
    E_PAYMENT_STATUS["PROCESS"] = "process";
    E_PAYMENT_STATUS["CONFIRM_CHECK"] = "confirm_check";
    E_PAYMENT_STATUS["WRONG_AMOUNT_WAITING"] = "wrong_amount_waiting";
    E_PAYMENT_STATUS["CHECK"] = "check";
    E_PAYMENT_STATUS["FAIL"] = "fail";
    E_PAYMENT_STATUS["CANCEL"] = "cancel";
    E_PAYMENT_STATUS["SYSTEM_FAIL"] = "system_fail";
    E_PAYMENT_STATUS["REFUND_PROCESS"] = "refund_process";
    E_PAYMENT_STATUS["REFUND_FAIL"] = "refund_fail";
    E_PAYMENT_STATUS["LOCKED"] = "locked";
})(E_PAYMENT_STATUS || (exports.E_PAYMENT_STATUS = E_PAYMENT_STATUS = {}));
var E_COURSE_SOURCE;
(function (E_COURSE_SOURCE) {
    E_COURSE_SOURCE["BINANCE"] = "Binance";
    E_COURSE_SOURCE["BINANCEP2P"] = "BinanceP2P";
    E_COURSE_SOURCE["EXMO"] = "Exmo";
    E_COURSE_SOURCE["KUCOIN"] = "Kucoin";
    E_COURSE_SOURCE["GARANTEXIO"] = "Garantexio";
})(E_COURSE_SOURCE || (exports.E_COURSE_SOURCE = E_COURSE_SOURCE = {}));
