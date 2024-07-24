import './App.css'
import TodoInput from "./components/TodoInput/index.jsx";
import TodoList from "./components/TodoList/index.jsx";

const App = () => {
    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <TodoInput/>
            <TodoList/>
        </div>
    );
};
export default App
