import { TComment } from '../types/comment';
import * as API from '../api/index';
import { List, Div } from '../../nodes/index';
import If from '../../nodes/If';
import { CommentItem } from './ComponentItem';
import * as Observable from 'zen-observable';
import { Post } from '../types/post';
import { newState } from '../../lib/Publisher';

export const CommentList = (post: Observable<Post>) => {
    const $comments = newState<TComment[]>();
    const $showComponent = newState<boolean>();

    (async () => {
    })()

    return Div(
        If(
            $showComponent.observable,
            () => List($comments.observable, CommentItem),
        )
        .onRemove(() => 
            post.subscribe(val => {
                API.items<TComment>(val.kids)
                    .then(comments => {
                        $showComponent.next(true);
                        $comments.next(comments);
                    });
            }).unsubscribe
        )
    );
};
