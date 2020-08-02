import { Publisher } from "./Publisher";

export abstract class View<E extends (HTMLElement | Text)> {
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

    withClass = (pub: Publisher<boolean>, onTrue: string, onFalse: string = '') => {
        this.unsubs.push(
            pub.sub(val => {
                if (!(this.node instanceof HTMLElement)) {
                    return;
                }

                if (val) {
                    if (onFalse !== '') {
                        this.node.classList.remove(onFalse);
                    }
                    if (onTrue !== '') {
                        this.node.classList.add(onTrue);
                    }
                } else {
                    if (onTrue !== '') {
                        this.node.classList.remove(onTrue);
                    }
                    if (onFalse !== '') {
                        this.node.classList.add(onFalse);
                    }
                }
            })
        );

        return this;
    }

    className = (className: string) => {
        if (this.node instanceof HTMLElement) {
            this.node.className = className;
        }

        return this;
    }
}