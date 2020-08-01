import { Publisher } from '../lib/Publisher';
import On from '../attributes/On';

const Input = (pub: Publisher<string>) => {
    let input = document.createElement('input');

    pub.sub(value => input.value = value);

    return On(
        'input',
        (event: InputEvent) => {
            pub.set(
                () => (<HTMLInputElement>event.target).value,
            );
        },
    )(input);
};

export default Input;
