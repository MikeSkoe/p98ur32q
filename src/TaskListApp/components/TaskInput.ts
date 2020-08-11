import { addTask, setInput, $input } from '../state';
import Input from '../../nodes/Input';

const TaskInput = () => {
    const onEnter: HTMLInputElement['onkeydown'] = e => {
        if (e.key === 'Enter') {
            addTask({
                id: `${Math.random()}`,
                title: (<HTMLInputElement>event.target).value,
            })
            setInput('');
        }
    };

    return Input($input)
        .with(node => {
            node.addEventListener('keydown', onEnter);

            return () => {
                node.removeEventListener('keydown', onEnter);
            }
        });
};

export default TaskInput;
