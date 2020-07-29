const createStore = (initialState) => {
    let state = initialState;
    let subs = [];
    const sub = callback => {
        subs.push(callback);
        callback(state);
        return () => {
            subs = subs.filter(fn => fn !== callback);
        };
    };
    const set = update => {
        const newValue = update(state);
        if (state !== newValue) {
            state = newValue;
            subs.forEach(fn => fn(state));
        }
    };
    return {
        sub,
        set,
    };
};
const map = (pub) => (mapFn) => ({
    sub: callback => pub.sub(val => callback(mapFn(val))),
    set: pub.set,
});
const compose = (...fns) => fns.reduceRight((prevFn, nextFn) => (...arg) => nextFn(prevFn(...arg)), val => val);
const mem = (fn) => {
    let prev = null;
    return (arg) => {
        if (prev !== arg) {
            prev = arg;
            fn(arg);
        }
    };
};
const root = document.querySelector('#root');
const View = (...children) => {
    const view = document.createElement('div');
    children.forEach(child => view.appendChild(child));
    return view;
};
const Title = (title) => {
    const h1 = document.createElement('h1');
    h1.appendChild(title);
    return h1;
};
const Button = (title) => {
    const button = document.createElement('button');
    button.innerText = title;
    return button;
};
const Input = (pub) => {
    let input = document.createElement('input');
    pub.sub(value => input.value = value);
    return input;
};
const On = (type, listener) => (node) => {
    node.addEventListener(type, listener);
    return node;
};
const setStyle = (pub, updateStyle) => (node) => {
    pub.sub(val => {
        updateStyle(node.style, val);
    });
    return node;
};
const Txt = (str) => {
    const text = document.createTextNode('');
    if (typeof str === 'string') {
        text.textContent = str;
    }
    else {
        str.sub(str => text.textContent = `${str}`);
    }
    return text;
};
const If = (pub) => (element, another) => {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(''));
    pub.sub(val => {
        if (val) {
            div.firstChild.remove();
            div.appendChild(element);
        }
        else {
            div.firstChild.remove();
            div.appendChild(another ?? document.createTextNode(''));
        }
    });
    return div;
};
const List = (data, render, keyExtractor = item => item.id) => {
    const holder = document.createElement('div');
    data.sub(arr => {
        holder.childNodes.forEach(child => child.remove());
        arr.forEach(item => {
            const el = render(item);
            el.dataset['key'] = keyExtractor(item);
            holder.appendChild(el);
        });
    });
    return holder;
};
const num = createStore(0);
const array = createStore([
    { id: '11' },
    { id: '22' },
    { id: '33' },
]);
root.appendChild(View(Title(Txt(num)), List(array, (item => View(Txt(item.id)))), If(map(num)(num => num % 2 !== 0))(View(Title(Txt(num)), Button('hi'))), On('change', (event) => {
    const number = Number(event.target.value);
    if (!isNaN(number)) {
        num.set(() => number);
    }
})(Input(map(num)(num => num.toString()))), compose(setStyle(num, (style, val) => { style.marginLeft = `${val}px`; }), On('click', () => num.set(value => value + 1)))(Button('button'))));
//# sourceMappingURL=index.js.map