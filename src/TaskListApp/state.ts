import { Task } from "./types/task";
import createState from "../lib/ZenPushStream";

// state
export const $input = createState('');
export const $tasks = createState<Task[]>([
    {id: '1', title: 'hello', completed: false}
]);

// actions
export const addTask = (task: Task) => $tasks.next(arr => arr.concat(task));
export const setInput = (text: string) => $input.next(() => text);
export const removeTask = (id: string) => $tasks.next(arr => arr.filter(item => item.id !== id));
