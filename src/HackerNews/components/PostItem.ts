import { createStore } from '../../lib/Publisher';
import {
    Div,
    String,
} from '../../nodes/index';
import { map, WithId } from '../../lib/utils';
import { Post } from '../types/post';
import If from '../../nodes/If';
import Link from '../../nodes/Link';
import { View } from '../../lib/View';
import PlaceHolder from '../../nodes/PlaceHolder';
import * as API from '../api/index';
import Img from '../../nodes/Img';

export const Item = (post: Post) =>
    Div(
        Img('https://i.ytimg.com/vi/5qap5aO4i9A/hq720_live.jpg?sqp=CKCKsfkF-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAxKwomOahEcytM1X-sHZQrHBkxfA')
            .className('post-image'),
        Div(String(post.title))
            .className('title'),
        Div(String(`type: ${post.type}`)),
        Div(String(`link: ${post.url}`)),
        Div(String(`score: ${post.score}`)),
    ).className('post');

const getY = (node: View<HTMLDivElement>) =>
    node.node.getBoundingClientRect().y;

const range = (value: number) => {
    const oldRange = (window.innerHeight - 0)  
    const newRange = (1 - 0)  
    const newValue = (((value - 0) * newRange) / oldRange) + 0;

    return newValue;
}

const center = (num: number) => Math.abs(num - 0.5);

const PostItem = (postId: WithId, children?: (post: Post) => View) => {
    const $postData = createStore<Post | null>(null);
    const $y = createStore(0);

    const node = If(
        map(val => val !== null)($postData),
        () => Div(
            Link(`#post/${postId.id}`, Item($postData.get())),
            children
                ? children($postData.get())
                : PlaceHolder(),
        )
        .className('post-item'),
    );

    const updateY = () => $y.set(() => range(getY(node)));

    (async () => {
        const postData = await API.item<Post>(postId.id);

        const step = () => {
            node.node.style.transform = `translateX(-${center($y.get()) * 100}px)`;

            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
        window.addEventListener('scroll', updateY);
        node.unsubs.push(() => window.removeEventListener('scroll', updateY));
        $postData.set(() => postData);
    })();

    return node;
};

export default PostItem;
