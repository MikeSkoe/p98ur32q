import { View } from '../lib/View';

class Div extends View<HTMLDivElement> {
    node: HTMLDivElement = document.createElement('div');

    private children: View<HTMLElement | Text>[];

    constructor (...children: View<HTMLElement | Text>[]) {
        super();

        children.forEach(child => this.node.appendChild(child.node));
        this.children = children;
    }
    
    remove = () => {
        super.remove();

        this.children.forEach(child => child.remove())
    };
}

export default Div;