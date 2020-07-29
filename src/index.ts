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

const map = <T>(pub: Publisher<T>) => <A>(mapFn: (val: T) => A): Publisher<A> => ({
    sub: callback => pub.sub(val => callback(mapFn(val))),
    // @ts-ignore
    set: pub.set,
})

const compose = <T>(...fns: ((...args: T[]) => T)[]) =>
    fns.reduceRight((prevFn, nextFn) =>
       (...arg: T[]) => nextFn(prevFn(...arg)),
       val => val,
    );

const mem = <T, R>(fn: (args: T) => R) => {
    let prev: T | null = null;

    return (arg: T) => {
        if (prev !== arg) {
            prev = arg;
            fn(arg);
        }
    }
};

const root = document.querySelector('#root');

const View = (...children: (Element | Text)[]) => {
    const view = document.createElement('div');

    children.forEach(child => view.appendChild(child));

    return view;
}

const Title = (title: Text) => {
    const h1 = document.createElement('h1');

    h1.appendChild(title);

    return h1;
}

const Button = (title: string) => {
    const button = document.createElement('button');

    button.innerText = title;

    return button;
}

const Input = (pub: Publisher<string>) => {
    let input = document.createElement('input');

    pub.sub(value => input.value = value);

    return input;
}

const On = <E extends HTMLElement, K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: E, ev: HTMLElementEventMap[K]) => any,
) => (
    node: HTMLElement,
) => {
    node.addEventListener(type, listener);

    return node;
}

const setStyle = <T>(
    pub: Publisher<T>,
    updateStyle: (style: CSSStyleDeclaration, val: T) => void,
) => (
    node: HTMLElement,
) => {
    pub.sub(val => {
        updateStyle(
            node.style,
            val,
        )
    });

    return node;
};

const Txt = (str: Publisher<unknown> | string) => {
    const text = document.createTextNode('');

    if (typeof str === 'string') {
        text.textContent = str;
    } else {
        str.sub(str => text.textContent = `${str}`);
    }

    return text;
}

const If = (
    pub: Publisher<boolean>,
) => (
    element: HTMLElement | Text,
    another?: HTMLElement | Text,
) => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(''));

    pub.sub(val => {
        if (val) {
            div.firstChild.remove();
            div.appendChild(element)
        } else {
            div.firstChild.remove();
            div.appendChild(another ?? document.createTextNode(''));
        }
    })

    return div;
}

const List = <T extends {id: string}>(
    data: Publisher<T[]>,
    render: (item: T) => HTMLElement,
    keyExtractor: (item: T) => string = item => item.id,
) => {
    const holder = document.createElement('div');

    data.sub(arr => {
        holder.childNodes.forEach(child => child.remove());

        arr.forEach(item => {
            const el = render(item);

            el.dataset['key'] = keyExtractor(item);
            holder.appendChild(el);
        });
    })

    return holder;
};

const num = createStore(0);
const array = createStore([
    {id: '11'},
    {id: '22'},
    {id: '33'},
]);

root.appendChild(
    View(
        Title(Txt(num)),

        List(
            array,
            (item => View(Txt(item.id))),
        ),

        If(map(num)(num => num % 2 !== 0))
            (View(
                Title(Txt(num)),
                Button('hi'),
            )),
        
        On(
            'change',
            (event: InputEvent) => {
                const number = Number((<HTMLInputElement>event.target).value);

                if (!isNaN(number)) {
                    num.set(() => number);
                }
            },
        )
            (Input(map(num)(num => num.toString()))),

        compose(
            setStyle(num, (style, val) => {style.marginLeft = `${val}px`}),
            On('click', () => num.set(value => value + 1)),
        )
            (Button('button')),
    )
);