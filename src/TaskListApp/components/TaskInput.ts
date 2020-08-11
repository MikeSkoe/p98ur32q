import { addTask, setInput, $input } from '../state';
import Input from '../../nodes/Input';
import { event } from '../../nodes/nodeManipulations';

const TaskInput = () => {
    const onEnter: HTMLInputElement['onkeydown'] = e => {
        if (e.key === 'Enter') {
            addTask({
                id: `${Math.random()}`,
                title: (<HTMLInputElement>e.target).value,
            })
            setInput('');
        }
    };

    return Input($input)
        .with(event('keydown', onEnter));
};

export default TaskInput;
