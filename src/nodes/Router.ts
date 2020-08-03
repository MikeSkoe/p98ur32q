import { View } from '../lib/View';
import PlaceHolder from './PlaceHolder';
import { Div } from './index';

interface RouterOptions {
    [key: string]: () => View<HTMLElement | Text>
}

class Router extends View<HTMLElement | Text> {
    private routerOptions: RouterOptions;

    node = document.createElement('div');
    currentView: View<HTMLElement | Text> = PlaceHolder();

    constructor(options: RouterOptions) {
        super();

        this.node.appendChild(this.currentView.node);
        this.routerOptions = options;

        window.addEventListener('load', this.render);
        window.addEventListener('hashchange', this.render);
    }

    render = () => {
        const currentLocation = this.getLocation();

        console.log(this.currentView);
        this.currentView.remove();
        this.currentView = this.routerOptions[currentLocation]?.() || PlaceHolder();
        this.node.appendChild(this.currentView.node);
    }

    getLocation = () => 
        location.hash
            .slice(1)
            .replace(/\/$/gu, '')
            .replace(/^$/gu, '/');
}

export default (options: RouterOptions) => new Router(options);
