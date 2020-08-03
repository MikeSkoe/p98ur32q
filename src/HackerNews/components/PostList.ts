import { createStore, Publisher } from '../../lib/Publisher';
import { List, Div, String } from '../../nodes/index';
import PostItem from './PostItem';
import { WithId, map } from '../../lib/utils';
import If from '../../nodes/If';

const fetchIds = async ($ids: Publisher<WithId[]>) => {
    const ids = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    const jsonData: number[] = await ids.json();
    $ids.set(() =>
        jsonData
            .slice(0, 5)
            .map(id => ({id}))
    );
};

const PostList = () => {
    const $postIds = createStore<WithId[]>([]);
    fetchIds($postIds);

    return Div(
        If(map<WithId[], boolean>(arr => arr.length === 0)($postIds),
            () => String('LOADING'),
            () => List($postIds, PostItem),
        )
    );
};

export default PostList;
