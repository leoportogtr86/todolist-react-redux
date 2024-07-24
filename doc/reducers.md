### Entendendo Reducers no Redux: Guia Completo

Os reducers são uma parte fundamental do Redux, a biblioteca de gerenciamento de estado previsível para JavaScript. Eles
são responsáveis por especificar como o estado da aplicação muda em resposta a ações. Neste artigo, vamos explorar em
profundidade o conceito de reducers, como funcionam, como escrevê-los e como integrá-los em uma aplicação Redux.

#### O Que São Reducers?

Em Redux, um reducer é uma função pura que recebe o estado atual e uma ação, e retorna um novo estado. Reducers
especificam como o estado da aplicação deve mudar em resposta a uma ação enviada (dispatched).

Uma função pura é aquela que, para os mesmos argumentos, sempre retorna o mesmo resultado e não causa efeitos colaterais
observáveis.

### Estrutura Básica de um Reducer

Um reducer é uma função que segue esta assinatura:

```javascript
const reducer = (state, action) => {
    // Lógica para determinar o novo estado
    return newState;
};
```

### Criando um Reducer

Vamos criar um reducer para gerenciar uma lista de tarefas (To-Do List). Esse reducer responderá a duas ações: adicionar
uma nova tarefa e remover uma tarefa existente.

#### Estado Inicial

O estado inicial é o estado padrão quando a aplicação é carregada pela primeira vez.

```javascript
const initialState = {
    items: []
};
```

#### Definindo o Reducer

O reducer deve verificar o tipo de ação recebida e, com base nisso, determinar como o estado deve ser atualizado.

```javascript
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

### Entendendo a Lógica do Reducer

- **state**: Representa o estado atual.
- **action**: Representa a ação enviada, contendo um tipo e um payload.
- **switch (action.type)**: Verifica o tipo de ação.
- **case 'ADD_TODO'**: Adiciona uma nova tarefa ao array `items`.
- **case 'REMOVE_TODO'**: Remove uma tarefa do array `items` com base no índice.
- **default**: Retorna o estado atual se a ação não for reconhecida.

### Integrando o Reducer na Store

Uma vez que o reducer está definido, ele precisa ser integrado na store do Redux. A store é configurada para usar o
reducer.

#### Configurando a Store

```javascript
import {createStore} from 'redux';
import todoReducer from './reducers/todoReducer';

const store = createStore(todoReducer);

export default store;
```

### Combinação de Múltiplos Reducers

Em aplicações maiores, é comum dividir a lógica em múltiplos reducers, cada um gerenciando uma parte do estado. O Redux
fornece a função `combineReducers` para combinar esses reducers em um único reducer raiz.

#### Exemplo de Vários Reducers

Vamos supor que, além de gerenciar tarefas, também precisamos gerenciar o estado de autenticação do usuário.

#### authReducer.js

```javascript
const initialAuthState = {
    isAuthenticated: false
};

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, isAuthenticated: true};
        case 'LOGOUT':
            return {...state, isAuthenticated: false};
        default:
            return state;
    }
};

export default authReducer;
```

#### rootReducer.js

```javascript
import {combineReducers} from 'redux';
import todoReducer from './todoReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    todos: todoReducer,
    auth: authReducer
});

export default rootReducer;
```

#### Configurando a Store com o Root Reducer

```javascript
import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

export default store;
```

### Boas Práticas para Escrever Reducers

1. **Mantenha a Pureza**: Nunca modifique diretamente o estado ou os argumentos de ação. Sempre retorne um novo objeto.
2. **Use Immutable Updates**: Utilize métodos que não mutam o estado original, como `concat`, `slice`, ou o operador
   spread (`...`).
3. **Divida e Conquiste**: Divida reducers grandes em reducers menores e combine-os usando `combineReducers`.
4. **Evite Lógica Complexa**: Mantenha a lógica do reducer simples. Mova a lógica complexa para action creators ou
   middlewares.
5. **Teste os Reducers**: Escreva testes para garantir que os reducers estão atualizando o estado corretamente.

### Conclusão

Os reducers são fundamentais para o funcionamento do Redux. Eles definem como o estado da aplicação muda em resposta a
ações, garantindo que o estado seja gerenciado de maneira previsível e imutável. Ao seguir as boas práticas e estruturar
bem os reducers, você pode criar aplicações escaláveis e fáceis de manter.

Com a compreensão dos reducers e como eles se integram à store, você está bem preparado para desenvolver e gerenciar o
estado de aplicações complexas usando Redux.