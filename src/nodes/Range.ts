import { View } from '../lib/View';
import { default as Observable } from 'zen-observable';

class Range extends View<HTMLInputElement> {
    node = document.createElement('input');

    constructor(
        range: Observable<number>,
        update: (fn: (newVal: number) => number) => void,
        min = '0',
        max = '1',
    ) {
        super();

        this.node.type = 'range';
        this.node.min = min;
        this.node.max = max;
        this.node.step = 'any';

        this.pushUnsub(
            range.subscribe(
                value => this.node.value = `${value}`
            ).unsubscribe,
        );

        this.node.oninput = (event: InputEvent) => {
            update(
                () => Number((<HTMLInputElement>event.target).value)
            );
        }
    }
}

export default (
    range: Observable<number>,
    update: (fn: (newVal: number) => number) => void,
    min = 0,
    max = 1,
) => new Range(range, update, min.toString(), max.toString());

