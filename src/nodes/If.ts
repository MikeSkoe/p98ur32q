import { Publisher } from '../lib/Publisher';
import { View } from '../lib/View';
import PlaceHolder from './PlaceHolder';

class If extends View<HTMLElement | Text> {
    node = document.createElement('div');
    currentNode: View<HTMLElement | Text> = PlaceHolder();

    constructor(
        pub: Publisher<boolean> | boolean,
        element: () => View<HTMLElement | Text>,
        another?: () => View<HTMLElement | Text>,
    ) {
        super();

        if (typeof pub === 'boolean') {
            const newNode = 
                pub
                    ? element()
                : another
                    ? another()
                    : PlaceHolder();
            this.currentNode.remove();
            this.currentNode = newNode;
            this.node.appendChild(newNode.node);
        } else {
            this.unsubs.push(pub.sub(val => {
                const newNode = 
                    val
                        ? element()
                    : another
                        ? another()
                        : PlaceHolder();
                this.currentNode.remove();
                this.currentNode = newNode;
                this.node.appendChild(newNode.node);
            }));
        }
    }
}

export default (
    pub: Publisher<boolean> | boolean,
    element: () => View<HTMLElement | Text>,
    another?: () => View<HTMLElement | Text>,
) => new If(pub, element, another);