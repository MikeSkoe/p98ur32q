import {
    Div,
    String,
} from '../../nodes/index';
import { Post } from '../types/post';
import Img from '../../nodes/Img';
import {default as Observable} from 'zen-observable';
import { className } from '../../nodes/nodeManipulations';
import Link from '../../nodes/Link';
import createState, { ZenPushStream } from '../../lib/ZenPushStream';

const getY = (node: HTMLElement) => {
    const rect = node.getBoundingClientRect()
    
    return rect.y;
};

const scroll = (
    $y: ZenPushStream<number>,
) => (
    node: HTMLElement,
) => {

    const updateY = () => $y.next(() => getY(node));
    const sub = $y.observable.subscribe(val => {
        const updatedY = (val / 100) + 0.5
        node.style.opacity = `${updatedY}`;
    })

    window.addEventListener('scroll', updateY);

    return () => {
        window.removeEventListener('scroll', updateY);
        sub.unsubscribe();
    }
};

const PostUnit = (post: Observable<Post>, postId: number | string) => {
    const $y = createState(0);

    return Div(
        Link(
            `#/post/${postId}`,
            Img('https://i.ytimg.com/vi/5qap5aO4i9A/hq720_live.jpg?sqp=CKCKsfkF-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAxKwomOahEcytM1X-sHZQrHBkxfA')
                .with(className('post-image')),
            Div(String(post.map(val => val.title)))
                .with(className('title')),
        ),
        Link(
            post.map(val => val.url),
            Div(String(post.map(val => `link: ${val.url}`))),
        ),
        Div(String(post.map(val => `score: ${val.score}`))),
        Div(String(
            post.map(val => `type: ${val.type}`)
        )),
    )
        .with(className('post'))
        .with(scroll($y));
};

export default PostUnit;