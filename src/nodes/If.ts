import { Publisher } from '../lib/Publisher';
import { View } from '../lib/View';
import PlaceHolder from './PlaceHolder';

class If extends View<HTMLElement | Text> {
    node = document.createTextNode('');

    constructor(
        pub: Publisher<boolean>,
        element: () => View<HTMLElement | Text>,
        another?: () => View<HTMLElement | Text>,
    ) {
        super();

        this.unsubs.push(pub.sub(val => {
            const newNode = 
                val
                    ? element()
                : another
                    ? another()
                    : new PlaceHolder();

            this.node.replaceWith(newNode.node);
        }));
    }
}

export default (
    pub: Publisher<boolean>,
    element: () => View<HTMLElement | Text>,
    another?: () => View<HTMLElement | Text>,
) => new If(pub, element, another);