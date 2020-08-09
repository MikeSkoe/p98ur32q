
export abstract class View<E extends (HTMLElement | Text) = (HTMLElement | Text)> {
    abstract node: E;
    private unsubs: (() => void)[] = [];
    protected pushUnsub = this.unsubs.push

    remove () {
        this.node.remove();
        this.unsubs.forEach(unsub => unsub());
    }

    with = (fn: (node: E) => void) => {
        fn(this.node);

        return this;
    }

    onRemove = (fn: () => void) => {
        this.pushUnsub(fn);

        return this;
    }

}