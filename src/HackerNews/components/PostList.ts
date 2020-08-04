import { createStore, Publisher } from '../../lib/Publisher';
import { List, Div, String } from '../../nodes/index';
import PostItem from './PostItem';
import { WithId, map } from '../../lib/utils';
import If from '../../nodes/If';
import * as API from '../api/index';

const PostList = () => {
    const $postIds = createStore<WithId[]>([]);

    (async () => {
        const postIds = await API.topStories();

        $postIds.set(() => postIds);
    })();

    return If(map<WithId[], boolean>(arr => arr.length === 0)($postIds),
        () => String('LOADING'),
        () => List($postIds, PostItem),
    );
};

export default PostList;
