import BaseStore from 'fluxible/addons/BaseStore';

class TodoStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.todos = [];
    }
    receiveTodos(todos) {
        this.todos = todos;
        this.emitChange()
    }
    createTodoStart(todo) {
        this.todos.push(todo);
        this.emitChange();
    }
    createTodoSuccess(newTodo) {
        this.todos.forEach(function (todo, index) {
            if (todo.id === newTodo.id) {
                this.todos.splice(index, 1, newTodo);
            }
        }, this);

        this.emitChange();
    }
    createTodoFailure(failedTodo) {
        this.todos.forEach(function (todo, index) {
            if (todo.id === failedTodo.id) {
                todo.failure = true;
            }
        }, this);

        this.emitChange();
    }
    updateTodoStart(theTodo) {
        this.todos.forEach(function (todo, index) {
            if (todo.id === theTodo.id) {
                this.todos.splice(index, 1, theTodo);
            }
        }, this);

        this.emitChange();
    }
    updateTodoSuccess(theTodo) {
        this.todos.forEach(function (todo, index) {
            if (todo.id === theTodo.id) {
                this.todos.splice(index, 1, theTodo);
            }
        }, this);

        this.emitChange();
    }
    getAll() {
        return this.todos;
    }
    createTodo(details) {
        return {
            id: String('td_' + details.timestamp),
            editing: false,
            completed: false,
            text: String(details.text),
            pending: true
        };
    }
    dehydrate() {
        return {
            todos: this.todos
        };
    }
    rehydrate(state) {
        this.todos = state.todos;
    }
};

TodoStore.storeName = 'TodoStore';
TodoStore.handlers = {
    'RECEIVE_TODOS_SUCCESS': 'receiveTodos',
    'CREATE_TODO_START': 'createTodoStart',
    'CREATE_TODO_FAILURE': 'createTodoFailure',
    'CREATE_TODO_SUCCESS': 'createTodoSuccess',
    'UPDATE_TODO_START': 'updateTodoStart',
    'UPDATE_TODO_SUCCESS': 'updateTodoSuccess',
    'DELETE_TODO_SUCCESS': 'receiveTodos',
    'TOGGLE_ALL_TODO_SUCCESS': 'receiveTodos'
}

export default TodoStore;
