import {
    Div,
    String,
    List,
} from '../nodes/index';
import { map } from '../lib/utils';
import { Task } from './types/task';
import TaskView from './components/TaskView';
import TaskInput from './components/TaskInput';
import { $input, $tasks } from './state';
import './style.less'

const App = 
    Div(
        Div(
            String(
                map<Task[], number>(arr => arr.length + arr.length % 2)($tasks)
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
