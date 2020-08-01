import { Publisher } from '../lib/Publisher';
import { WithId, isIn, notIn } from '../lib/utils';

const Removable = (
    onRemove: () => void,
) => (
    node: HTMLElement,
) => {
    node.addEventListener('remove', onRemove);

    return node;
}

const setKey = (
    key: string,
) => (
    node: HTMLElement,
) => {
    node.dataset['key'] = key;

    return node;
}

const List = <T extends WithId>(
    data: Publisher<T[]>,
    render: (item: T) => HTMLElement,
    keyExtractor: (item: T) => string = item => item.id,
) => {
    console.trace();
    const holder = document.createElement('div');
    holder.dispatchEvent(new Event('remove'));
    let prevArr: T[] = [];

    data.sub(newArr => {
        const addedVals = newArr.filter(notIn(prevArr));
        const removedVals = prevArr.filter(notIn(newArr));
        const oldWithoutRemoved = newArr.filter(notIn(removedVals));
        const newWithoutAdded = newArr.filter(notIn(addedVals));

        const children = [...holder.childNodes.values()];

        // remove deleted items
        const isInRemoved = isIn(removedVals);
        children
            .filter((child: HTMLElement) => isInRemoved({id: child.dataset['key']}))
            .forEach(child => child.remove());

        // update moved
		newWithoutAdded.forEach(
			(newVal, index) => {
				if (
					newVal.id !== oldWithoutRemoved[index].id
				) {
					const newItem = setKey(newVal.id)(render(newVal));
                    const oldItem = children.find((child: HTMLElement) => newVal.id === child.dataset['key']);
                    holder.replaceChild(newItem, oldItem);
				}
			}
        );

        // add new
		addedVals.forEach(
			newVal => {
				const newItem = setKey(newVal.id)(render(newVal));
                const indexOfAfter = newArr.findIndex(item => item.id === newVal.id);
                const nextElement = children[indexOfAfter];
                if (nextElement) {
                    nextElement.before(newItem);
                } else {
                    if (indexOfAfter === 0) {
                        holder.prepend(newItem);
                    } else {
                        holder.appendChild(newItem);
                    }
                }
			}
		)

        prevArr = newArr;
    })

    return holder;
};

export default List;
