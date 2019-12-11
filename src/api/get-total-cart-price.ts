import { compose, multiply, sum, map, prop, curry } from "ramda";
import { AxiosError } from "axios";

import { Valuable } from "@app-types/valuable";
import { SuportedExchangeRates } from "@app-types/suported-exchange-rates";
import { TotalCartPrice } from "@app-types/total-price-in-currencies";
import { ISO4217 } from "@app-types/ISO4217";
import { SupportedСurrencies } from "@app-types/supported-currencies";
import { FutureGen } from "@app-types/future-gen";

import { getExchangeRate } from "./get-exchange-rate";

/**
 * Метод возвращает Feature<void, TotalPriceInCurrencies>
 * TotalPriceInCurrencies - объект содержащий цены во всех поддерживаемых валютах
 * @param basket массив товаров
 */
export function getTotalCartPrice(basket: Valuable[])
    : FutureGen<AxiosError<any>, Partial<TotalCartPrice>> {

    const sumTotalPrice: (goods: Valuable[]) => number = compose(
        sum,
        map(prop("price"))
    );

    const toFixed = curry((digits: number, value: number): number =>
        parseFloat(value.toFixed(digits))
    );

    const basketTotal = sumTotalPrice(basket);

    const multiplyByTotal = compose(toFixed(2), multiply(basketTotal));

    // функция хелпер помогающая трансформировать форматы валют в нужные имена
    function transformISO4217ToNames(ISO4217: ISO4217): SupportedСurrencies {
        switch (ISO4217) {
            case "RUB":
                return "rubles";

            case "EUR":
                return "euros";

            case "USD":
                return "US dollars";

            case "GBP":
                return "pounds";

            case "JPY":
                return "yens";
        }
        const neverCheck: never = ISO4217;
    }

    function transformRatesToTotalInCurrencies(rates: SuportedExchangeRates): Partial<TotalCartPrice> {
        
        return {
            [transformISO4217ToNames('RUB')]: multiplyByTotal(rates.RUB),
            [transformISO4217ToNames('EUR')]: multiplyByTotal(rates.EUR),
            [transformISO4217ToNames('USD')]: multiplyByTotal(rates.USD),
            [transformISO4217ToNames('GBP')]: multiplyByTotal(rates.GBP),
            [transformISO4217ToNames('JPY')]: multiplyByTotal(rates.JPY)
        };
    }

    return getExchangeRate()
        .map(prop('rates'))
        .map(transformRatesToTotalInCurrencies);
}


