const On = <E extends HTMLElement, K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: E, ev: HTMLElementEventMap[K]) => any,
) => (
    node: HTMLElement,
) => {
    node.addEventListener(type, listener);

    return node;
}

export default On;