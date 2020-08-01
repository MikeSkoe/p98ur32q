import { Publisher } from '../lib/Publisher';
import { WithId, isIn, notIn } from '../lib/utils';
import { View } from '../lib/View';

const setKey = <T extends HTMLElement>(
    key: string,
) => (
    node: View<T>,
) => {
    node.node.dataset['key'] = key;

    return node;
}

class List<T extends WithId> extends View<HTMLDivElement> {
    node = document.createElement('div');

    private prevArr: T[] = [];

    constructor(
        data: Publisher<T[]>,
        render: (item: T) => View<HTMLElement>,
    ) {
        super();

        this.unsubs.push(
            data.sub(newArr => {
                const addedVals = newArr.filter(notIn(this.prevArr));
                const removedVals = this.prevArr.filter(notIn(newArr));
                const oldWithoutRemoved = newArr.filter(notIn(removedVals));
                const newWithoutAdded = newArr.filter(notIn(addedVals));

                const children = [...this.node.childNodes.values()];

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
                            this.node.replaceChild(newItem.node, oldItem);
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
                            nextElement.before(newItem.node);
                        } else {
                            if (indexOfAfter === 0) {
                                this.node.prepend(newItem.node);
                            } else {
                                this.node.appendChild(newItem.node);
                            }
                        }
                    }
                )

                this.prevArr = newArr;
            })
        )
    }

    remove = () => {
        super.remove();

        this.node.childNodes.forEach(child => child.remove());
    }
}

export default List;
