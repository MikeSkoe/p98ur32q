import { Publisher } from '../lib/Publisher';
import { View } from '../lib/View';

class String extends View<Text> {
    node = document.createTextNode('');

    constructor(str: Publisher<unknown> | string | number) {
        super();

        if (typeof str === 'string' || typeof str === 'number') {
            this.node.textContent = `${str}`;
        } else if (typeof str === 'object' && 'sub' in str) {
            this.unsubs.push(str.sub(str => {
                this.node.textContent = `${str}`
            }));
        }
    }
}

export default (str: Publisher<unknown> | string | number) => new String(str);
