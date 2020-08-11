import App from './Counter/index';
const root = document.querySelector('#root');

root.appendChild(
    App().node,
);