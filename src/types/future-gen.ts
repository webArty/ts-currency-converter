export type FutureGen<E, A> = {
    fork(reject: (v: E) => void, resolve: (v: A) => void): void;
    ap(f: any): any;
    map<A2>(fb: (e: A) => A2): FutureGen<E, A2>;
    bimap<E2, A2>(errFn: (value: E) => E2, successFn: (value: A) => A2): FutureGen<E2, A2>;
    chain<A2>(fn: (v: A) => FutureGen<E, A2>): FutureGen<E, A2>;
    chainReject<A2>(fn: (value: E) => FutureGen<E, A2>): FutureGen<E, A2>;
};
