import Div from '../nodes/Div';
import { String, Button } from '../nodes/index';
import { className } from '../nodes/nodeManipulations';
import PushStream from '../lib/CreateStream';

const App = () => {
    const $counter = new PushStream(7);

    return Div(
        String($counter.observable),
        Button('pressMe', () => {
            $counter.next(val => val + 1);
        })
    ).with(className('test'));
}

export default App;