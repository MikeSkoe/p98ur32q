import { Div, String } from '../nodes/index';
import PostList from './components/PostList';
import './style.less'
import Router from '../nodes/Router';
import Link from '../nodes/Link';
import PostItem from './components/PostItem';
import { CommentList } from './components/CommentList';
import { className } from '../nodes/nodeManipulations';

const App = Div(
    Div(String('Hacker News!')),
    Div(Link('#/', String('home'))),
    Router({
        '/': () => PostList(),
        '/post': ([id]) => PostItem({id},
            post => CommentList(post)
        ),
    }).with(className('router')),
);

export default App;