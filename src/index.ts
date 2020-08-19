import App from './TaskListApp/index';
const root = document.querySelector('#root');

root.appendChild(
    App().node,
);
