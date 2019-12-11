import { SuportedExchangeRates } from "@app-types/suported-exchange-rates";

export type ExchangeRateResponse = {
    rates: SuportedExchangeRates;
    base: string;
    date: string;
};
