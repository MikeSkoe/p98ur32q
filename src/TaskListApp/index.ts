import {
    Div,
    String,
    List,
} from '../nodes/index';
import { Task } from './types/task';
import TaskView from './components/TaskView';
import TaskInput from './components/TaskInput';
import { $input, $tasks } from './state';
import './style.less'

const App = 
    Div(
        Div(
            String(
                $tasks.map(arr => arr.length + arr.length % 2)
            ),
        ),
        Div(String($input)),
        TaskInput(),
        List(
            $tasks,
            TaskView,
        ),
    );

export default App;
