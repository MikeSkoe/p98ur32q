const If = (
    pub: Publisher<boolean>,
) => (
    element: () => (HTMLElement | Text),
    another?: () => (HTMLElement | Text),
) => {
    const div = document.createElement('div');

    pub.sub(val => {
        div.textContent = '';

        if (val) {
            const first = element();

            div.appendChild(first)
        } else {
            const second = another ? another() : document.createTextNode('');

            div.appendChild(second);
        }
    })

    return div;
}

export default If;
