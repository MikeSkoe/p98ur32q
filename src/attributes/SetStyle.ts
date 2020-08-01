import { Publisher } from '../lib/Publisher';

const setStyle = <T>(
    pub: Publisher<T>,
    updateStyle: (style: CSSStyleDeclaration, val: T) => void,
) => (
    node: HTMLElement,
) => {
    pub.sub(val => {
        updateStyle(
            node.style,
            val,
        )
    });

    return node;
};

export default setStyle;