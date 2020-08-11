import Div from '../nodes/Div';
import { String, Button } from '../nodes/index';
import { className } from '../nodes/nodeManipulations';
import createState from '../lib/ZenPushStream';

const App = () => {
    const $counter = createState(7);

    return Div(
        Div(String($counter.observable)),
        Div(String($counter.observable
            .filter(v => v % 2 === 0)
            .map(v => v * 2)
        )),
        Button('pressMe', () => {
            $counter.next(v => v + 1);
        })
    ).with(className('test'));
}

export default App;