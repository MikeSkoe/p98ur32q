const Title = (title: Text) => {
    const h1 = document.createElement('h1');

    h1.appendChild(title);

    return h1;
}

export default Title;
