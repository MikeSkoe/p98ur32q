const Button = (title: string, onClick?: HTMLButtonElement['onclick']) => {
    const button = document.createElement('button');

    if (onClick) {
        button.onclick = onClick;
    }

    button.innerText = title;

    return button;
}

export default Button;