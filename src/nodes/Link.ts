import { View } from "../lib/View";

class Link extends View<HTMLAnchorElement> {
    node = document.createElement('a');

    private children: View[];

    constructor(href: string, ...children: View[]) {
        super();

        this.node.href = href;
        children.forEach(child => this.node.appendChild(child.node));
        this.children = children;
    }

    remove () {
        super.remove();

        this.children.forEach(child => child.remove())
    }
}

export default (href: string, ...children: View[]) =>
    new Link(href, ...children);