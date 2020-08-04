import {
    Div,
    String,
    List,
} from '../nodes/index';
import { createStore } from '../lib/Publisher';
import PostList from './components/PostList';
import './style.less'
import Router from '../nodes/Router';
import Link from '../nodes/Link';
import PostItem from './components/PostItem';
import { map } from '../lib/utils';
import * as API from './api/index';
import { Comment } from './types/comment';
import If from '../nodes/If';

const Comment = (comment: Comment) =>
    Div(
        Div(String(comment.by)).className('by'),
        String(comment.text),
        If(Boolean(comment.kids),
            () => Div(String(`(${comment.kids?.length})`)).className('kids'),
        )
    ).className('comment');

const CommentList = (kids: number[]) => {
    const $comments = createStore<Comment[] | null>(null);

    (async () => {
        const comments = await API.items<Comment>(kids);

        $comments.set(() => comments);
    })();

    return If(
        map(val => val !== null)($comments),
        () => List($comments, Comment),
    );
};

const App = Div(
    Div(String('Hacker News!')),
    Div(Link('#/', String('home'))),
    Router({
        '/': () => PostList(),
        '/post': ([id]) => PostItem({id}, post => CommentList(post.kids)),
    }).className('router'),
);

export default App;