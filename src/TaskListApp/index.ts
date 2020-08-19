import {
    Div,
    String,
    List,
} from '../nodes/index';
import TaskView from './components/TaskView';
import TaskInput from './components/TaskInput';
import { $input, $tasks } from './state';
import './style.less'
import If from '../nodes/If';
import { event } from '../nodes/nodeManipulations';
import createState from '../lib/ZenPushStream';
import Switch from '../nodes/Switch';
import { Task } from './types/task';

enum Filtering {
    done,
    notDone,
    all,
}

const mapFiltering = (filtering: Filtering) => (tasks: Task[]) => {
    switch(filtering) {
        case Filtering.all:
            return tasks.filter(() => true);
        case Filtering.done:
            return tasks.filter(task => task.completed === true);
        case Filtering.notDone:
            return tasks.filter(task => task.completed === false);
    }
}

const App = () => {
    let $filter = createState<Filtering>(Filtering.all);
    
    return Div(
        If($filter.observable.map(val => val === Filtering.all),
            () => Div(String('all')),
            () => Div(String('not all')),
        ).with(event('click', () => {
            $filter.next(() => Filtering.all);
        })),

        If($filter.observable.map(val => val === Filtering.all),
            () => Div(String('done')),
            () => Div(String('not done')),
        ).with(event('click', () => {
            $filter.next(filtering =>
                filtering === Filtering.done
                    ? Filtering.notDone
                    : Filtering.done
            );
        })),
    
        Div(
            String(
                $tasks.observable
                    .map(arr => arr.length)
                    .filter(v => v % 2 === 0)
            ),
        ),

        Div(String($input.observable)),

        TaskInput(),

        Switch($filter.observable,
            filtering => {
                return List(
                    $tasks.observable.map(
                        mapFiltering(filtering)
                    ),
                    TaskView,
                );
            }
        )
    );
};

export default App;
