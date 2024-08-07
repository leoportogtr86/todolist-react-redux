### Gerenciamento de Estado em React com Redux: Um Guia Detalhado

O gerenciamento de estado é uma das partes mais cruciais no desenvolvimento de aplicações modernas com React. À medida
que a aplicação cresce, manter o controle sobre os estados pode se tornar complexo e desafiador. É aí que o Redux entra
em cena como uma solução poderosa e previsível para o gerenciamento de estado.

Neste artigo, vamos explorar os conceitos fundamentais do Redux, entender seu propósito e aprender a implementá-lo em
uma aplicação React com um exemplo prático de uma lista de tarefas (To-Do List).

#### O que é Redux?

Redux é uma biblioteca de gerenciamento de estado previsível para JavaScript. Ele ajuda a escrever aplicações que se
comportam de forma consistente em diferentes ambientes (cliente, servidor e nativo) e são fáceis de testar. O Redux se
baseia em três princípios fundamentais:

1. **Single Source of Truth (Única Fonte de Verdade)**: O estado da aplicação é mantido em uma única store.
2. **State is Read-Only (O Estado é Somente Leitura)**: A única maneira de mudar o estado é emitir uma ação, um objeto
   descrevendo o que aconteceu.
3. **Changes are Made with Pure Functions (Mudanças São Feitas com Funções Puras)**: Para especificar como o estado muda
   em resposta a uma ação, você escreve reducers puros.

### Implementação de Redux em uma Aplicação React

Vamos construir uma aplicação de lista de tarefas simples para demonstrar como integrar Redux com React.

### Passo 1: Instalar as Dependências

Primeiramente, instale as bibliotecas necessárias: `redux`, `react-redux` e `@reduxjs/toolkit`.

```bash
npm install redux react-redux @reduxjs/toolkit
```

### Passo 2: Configurar a Store

A store é o coração do Redux. Ela mantém o estado global da aplicação. Vamos configurar a store em um
arquivo `store.js`.

```javascript
// src/store.js
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer
});

export default store;
```

### Passo 3: Criar os Reducers

Reducers são funções que determinam como o estado muda em resposta a uma ação. Vamos criar um reducer para gerenciar as
tarefas.

#### rootReducer.js

```javascript
// src/reducers/rootReducer.js
import {combineReducers} from 'redux';
import todoReducer from './todoReducer';

const rootReducer = combineReducers({
    todos: todoReducer
});

export default rootReducer;
```

#### todoReducer.js

```javascript
// src/reducers/todoReducer.js
const initialState = {
    items: []
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {...state, items: [...state.items, action.payload]};
        case 'REMOVE_TODO':
            return {...state, items: state.items.filter((todo, index) => index !== action.payload)};
        default:
            return state;
    }
};

export default todoReducer;
```

### Passo 4: Criar Actions

Actions são objetos que descrevem mudanças que devem acontecer no estado. Vamos criar actions para adicionar e remover
tarefas.

#### todoActions.js

```javascript
// src/actions/todoActions.js
export const addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        payload: todo
    };
};

export const removeTodo = (index) => {
    return {
        type: 'REMOVE_TODO',
        payload: index
    };
};
```

### Passo 5: Integrar a Store com o React

Para integrar o Redux com a aplicação React, precisamos envolver o componente raiz com o `Provider` do `react-redux`.

#### index.js

```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
```

### Passo 6: Criar Componentes

Vamos criar dois componentes principais: `TodoList` para exibir a lista de tarefas e `TodoInput` para adicionar novas
tarefas.

#### Componente TodoList

```javascript
// src/components/TodoList.js
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeTodo} from '../actions/todoActions';

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

#### Componente TodoInput

```javascript
// src/components/TodoInput.js
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTodo} from '../actions/todoActions';

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
```

### Passo 7: Integrar Componentes no App

Modifique o componente `App` para incluir `TodoList` e `TodoInput`.

#### App.js

```javascript
// src/App.js
import React from 'react';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

const App = () => {
    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <TodoInput/>
            <TodoList/>
        </div>
    );
};

export default App;
```

### Passo 8: Testar a Aplicação

Agora, você deve ter uma aplicação React funcional que utiliza Redux para gerenciar uma lista de tarefas. Teste a
aplicação para garantir que você pode adicionar e remover tarefas corretamente.

### Conclusão

Redux é uma ferramenta poderosa para o gerenciamento de estado em aplicações React. Ele proporciona uma maneira
previsível de lidar com estados complexos e facilita a manutenção e escalabilidade de grandes aplicações. Neste artigo,
vimos como configurar o Redux em uma aplicação React, desde a instalação das dependências até a criação de reducers,
actions e integração com componentes React.

Com essa base sólida, você pode expandir suas habilidades e explorar funcionalidades mais avançadas do Redux, como
middleware (por exemplo, redux-thunk para ações assíncronas), reestruturação do estado, normalização de dados, entre
outras. Ao dominar o Redux, você estará bem equipado para enfrentar os desafios do desenvolvimento de aplicações
modernas e robustas com React.