import { Publisher } from '../lib/Publisher';
import { View } from '../lib/View';

class PlaceHolder extends View<Text> {
    node = document.createTextNode('');
}

class If extends View<HTMLDivElement> {
    currentChild: View<HTMLElement | Text>;
    node = document.createElement('div');

    constructor(
        pub: Publisher<boolean>,
        element: () => View<HTMLElement | Text>,
        another?: () => View<HTMLElement | Text>,
    ) {
        super();
        this.currentChild = element();

        this.unsubs.push(pub.sub(val => {
            this.currentChild.remove();

            if (val) {
                this.currentChild = element();
            } else {
                this.currentChild = another ? another() : new PlaceHolder();
            }

            this.node.appendChild(this.currentChild.node)
        }));
    }
}

export default (
    pub: Publisher<boolean>,
    element: () => View<HTMLElement | Text>,
    another?: () => View<HTMLElement | Text>,
) => new If(pub, element, another);