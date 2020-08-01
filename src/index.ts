import {
    Title,
    View,
    String,
    List,
    Input,
} from './nodes/index';
import {
    On,
} from './attributes/index';
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
const changeInput = (text: string) => $input.set(() => text);
const removeTask = (id: string) => $tasks.set(arr => arr.filter(item => item.id !== id));

const MyInput = ($pub: Publisher<string>) =>
    On('keydown',
        e => {
            if (e.key !== 'Enter') {
                return 
            }

            addTask({
                id: `${Math.random()}`,
                title: $pub.get(),
            })
            changeInput('');
        },
    )
        (Input($pub));

const TaskView = (task: Task) =>
    On('click',
        () => removeTask(task.id),
    )
        (View(String(task.title)));

root.appendChild(
    View(
        Title(String(map($tasks)(arr => arr.length))),
        Title(String($input)),
        MyInput($input),
        List(
            $tasks,
            TaskView,
        ),
    )
);