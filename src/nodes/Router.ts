import { View } from '../lib/View';
import PlaceHolder from './PlaceHolder';

interface RouterOptions {
    [key: string]: (...args: string[]) => View<HTMLElement | Text>
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
        console.log(currentLocation, location.hash)

        this.currentView.remove();
        for (const key of Object.keys(this.routerOptions)) {
            if (
                key.replace(/:(.*?)(\/|$)/gu, '').replace(/\/$/gu, '')
                === currentLocation
            ) {
                console.log(location.hash.replace(currentLocation, '').split('\/').join('!'));
                this.currentView =
                    (this.routerOptions[currentLocation] ?? PlaceHolder)(
                        ...location.hash.replace(currentLocation, '').split('\/')
                    );
            }
        }
        this.node.appendChild(this.currentView.node);
    }

    getLocation = () => 
        location.hash
            .slice(1)
            .replace(/:(.*?)(\/|$)/gu, '')
            .replace(/\/$/gu, '')
            .replace(/^$/gu, '/');
}

export default (options: RouterOptions) => new Router(options);
