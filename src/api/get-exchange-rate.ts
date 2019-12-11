import Axios, { AxiosResponse, AxiosError } from "axios";
import { toPairs, fromPairs, compose, multiply, sum, map, prop, curry } from "ramda";

import { Future } from "../feature";

import { Valuable } from "@app-types/valuable";
import { ExchangeRateResponse } from "@app-types/exchange-rate-response";
import { SuportedExchangeRates } from "@app-types/suported-exchange-rates";
import { TotalPriceInCurrencies } from "@app-types/total-price-in-currencies";
import { ISO4217 } from "@app-types/ISO4217";
import { SupportedСurrencies } from "@app-types/supported-currencies";

/**
 * Метод возвращает Feature<void, TotalPriceInCurrencies>
 * TotalPriceInCurrencies - объект содержащий цены во всех поддерживаемых валютах
 * @param basket массив товаров
 */
export function getExchangeRate(basket: Valuable[]) {

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

    // Закомментировал данную реализацию так как на выходе получается не типизированный объeкт
    // const tronsformResponseToCurencyMap = compose(
    //     // (s: [string, number][]): { [name: string]: number } => fromPairs(s),
    //     // (x: [string, number][]): [string, number][] => x.map(
    //     //     item => [
    //     //         transformISO4217ToNames(item[0] as ISO4217),
    //     //         multiplyByTotal(item[1])
    //     //     ]
    //     // ),
    //     // (y: SuportedExchangeRates): [string, number][] => toPairs(y)
    // );

    function tronsformResponseToCurencyMap(rates: SuportedExchangeRates): Partial<TotalPriceInCurrencies> {
        
        return {
            [transformISO4217ToNames("RUB")]: multiplyByTotal(rates.RUB),
            [transformISO4217ToNames("EUR")]: multiplyByTotal(rates.EUR),
            [transformISO4217ToNames("USD")]: multiplyByTotal(rates.USD),
            [transformISO4217ToNames("GBP")]: multiplyByTotal(rates.GBP),
            [transformISO4217ToNames("JPY")]: multiplyByTotal(rates.JPY)
        };
    }

    return Future((reject: (err: AxiosError) => void, resolve: (result: SuportedExchangeRates) => void) => {
        
        return Axios.get('http://api.exchangeratesapi.io/latest?base=USD&symbols=RUB,EUR,USD,GBP,JPY')
            .then((response: AxiosResponse<ExchangeRateResponse>) =>resolve(response.data.rates))
            .catch((error: AxiosError) => reject(error));
        }
        
    ).map(tronsformResponseToCurencyMap);
}
