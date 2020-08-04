import { createStore, Publisher } from '../../lib/Publisher';
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

export const Item = (post: Post) =>
    Div(
        Div(String(post.title))
            .className('title'),
        Div(String(`type: ${post.type}`)),
        Div(String(`link: ${post.url}`)),
        Div(String(`score: ${post.score}`)),
    ).className('post');

const PostItem = (postId: WithId, children?: (post: Post) => View) => {
    const $postData = createStore<Post | null>(null);

    (async () => {
        const postData = await API.item<Post>(postId.id);

        $postData.set(() => postData);
    })();

    return If(
        map(val => val !== null)($postData),
        () => Div(
            Link(`#post/${postId.id}`, Item($postData.get())),
            children
                ? children($postData.get())
                : PlaceHolder(),
        ),
    );
};

export default PostItem;
