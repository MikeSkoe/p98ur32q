import {
    Title,
    View,
    String,
    List,
    Button,
    Input,
} from './nodes/index';
import {
    On,
    SetStyle,
    If,
} from './attributes/index';
import { map, compose } from './utils';

const root = document.querySelector('#root');

const num = createStore(0);
const array = createStore([
    {id: '11'},
    {id: '22'},
    {id: '33'},
]);

root.appendChild(
    View(
        Title(String(num)),

        List(
            array,
            (item =>
                On(
                    'click',
                    () => array.set(arr => arr.filter(thing => thing.id !== item.id)),
                )
                    (View(String(item.id)))
            ),
        ),

        If(map(num)(num => num % 2 !== 0))
            (() => View(
                Title(String(num)),
                Button('hi'),
            )),
        
        On(
            'change',
            (event: InputEvent) => {
                const number = Number((<HTMLInputElement>event.target).value);

                if (!isNaN(number)) {
                    num.set(() => number);
                }
            },
        )
            (Input(map(num)(num => num.toString()))),

        compose(
            SetStyle(num, (style, val) => {style.marginLeft = `${val}px`}),
            On('click', () => {
                num.set(value => {
                    console.log('add');
                    array.set(arr => arr.concat({id: `${value + 1}`}));

                    return value + 1;
                })
            }),
        )
            (Button('button')),
    )
);