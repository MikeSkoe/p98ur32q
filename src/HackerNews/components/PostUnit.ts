import {
    Div,
    String,
} from '../../nodes/index';
import { Post } from '../types/post';
import Img from '../../nodes/Img';
import * as Observable from 'zen-observable';
import { className } from '../../nodes/nodeManipulations';

const PostUnit = (post: Observable<Post>) =>
    Div(
        Img('https://i.ytimg.com/vi/5qap5aO4i9A/hq720_live.jpg?sqp=CKCKsfkF-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAxKwomOahEcytM1X-sHZQrHBkxfA')
            .with(className('post-image')),
        Div(String(post.map(val => val.title)))
            .with(className('title')),
        Div(String(post.map(val => `type: ${val.type}`))),
        Div(String(post.map(val => `link: ${val.url}`))),
        Div(String(post.map(val => `score: ${val.score}`))),
    ).with(className('post'));

export default PostUnit;