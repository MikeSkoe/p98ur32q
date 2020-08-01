import {
    Div,
    String,
    List,
    Input,
} from './nodes/index';
import { map } from './lib/utils';
import { createStore, Publisher } from './lib/Publisher';

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
) => new Div(
    new String(task.title)
)
    .on('click', () => removeTask(task.id))
    .className('task');

root.appendChild(
    new Div(
        new Div(
            new String(map($tasks)(arr => arr.length)),
            new String($input),
        ),
        new Input($input)
            .on('keydown', e => {
                if (e.key === 'Enter') {
                    addTask({
                        id: `${Math.random()}`,
                        title: (<HTMLInputElement>event.target).value,
                    })
                    setInput('');
                }
            }),
        new List(
            $tasks,
            TaskView,
        ),
    ).node
);