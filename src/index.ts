import {
    Div,
    String,
    List,
} from './nodes/index';
import { map } from './lib/utils';
import './style.less'
import { Task } from './types/task';
import { $input, $tasks } from './state';
import TaskView from './components/TaskView';
import TaskInput from './components/TaskInput';

const root = document.querySelector('#root');

root.appendChild(
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
    ).node
);