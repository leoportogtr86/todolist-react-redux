### Entendendo Actions no Redux: Guia Completo

As actions são um dos principais conceitos do Redux e desempenham um papel crucial no gerenciamento de estado. Elas são
a única fonte de informação para a store sobre como o estado deve mudar. Neste artigo, vamos explorar detalhadamente o
que são as actions, como funcionam, como escrevê-las e como utilizá-las em uma aplicação Redux.

#### O Que São Actions?

Uma action é um objeto JavaScript simples que envia dados da aplicação para a store. Elas são a única maneira de enviar
informações da aplicação para a store. Cada action deve ter um tipo (`type`) que indica o tipo de ação a ser realizada
e, opcionalmente, pode conter outros dados relevantes (`payload`).

### Estrutura de uma Action

Uma action tem a seguinte estrutura básica:

```javascript
{
    type: 'ADD_TODO',
        payload
:
    'Learn Redux'
}
```

- **type**: Uma string que indica o tipo de ação a ser realizada. É obrigatório.
- **payload**: Dados adicionais necessários para executar a ação. É opcional, mas comum.

### Criando Actions

Actions podem ser criadas manualmente, mas uma prática comum é usar "action creators" – funções que retornam uma action.

#### Exemplo de Actions e Action Creators

Vamos criar algumas actions para uma aplicação de lista de tarefas (To-Do List).

#### Definindo Actions

```javascript
// src/actions/todoActions.js

// Action creator para adicionar uma tarefa
export const addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        payload: todo
    };
};

// Action creator para remover uma tarefa
export const removeTodo = (index) => {
    return {
        type: 'REMOVE_TODO',
        payload: index
    };
};
```

### Utilizando Actions na Aplicação

As actions são despachadas (dispatched) para a store usando o método `dispatch`. Este método é fornecido pela store e
está disponível em componentes React através do hook `useDispatch` do `react-redux`.

#### Despachando Actions em Componentes React

Vamos usar as actions criadas em um componente React para adicionar e remover tarefas.

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
            dispatch(addTodo(input)); // Despacha a ação de adicionar uma tarefa
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

### Tipos de Actions

#### Actions Síncronas

As actions vistas até agora são síncronas – a ação é despachada e o estado é atualizado imediatamente.

#### Actions Assíncronas

Para operações assíncronas (como chamadas a APIs), usamos middleware como `redux-thunk` ou `redux-saga`.

##### Exemplo com Redux Thunk

Primeiro, instale o redux-thunk:

```bash
npm install redux-thunk
```

Configure a store para usar o middleware thunk:

```javascript
// src/store.js

import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});

export default store;
```

Defina uma action assíncrona:

```javascript
// src/actions/todoActions.js

import axios from 'axios';

export const fetchTodos = () => {
    return async (dispatch) => {
        const response = await axios.get('/api/todos');
        dispatch({
            type: 'FETCH_TODOS',
            payload: response.data
        });
    };
};
```

### Boas Práticas para Escrever Actions

1. **Defina Constantes para os Tipos de Actions**: Evite erros de digitação definindo constantes para os tipos de
   actions.

    ```javascript
    // src/actions/actionTypes.js

    export const ADD_TODO = 'ADD_TODO';
    export const REMOVE_TODO = 'REMOVE_TODO';
    ```

2. **Mantenha Actions Simples**: As actions devem ser simples objetos que descrevem um evento.
3. **Use Action Creators**: Sempre use action creators para criar ações. Isso facilita a manutenção e a leitura do
   código.
4. **Documente as Actions**: Descreva o propósito de cada action e seu payload.

### Conclusão

As actions são fundamentais para o fluxo de dados no Redux. Elas são a única fonte de verdade para mudanças de estado,
permitindo uma maneira previsível e centralizada de gerenciar o estado da aplicação. Ao seguir boas práticas e usar
action creators, você pode manter seu código organizado, fácil de entender e de manter.

Compreender e utilizar actions de forma eficaz é essencial para construir aplicações Redux robustas e escaláveis. Com a
capacidade de lidar tanto com operações síncronas quanto assíncronas, as actions proporcionam a flexibilidade necessária
para gerenciar estados complexos em qualquer aplicação JavaScript moderna.