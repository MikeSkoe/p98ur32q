import {
    Div,
    String,
} from '../../nodes/index';
import { WithId } from '../../lib/utils';
import { Post } from '../types/post';
import If from '../../nodes/If';
import Link from '../../nodes/Link';
import { View } from '../../lib/View';
import PlaceHolder from '../../nodes/PlaceHolder';
import * as API from '../api/index';
import Img from '../../nodes/Img';
import { newState } from '../../lib/Publisher';
import * as Observable from 'zen-observable';

export const Item = (post: Observable<Post>) =>
    Div(
        Img('https://i.ytimg.com/vi/5qap5aO4i9A/hq720_live.jpg?sqp=CKCKsfkF-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAxKwomOahEcytM1X-sHZQrHBkxfA')
            .onRemove(node => node.classList.add('post-image')),
        Div(String(post.map(val => val.title)))
            .onRemove(node => node.classList.add('title')),
        Div(String(post.map(val => `type: ${val.type}`))),
        Div(String(post.map(val => `link: ${val.url}`))),
        Div(String(post.map(val => `score: ${val.score}`))),
    ).onRemove(node => node.classList.add('post'));

const getY = (node: View<HTMLElement>) =>
    node.node.getBoundingClientRect().y;

const range = (value: number) => {
    const oldRange = (window.innerHeight - 0)  
    const newRange = (1 - 0)  
    const newValue = (((value - 0) * newRange) / oldRange) + 0;

    return newValue;
}

const center = (num: number) => Math.abs(num - 0.5);

const PostItem = (
    postId: WithId,
    children?: (post: Observable<Post>,
) => View) => {
    const $postData = newState<Post>();
    const $showItem = newState<boolean>();
    const $y = newState<number>();
    let y = 0;

    const updateY = () => $y.next(range(getY(node as View<HTMLElement>)));

    const node = Div(
        If(
            $showItem.observable,
            () => Div(
                Link(`#post/${postId.id}`, Item($postData.observable)),
                children
                    ? children($postData.observable)
                    : PlaceHolder(),
            )
    ))
        .onRemove(node => node.classList.add('post-item'))
        .onRemove(() => $y.observable.subscribe(val => y = val).unsubscribe);

    (async () => {
        const postData = await API.item<Post>(postId.id);

        const step = () => {
            node.node.style.transform = `translateX(-${center(y) * 100}px)`;

            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
        window.addEventListener('scroll', updateY);
        node.pushUnsub(() => window.removeEventListener('scroll', updateY));
        $showItem.next(true);
        $postData.next(postData);
    })();

    return node;
};

export default PostItem;
