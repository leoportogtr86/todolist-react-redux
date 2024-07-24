### Estrutura do Projeto

- `src/`
    - `actions/`
        - `todoActions.js`
    - `components/`
        - `TodoInput.js`
        - `TodoList.js`
    - `reducers/`
        - `rootReducer.js`
        - `todoReducer.js`
    - `store.js`
    - `App.js`
    - `index.js`
    - `styles.css`

### Código e Documentação

#### store.js

```javascript
// src/store.js

import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Configura a store do Redux com o rootReducer, que combina todos os reducers da aplicação.
const store = configureStore({
    reducer: rootReducer
});

export default store;
```

- **configureStore**: Método do Redux Toolkit que cria a store.
- **rootReducer**: O rootReducer combina todos os reducers individuais.

#### rootReducer.js

```javascript
// src/reducers/rootReducer.js

import {combineReducers} from 'redux';
import todoReducer from './todoReducer';

// Combina todos os reducers em um único reducer raiz.
const rootReducer = combineReducers({
    todos: todoReducer
});

export default rootReducer;
```

- **combineReducers**: Função do Redux que combina múltiplos reducers em um único reducer.
- **todoReducer**: Reducer responsável pelo estado das tarefas.

#### todoReducer.js

```javascript
// src/reducers/todoReducer.js

// Estado inicial do reducer de tarefas.
const initialState = {
    items: []
};

// Reducer que gerencia as ações relacionadas às tarefas.
const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            // Adiciona uma nova tarefa à lista.
            return {...state, items: [...state.items, action.payload]};
        case 'REMOVE_TODO':
            // Remove uma tarefa da lista com base no índice.
            return {...state, items: state.items.filter((todo, index) => index !== action.payload)};
        default:
            // Retorna o estado atual se nenhuma ação for correspondida.
            return state;
    }
};

export default todoReducer;
```

- **initialState**: Estado inicial com uma lista vazia de tarefas.
- **todoReducer**: Função que gerencia as ações de adicionar e remover tarefas.

#### todoActions.js

```javascript
// src/actions/todoActions.js

// Cria uma ação para adicionar uma nova tarefa.
export const addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        payload: todo
    };
};

// Cria uma ação para remover uma tarefa existente com base no índice.
export const removeTodo = (index) => {
    return {
        type: 'REMOVE_TODO',
        payload: index
    };
};
```

- **addTodo**: Action creator para adicionar uma tarefa.
- **removeTodo**: Action creator para remover uma tarefa.

#### index.js

```javascript
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import App from './App';
import './styles.css'; // Importando o CSS global

// Envolve o aplicativo com o Provider para que a store do Redux esteja disponível para todos os componentes.
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
```

- **Provider**: Componente do react-redux que fornece a store para toda a aplicação.
- **store**: A store configurada com o Redux.

#### App.js

```javascript
// src/App.js

import React from 'react';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

// Componente principal que contém a estrutura da aplicação.
const App = () => {
    return (
        <div className="container">
            <h1>Lista de Tarefas</h1>
            <TodoInput/>
            <TodoList/>
        </div>
    );
};

export default App;
```

- **TodoInput**: Componente para adicionar novas tarefas.
- **TodoList**: Componente que exibe a lista de tarefas.

#### TodoInput.js

```javascript
// src/components/TodoInput.js

import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTodo} from '../actions/todoActions';

// Componente para entrada de novas tarefas.
const TodoInput = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    // Função chamada ao submeter o formulário.
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            dispatch(addTodo(input)); // Despacha a ação de adicionar uma tarefa.
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Adicione uma nova tarefa"
            />
            <button type="submit">Adicionar</button>
        </form>
    );
};

export default TodoInput;
```

- **useState**: Hook do React para gerenciar o estado local do input.
- **useDispatch**: Hook do react-redux para despachar ações.
- **handleSubmit**: Função para lidar com o envio do formulário e adicionar a tarefa.

#### TodoList.js

```javascript
// src/components/TodoList.js

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeTodo} from '../actions/todoActions';

// Componente para exibir a lista de tarefas.
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
```

- **useSelector**: Hook do react-redux para acessar o estado da store.
- **useDispatch**: Hook do react-redux para despachar ações.
- **removeTodo**: Ação para remover uma tarefa da lista.

#### styles.css

```css
/* src/styles.css */

/* Estilos Globais */
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

h1 {
    color: #333;
    text-align: center;
}

.container {
    background: #fff;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

form {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

input[type="text"] {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
    outline: none;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    background: #f8f9fa;
    margin: 5px 0;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

li button {
    background-color: #dc3545;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    padding: 5px 10px;
    color: white;
}

li button:hover {
    background-color: #c82333;
}
```

- **Estilos Globais**: Define estilos para o corpo, cabeçalhos e layout da aplicação.
- **Container**: Define a aparência do contêiner principal que envolve a aplicação.
- **Formulário**: Estilos para o formulário de entrada e botão.
- **Lista de Tarefas**: Estilos para a lista de tarefas e botões de remoção.

### Conclusão

Com esta documentação, você deve ter uma compreensão clara de como cada parte da aplicação funciona. Este projeto de
lista de tarefas é um exemplo simples, mas fornece uma base sólida para aprender e aplicar conceitos do Redux em
aplicações React. Você pode expandir este exemplo para adicionar mais funcionalidades, como edição de tarefas, marcação
de tarefas concluídas, persistência de dados com uma API, e muito mais.