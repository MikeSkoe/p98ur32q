import { View } from "../lib/View";

class Link extends View<HTMLAnchorElement> {
    node = document.createElement('a');

    constructor(href: string, label: string) {
        super();

        this.node.href = href;
        this.node.appendChild(
            document.createTextNode(label),
        )
    }
}

export default (href: string, label: string) => new Link(href, label);