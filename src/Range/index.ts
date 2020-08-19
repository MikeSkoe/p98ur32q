import { Div, Range, String } from '../nodes/index';
import createState from '../lib/ZenPushStream';
import { className } from '../nodes/nodeManipulations';
import './style.less';

const App = () => {
    const $counter = createState(0);

    window.addEventListener('scroll', () => {
        $counter.next(() => window.scrollY / 1000);
    })

    const curve = $counter.observable

    return Div(
        Div(
            ...[0, 0.25, 0.5, 0.75].map(num => 
                Div()
                    .with(className('box'))
                    .with(node => {
                        node.style.backgroundColor = `rgb(${num * 255},${num * 255},${num * 255})`
                    })
                    .with(node =>
                        curve
                            .map(v => v + num)
                            .map(v => v * Math.PI)
                            .map(Math.tan)
                            .map(val => val.toFixed(3))
                            .subscribe(v => {
                                node.style.transform = `translateX(${Number(v) * 200}px) scale(${Math.cos(Number(v)) * 2})`;
                            }).unsubscribe
                    ),
            ),
        ).with(className('boxes')),
    )
        .with(className('container'));
}

export default App;
