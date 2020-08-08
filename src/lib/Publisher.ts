import * as Observable from 'zen-observable';
import PushStream from 'zen-push';

export const newState = <T>() => {
    const stream = new PushStream<T>();

    return stream
}

export const isPushStream = <T>(val: any): val is PushStream<T> => 'next' in val;
export const isObservalbe = <T>(val: any): val is Observable<T> => 'subscribe' in val;
