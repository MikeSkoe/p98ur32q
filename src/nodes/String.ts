const String = (str: Publisher<unknown> | string) => {
    const text = document.createTextNode('');

    if (typeof str === 'string') {
        text.textContent = str;
    } else {
        str.sub(str => text.textContent = `${str}`);
    }

    return text;
}

export default String;
