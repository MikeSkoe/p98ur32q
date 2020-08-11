import {
    Div,
    String,
    List,
} from '../nodes/index';
import TaskView from './components/TaskView';
import TaskInput from './components/TaskInput';
import { $input, $tasks } from './state';
import './style.less'

const App = () => Div(
    Div(
        String(
            $tasks.observable
                .map(arr => arr.length)
                .filter(v => v % 2 === 0)
        ),
    ),
    Div(String($input.observable)),
    TaskInput(),
    List(
        $tasks.observable,
        TaskView,
    ),
);

export default App;
