import { Publisher } from '../lib/Publisher';
import { View } from '../lib/View';

class String extends View<HTMLDivElement> {
    node = document.createElement('div');

    constructor(str: string) {
        super();

        this.node.innerHTML = str;
    }
}

export default (str: Publisher<unknown> | string | number) => new String(str);
