const View = (...children: (Element | Text)[]) => {
    const view = document.createElement('div');

    children.forEach(child => view.appendChild(child));

    return view;
}

export default View;