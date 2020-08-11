import { default as Observable } from 'zen-observable';

export class PushStream<T> {
    private observer: ZenObservable.SubscriptionObserver<T>;
    observable: Observable<T>;
    lastValue: T;

    constructor(initialValue: T) {
        this.lastValue = initialValue;
        this.observable = new Observable<T>(observer => {
            this.observer = observer;
            this.observer.next(this.lastValue);
        })
    }

    next = (fn: (prevValue: T) => T) => {
        this.lastValue = fn(this.lastValue);
        this.observer.next(this.lastValue);
    }

    error = (errorValue: unknown) => {
        this.observer.error(errorValue);
    }

    complete = () => {
        this.observer.complete();
    }
}

export default PushStream;

export const isObservable = <T>(value: any): value is Observable<T> =>
    Object.keys(value).includes('_subscriber');
