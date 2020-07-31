interface Publisher<T> {
    sub: (callback: (val: T) => void) => () => void;
    set: (update: (prev: T) => T) => void;
}

const createStore = <T>(
    initialState: T,
): Publisher<T> => {
    let state = initialState;
    let subs: ((val: T) => void)[] = [];

    const sub:Publisher<T>['sub'] = callback => {
        subs.push(callback);
        callback(state);

        return () => {
            subs = subs.filter(fn => fn !== callback)
        };
    };

    const set:Publisher<T>['set'] = update => {
        const newValue = update(state);
        if (state !== newValue) {
            state = newValue;

            subs.forEach(fn => fn(state));
        }
    };

    return {
        sub,
        set,
    }
};
