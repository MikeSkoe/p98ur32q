const Input = (pub: Publisher<string>) => {
    let input = document.createElement('input');

    pub.sub(value => input.value = value);

    return input;
}

export default Input;
