import { createStore } from "./lib/Publisher";
import { Task } from "./types/task";

// state
export const $input = createStore('');
export const $tasks = createStore<Task[]>([
    {id: '1', title: 'hello'}
]);

// actions
export const addTask = (task: Task) => $tasks.set(arr => arr.concat(task));
export const setInput = (text: string) => $input.set(() => text);
export const removeTask = (id: string) => $tasks.set(arr => arr.filter(item => item.id !== id));
