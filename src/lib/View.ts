export abstract class View<E extends HTMLElement | Text> {
    abstract node: E;

    remove = () => {
        this.node.remove();
        this.unsubs.forEach(unsub => unsub());
    }

    unsubs: (() => void)[] = [];

    on = <K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (this: E, ev: HTMLElementEventMap[K]) => any,
    ) => {
        this.node.addEventListener(type, listener);
        this.unsubs.push(() => this.node.removeEventListener(type, listener));

        return this;
    }

    className = (className: string) => {
        if (this.node instanceof HTMLElement) {
            this.node.className = className;
        }

        return this;
    }
}