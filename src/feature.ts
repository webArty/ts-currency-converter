interface Future<E, A>  {
    fork(reject: (v: E) => void, resolve: (v: A) => void): void;
    ap(f: any): any;
    map<A2>(fb: (e: A) => A2): Future<E, A2>;
    bimap<E2, A2>(errFn: (value: E) => E2, successFn: (value: A) => A2): Future<E2, A2>;
    chain<A2>(fn: (v: A) => Future<E, A2>): Future<E, A2>;
    chainReject<A2>(fn: (value: E) => Future<E, A2>): Future<E, A2>;
}

interface FutureStatic {
    <E, A>(fn: (reject: (v: E) => void, resolve: (v: A) => void) => void): Future<E, A>
    new <E, A>(fn: (reject: (v: E) => void, resolve: (v: A) => void) => void): Future<E, A>;
    cache<E, A>(f: Future<E, A>): Future<E, A>;
    of<E, A>(x: A): Future<E, A>;
    reject<E, A>(val: E): Future<E, A>;
}

// ramda-fantasy не типизированая взял типизацию из https://github.com/ramda/ramda-fantasy/issues/154
export const Future: FutureStatic = require("ramda-fantasy").Future;
