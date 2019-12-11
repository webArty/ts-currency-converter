import { Good } from "@app-types/good";
import { getExchangeRate } from "./api/get-exchange-rate";
import { TotalPriceInCurrencies } from "@app-types/total-price-in-currencies";

// Пример использования функции getExchangeRate;
(function main() {

    let totalPriceInCurrencies: Partial<TotalPriceInCurrencies>;

    const basket: Good[] = [
        { price: 20, name: "something simpe" },
        { price: 45, name: "something simpe" },
        { price: 67, name: "something simpe" },
        { price: 1305, name: "something expensive" }
    ];

    getExchangeRate(basket).fork(
        // обработка ошибок
        error => {
            console.log(error);
        },
        // обработка успешного ответа, например запись результата в переменную или отрисовка чеголибо
        (result: Partial<TotalPriceInCurrencies>) => {
            totalPriceInCurrencies = result;
            console.log(totalPriceInCurrencies);
        }
    );
})();
