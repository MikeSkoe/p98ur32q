const Button = (title: string) => {
    const button = document.createElement('button');

    button.innerText = title;

    return button;
}

export default Button;