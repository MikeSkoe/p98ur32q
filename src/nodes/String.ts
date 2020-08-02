import { Publisher } from '../lib/Publisher';
import { View } from '../lib/View';

class String extends View<Text> {
    node = document.createTextNode('');

    constructor(str: Publisher<unknown> | string) {
        super();

        if (typeof str === 'string') {
            this.node.textContent = str;
        } else {
            this.unsubs.push(str.sub(str => this.node.textContent = `${str}`));
        }
    }
}

export default (str: Publisher<unknown> | string) => new String(str);
