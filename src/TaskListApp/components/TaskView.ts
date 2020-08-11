import {
    Div,
    String,
} from '../../nodes/index';
import { Task } from "../types/task";
import { removeTask } from "../state";
import { className } from "../../nodes/nodeManipulations";
import createState from '../../lib/ZenPushStream';

const TaskView = (
    task: Task,
) => {
    const $isSelected = createState(false);
    const toggleSelect = () => $isSelected.next(isSelected => !isSelected);

    return Div(
        String(task.title),
        Div(String('X'))
            .with(node => {
                const callback = () => removeTask(task.id);
                node.addEventListener('click', callback)

                return () => {
                    node.removeEventListener('click', callback);
                }
            })
    )
        .with(className('.task.horizontal'))
        .with(node => {
            return $isSelected.observable.subscribe(val => {
                if (val) {
                    node.classList.add('selected')
                } else {
                    node.classList.remove('selected')
                }
            }).unsubscribe
        })
        .with(node => {
            node.addEventListener('click', toggleSelect);

            return () => {
                node.removeEventListener('click', toggleSelect);
            }
        })
}

export default TaskView;
