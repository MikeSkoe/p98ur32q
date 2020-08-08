import { View } from '../lib/View';
import PushStream from 'zen-push';

class Input extends View<HTMLInputElement>{
    node = document.createElement('input');

    constructor(pub: PushStream<string>) {
        super();

        this.pushUnsub(
            pub.observable.subscribe(value => this.node.value = value).unsubscribe,
        );
        this.node.oninput = (event: InputEvent) => {
            pub.next((<HTMLInputElement>event.target).value);
        }
    }

}

export default (pub: PushStream<string>) => new Input(pub);
