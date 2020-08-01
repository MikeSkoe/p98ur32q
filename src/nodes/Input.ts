import { Publisher } from '../lib/Publisher';
import { View } from '../lib/View';

class Input extends View<HTMLInputElement>{
    node = document.createElement('input');

    constructor(pub: Publisher<string>) {
        super();

        this.unsubs.push(
            pub.sub(value => this.node.value = value)
        );
        this.node.oninput = (event: InputEvent) => {
            pub.set(() => (<HTMLInputElement>event.target).value);
        }
    }

}

export default Input;
