const List = <T extends {id: string}>(
    data: Publisher<T[]>,
    render: (item: T) => HTMLElement,
    keyExtractor: (item: T) => string = item => item.id,
) => {
    const holder = document.createElement('div');

    data.sub(arr => {
        holder.innerHTML = '';

        arr.forEach(item => {
            const el = render(item);

            el.dataset['key'] = keyExtractor(item);
            holder.appendChild(el);
        });
    })

    return holder;
};

export default List;
