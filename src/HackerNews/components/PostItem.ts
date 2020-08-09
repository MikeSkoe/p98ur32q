import { Div, String } from '../../nodes/index';
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

const PostItem = (
    postId: WithId,
    children?: (post: Observable<Post>,
) => View) => {
    const $postData = newState<Post>();
    const $showItem = newState<boolean>();

    (async () => {
        const postData = await API.item<Post>(postId.id);

        $showItem.next(true);
        $postData.next(postData);
    })();

    return If(
        $showItem.observable,
        () => Div(
            PostUnit($postData.observable, postId.id)
                .with(className('post-card')),
            children
                ? children($postData.observable)
                : PlaceHolder(),
        ).with(className('post-item'))
    )
};

export default PostItem;
