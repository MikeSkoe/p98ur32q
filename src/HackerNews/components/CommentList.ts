import { TComment } from '../types/comment';
import * as API from '../api/index';
import { List, Div } from '../../nodes/index';
import { CommentItem } from './ComponentItem';
import { default as Observable } from 'zen-observable';
import { Post } from '../types/post';
import createState from '../../lib/ZenPushStream';

export const CommentList = (post: Observable<Post>) => {
    const $comments = createState<TComment[]>([]);

    return Div(
        List($comments.observable, CommentItem)
            .onRemove(
                post.subscribe(val => {
                    API.items<TComment>(val.kids)
                        .then(comments => {
                            $comments.next(() => comments);
                        });
                }).unsubscribe
            )
    );
};
