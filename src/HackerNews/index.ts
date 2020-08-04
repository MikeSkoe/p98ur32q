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
import PostItem from './components/PostItem';

const App = Div(
    Div(String('Hacker News!')),
    Div(Link('#/', String('home'))),
    Router({
        '/': () => PostList(),
        '/post': ([id]) => PostItem({id}),
    }).className('router'),
);

export default App;