import { createStore } from "../../lib/Publisher";
import {
    Div,
    String,
} from '../../nodes/index';
import { Task } from "../types/task";
import { removeTask } from "../state";

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

export default TaskView;
