import { addTask, setInput, $input } from '../state';
import Input from '../../nodes/Input';
import { event } from '../../nodes/nodeManipulations';

const TaskInput = () => {
    const onEnter: HTMLInputElement['onkeydown'] = e => {
        if (e.key === 'Enter') {
            const task = {
                id: `${Math.random()}`,
                title: (<HTMLInputElement>e.target).value,
                completed: false,
            };
            addTask(task)
            setInput('');
        }
    };

    return Input($input)
        .with(event('keydown', onEnter));
};

export default TaskInput;
