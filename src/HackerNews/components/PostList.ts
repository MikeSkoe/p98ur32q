import { List, String } from '../../nodes/index';
import PostItem from './PostItem';
import { WithId } from '../../lib/utils';
import If from '../../nodes/If';
import * as API from '../api/index';
import createState from '../../lib/ZenPushStream';

const PostList = () => {
    const $postIds = createState<WithId[]>([]);
    const $showLoader = createState(true);

    (async () => {
        const postIds = await API.topStories();

        $showLoader.next(() => false);
        $postIds.next(() => postIds);
    })();

    return If(
        $showLoader.observable,
        () => String('LOADING'),
        () => List($postIds.observable, PostItem),
    );
};

export default PostList;
