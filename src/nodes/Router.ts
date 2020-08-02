import { View } from '../lib/View';

interface RouterOptions {
    [key: string]: () => View<HTMLElement | Text>
}

class Router extends View<HTMLElement | Text> {
    node = document.createTextNode('');
    routerOptions: RouterOptions;

    constructor(options: RouterOptions) {
        super();

        this.routerOptions = options;
        window.addEventListener('load', this.render);
        window.addEventListener('hashchange', this.render);
    }

    render = () => {
        const currentLocation = location.hash.slice(1);
        const newElement = this.routerOptions[currentLocation]();
        this.node.replaceWith(newElement.node);
    }
}

export default Router;
