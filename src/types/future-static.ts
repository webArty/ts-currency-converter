import { FutureGen } from "./future-gen";

export type FutureStatic = {
    <E, A>(fn: (reject: (v: E) => void, resolve: (v: A) => void) => void): FutureGen<E, A>;
    new <E, A>(fn: (reject: (v: E) => void, resolve: (v: A) => void) => void): FutureGen<E, A>;
    cache<E, A>(f: FutureGen<E, A>): FutureGen<E, A>;
    of<E, A>(x: A): FutureGen<E, A>;
    reject<E, A>(val: E): FutureGen<E, A>;
};
