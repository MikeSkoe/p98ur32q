import {
    Div,
    String,
    List,
} from '../nodes/index';
import { createStore, Publisher } from '../lib/Publisher';
import PostList from './components/PostList';
import './style.less'

const App = Div(
    Div(String('Hacker News!')),
    PostList(),
);

export default App;