import { Cryptomus } from ".";
import { v4 as uuid } from 'uuid';

describe('Cryptomus', () => {
    let cryptomus: Cryptomus;

    beforeAll(() => {
        cryptomus = new Cryptomus(process.env.MERCHANT as string, process.env.PAYMENT_TOKEN as string, "");
    });

    test('Module', () => {
        expect(cryptomus).toBeDefined();
    });

    test("Create payment", async () => {
        const response = await cryptomus.createPayment({
            amount: "10",
            currency: "USDT",
            order_id: uuid(),
        });

        expect(response.result.amount).toBe("10.00");
    });
});