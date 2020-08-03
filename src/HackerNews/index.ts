import {
    Div,
    String,
    List,
} from '../nodes/index';
import { createStore, Publisher } from '../lib/Publisher';
import PostList from './components/PostList';
import './style.less'
import Router from '../nodes/Router';
import Link from '../nodes/Link';

const App = Div(
    Div(String('Hacker News!')),
    Div(Link('#/', 'home')),
    Div(Link('#/post', 'post')),
    // PostList(),
    Router({
        '\/': () => PostList().className('post-list'),
        '\/post': () => Div(String('post')),
    }).className('router'),
);

export default App;