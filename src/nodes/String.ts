import { View } from '../lib/View';
import { isObservalbe } from '../lib/Publisher';
import * as Observable from 'zen-observable';

class String extends View<Text> {
    node = document.createTextNode('');

    constructor(str: Observable<unknown> | string | number) {
        super();

        if (typeof str === 'string' || typeof str === 'number') {
            this.node.textContent = `${str}`;
        } else if (isObservalbe(str)) {
            this.pushUnsub(
                str.subscribe(
                    str => this.node.textContent = `${str}`,
                ).unsubscribe,
            )
        }
    }
}

export default (str: Observable<unknown> | string | number) => new String(str);
