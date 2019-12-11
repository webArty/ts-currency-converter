import { Goods } from "@app-types/goods";
import { TotalCartPrice } from "@app-types/total-price-in-currencies";

import { getTotalCartPrice } from "./api/get-total-cart-price";

// Пример использования функции getExchangeRate;
(function main() {

    const cart: Goods[] = [
        { price: 20, name: "something simpe" },
        { price: 45, name: "something simpe" },
        { price: 67, name: "something simpe" },
        { price: 1305, name: "something expensive" }
    ];

    getTotalCartPrice(cart).fork(
        // обработка ошибок
        error => {
            console.log(error);
        },
        // обработка успешного ответа, например запись результата в переменную или отрисовка чеголибо
        (result: Partial<TotalCartPrice>) => {
            doSomething(result)
        }
    );

})();


function doSomething(totals: Partial<TotalCartPrice>){
    console.log(totals);
}