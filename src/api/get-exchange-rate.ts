import Axios, { AxiosResponse, AxiosError } from 'axios';

import { ExchangeRateResponse } from '@app-types/exchange-rate-response';
import { FutureGen } from '@app-types/future-gen';

import { Future } from '../structures/future';

export function getExchangeRate(): FutureGen<AxiosError<any>, ExchangeRateResponse> {
    return Future((reject: (err: AxiosError) => void, resolve: (result: ExchangeRateResponse) => void) => {
        
        return Axios.get('http://api.exchangeratesapi.io/latest?base=USD&symbols=RUB,EUR,USD,GBP,JPY')
            .then((response: AxiosResponse<ExchangeRateResponse>) => resolve(response.data))
            .catch((error: AxiosError) => reject(error));
    });
}
