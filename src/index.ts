import { Good } from "@app-types/good";
import { TotalPriceInCurrencies } from "@app-types/total-price-in-currencies";

import { getTotalInCurrencies } from "./api/get-total-in-currencies";

// Пример использования функции getExchangeRate;
(function main() {

    const basket: Good[] = [
        { price: 20, name: "something simpe" },
        { price: 45, name: "something simpe" },
        { price: 67, name: "something simpe" },
        { price: 1305, name: "something expensive" }
    ];

    getTotalInCurrencies(basket).fork(
        // обработка ошибок
        error => {
            console.log(error);
        },
        // обработка успешного ответа, например запись результата в переменную или отрисовка чеголибо
        (result: Partial<TotalPriceInCurrencies>) => {
            doSomething(result)
        }
    );



})();


function doSomething(totals: Partial<TotalPriceInCurrencies>){
    console.log(totals);
}