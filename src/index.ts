import {
    Div,
    String,
    List,
    Input,
} from './nodes/index';
import { map, compose } from './lib/utils';
import { createStore } from './lib/Publisher';
import If from './nodes/If';
import './style.less'

const root = document.querySelector('#root');

interface Task {
    id: string;
    title: string;
}

const $input = createStore('');
const $tasks = createStore<Task[]>([
    {id: '1', title: 'hello'}
]);
const addTask = (task: Task) => $tasks.set(arr => arr.concat(task));
const setInput = (text: string) => $input.set(() => text);
const removeTask = (id: string) => $tasks.set(arr => arr.filter(item => item.id !== id));

const TaskView = (
    task: Task,
) => {
    const $isSelected = createStore(false);
    const toggleSelect = () => $isSelected.set(isSelected => !isSelected);

    return Div(
        String(task.title),
        Div(String('X'))
            .on('click', () => removeTask(task.id))
    )
        .className('task horizontal')
        .withClass($isSelected, 'selected')
        .on('click', toggleSelect);
}

root.appendChild(
    Div(
        Div(
            String(
                map<Task[], number>(arr => arr.length + arr.length % 2)($tasks)
            ),
        ),
        Div(
            String($input),
        ),
        Input($input)
            .on('keydown', e => {
                if (e.key === 'Enter') {
                    addTask({
                        id: `${Math.random()}`,
                        title: (<HTMLInputElement>event.target).value,
                    })
                    setInput('');
                }
            }),
        List(
            $tasks,
            TaskView,
        ),
    ).node
);