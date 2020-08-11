import {
    Div,
    String,
} from '../../nodes/index';
import { Task } from "../types/task";
import { removeTask } from "../state";
import { className, event, classNameOn } from "../../nodes/nodeManipulations";
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
        .with(classNameOn('selected', $isSelected.observable))
        .with(event('click', toggleSelect))
}

export default TaskView;
