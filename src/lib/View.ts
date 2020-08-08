
export abstract class View<E extends (HTMLElement | Text) = (HTMLElement | Text)> {
    abstract node: E;
    private unsubs: (() => void)[] = [];

    remove () {
        this.node.remove();
        this.unsubs.forEach(unsub => unsub());
    }

    pushUnsub = this.unsubs.push

    onRemove = (fn: (node: E) => (() => void) | void) => {
        const callback = fn(this.node);
        if (callback) {
            this.pushUnsub(callback);
        }

        return this;
    }

}