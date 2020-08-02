import { createStore, Publisher } from '../../lib/Publisher';
import {
    Div,
    String,
} from '../../nodes/index';
import { map, WithId } from '../../lib/utils';
import { Post } from '../types/post';
import If from '../../nodes/If';

const fetchPost = async ($postData: Publisher<Post>, postId: WithId) => {
    const data = await fetch(`https://hacker-news.firebaseio.com/v0/item/${postId.id}.json`);
    const jsonData = await data.json();
    $postData.set(() => jsonData);
};

const Item = (post: Post) =>
    Div(
        Div(String(post.title))
            .className('title'),
        Div(String(`type: ${post.type}`)),
        Div(String(`link: ${post.url}`)),
        Div(String(`score: ${post.score}`)),
    ).className('post');

const PostItem = (postId: WithId) => {
    const $postData = createStore<Post | null>(null);
    fetchPost($postData, postId);

    return Div(
        If(
            map(val => val !== null)($postData),
            () => Item($postData.get()),
        )
    );
};

export default PostItem;
