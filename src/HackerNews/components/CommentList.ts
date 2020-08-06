import { createStore } from '../../lib/Publisher';
import { TComment } from '../types/comment';
import * as API from '../api/index';
import { map } from '../../lib/utils';
import { List } from '../../nodes/index';
import If from '../../nodes/If';
import { CommentItem } from './ComponentItem';

export const CommentList = (kids: number[]) => {
    const $comments = createStore<TComment[] | null>(null);

    (async () => {
        const comments = await API.items<TComment>(kids);

        $comments.set(() => comments);
    })();

    return If(
        map(val => val !== null)($comments),
        () => List($comments, CommentItem),
    );
};
