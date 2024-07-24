import {useSelector, useDispatch} from 'react-redux';
import {removeTodo} from '../../actions/todoActions';

const TodoList = () => {
    const todos = useSelector(state => state.todos.items);
    const dispatch = useDispatch();

    return (
        <ul>
            {todos.map((todo, index) => (
                <li key={index}>
                    {todo}
                    <button onClick={() => dispatch(removeTodo(index))}>Remover</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
