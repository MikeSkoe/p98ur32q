import {
    Div,
    String,
} from '../../nodes/index';
import { Task } from "../types/task";
import { removeTask, $tasks } from "../state";
import { className, event, classNameOn } from "../../nodes/nodeManipulations";

const TaskView = (
    task: Task,
) => {
    const toggleSelect = () => $tasks.next(
        tasks => tasks.map(tsk =>
            tsk.id === task.id
                ? {...tsk, completed: !tsk.completed}
                : tsk,
        )
    );
    const observableTask = 
        $tasks.observable
            .map(tasks => tasks.find(t => t.id === task.id))

    return Div(
        String(observableTask.map(t => t.title)),
        Div(String('X'))
            .with(event('click', () => removeTask(task.id)))
    )
        .with(className('.task.horizontal'))
        .with(classNameOn('selected',
            observableTask
                .map(task => task?.completed ?? false)
        ))
        .with(event('click', toggleSelect))
}

export default TaskView;
