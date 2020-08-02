import { Publisher } from './Publisher';

export interface WithId {
    id: string;
}

export const map = <T, A>(mapFn: (val: T) => A) => (pub: Publisher<T>): Publisher<A> => {
    let prevVal;

    return {
        sub: callback => pub.sub(val => {
            const newVal = mapFn(val);

            if (newVal !== prevVal) {
                callback(newVal);
                prevVal = newVal;
            }
        }),
        // @ts-ignore
        set: pub.set,
        // @ts-ignore
        get: pub.get,
    }
};

export const compose = <T>(...fns: ((...args: T[]) => T)[]) =>
    fns.reduceRight((prevFn, nextFn) =>
       (...arg: T[]) => nextFn(prevFn(...arg)),
       val => val,
    );

export const mem = <T, R>(fn: (args: T) => R) => {
    let prev: T | null = null;

    return (arg: T) => {
        if (prev !== arg) {
            prev = arg;
            fn(arg);
        }
    }
};

export const isIn = (arr: WithId[]) => (item: WithId) => arr.some(i => i.id === item.id);
export const notIn = (arr: WithId[]) => (item: WithId) => !arr.some(i => i.id === item.id);
