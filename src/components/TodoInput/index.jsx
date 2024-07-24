import {useDispatch} from 'react-redux';
import {addTodo} from '../../actions/todoActions';
import {useState} from "react";

const TodoInput = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            dispatch(addTodo(input));
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Adicionar</button>
        </form>
    );
};

export default TodoInput;
