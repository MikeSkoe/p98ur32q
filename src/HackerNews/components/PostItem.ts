import { Div } from '../../nodes/index';
import { WithId } from '../../lib/utils';
import { Post } from '../types/post';
import If from '../../nodes/If';
import Link from '../../nodes/Link';
import { View } from '../../lib/View';
import PlaceHolder from '../../nodes/PlaceHolder';
import * as API from '../api/index';
import { newState } from '../../lib/Publisher';
import * as Observable from 'zen-observable';
import { className } from '../../nodes/nodeManipulations';
import PostUnit from './PostUnit';
import PushStream from 'zen-push';

const getY = (node: HTMLElement) => node.getBoundingClientRect().y;

const range = (value: number) => {
    const oldRange = (window.innerHeight - 0)  
    const newRange = (1 - 0)  
    const newValue = (((value - 0) * newRange) / oldRange) + 0;

    return newValue;
}

const center = (num: number) => Math.abs(num - 0.5);

const scroll = (
    $y: PushStream<number>,
) => (
    node: HTMLElement,
) => {
    let y = 0;

    const sub = $y.observable.subscribe(val => y = val);
    const updateY = () => $y.next(range(getY(node)));
    const step = () => {
        node.style.transform = `translateX(-${center(y) * 100}px)`;

        window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
    window.addEventListener('scroll', updateY);

    return () => {
        window.removeEventListener('scroll', updateY);
        sub.unsubscribe();
    }
};

const PostItem = (
    postId: WithId,
    children?: (post: Observable<Post>,
) => View) => {
    const $postData = newState<Post>();
    const $showItem = newState<boolean>();
    const $y = newState<number>();

    (async () => {
        const postData = await API.item<Post>(postId.id);

        $showItem.next(true);
        $postData.next(postData);
    })();

    return Div(
        If(
            $showItem.observable,
            () => Div(
                Div(
                    Link(`#post/${postId.id}`, PostUnit($postData.observable)),
                ),
                children
                    ? children($postData.observable)
                    : PlaceHolder(),
            )
                .with(scroll($y))
                .with(className('post-item'))
    ))
};

export default PostItem;
