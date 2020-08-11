import { Div } from '../../nodes/index';
import { WithId } from '../../lib/utils';
import { Post } from '../types/post';
import If from '../../nodes/If';
import { View } from '../../lib/View';
import PlaceHolder from '../../nodes/PlaceHolder';
import * as API from '../api/index';
import {default as Observable} from 'zen-observable';
import { className } from '../../nodes/nodeManipulations';
import PostUnit from './PostUnit';
import createState from '../../lib/ZenPushStream';

const PostItem = <T extends WithId>(
    postId: T,
    children?: (post: Observable<Post>,
) => View) => {
    const $postData = createState<Post>();
    const $showData = createState(false);

    (async () => {
        const postData = await API.item<Post>(postId.id);

        $showData.next(() => true);
        $postData.next(() => postData);
    })();

    return If(
        $showData.observable,
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
