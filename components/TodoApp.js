import React from 'react';
import { connectToStores, provideContext } from 'fluxible-addons-react';
import TodoStore from '../stores/TodoStore';
import TodoItem from './TodoItem';
import Footer from './Footer';
import createTodo from '../actions/createTodo';
import updateTodo from '../actions/updateTodo';
import deleteTodo from '../actions/deleteTodo';
import toggleAll from '../actions/toggleAll';

const ENTER_KEY = 13;

class TodoApp extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.context = context;
        this.state = {nowShowing: 'ALL_TODOS'};
    }

    handleNewTodoKeyDown(event) {
        if (event.which !== ENTER_KEY) {
            return;
        }

        event.preventDefault();

        var text = this.refs.newField.value.trim();

        if (text) {
            this.context.executeAction(createTodo, {
                text: text
            });
            this.refs.newField.value = '';
        }
    }

    changeFilter(filter, event) {
        this.setState({ nowShowing: filter });
        event.preventDefault();
    }

    clearCompleted() {
        var ids = this.props.items.filter(function (todo) {
            return todo.completed;
        }).map(function (todo) {
            return todo.id;
        });

        this.context.executeAction(deleteTodo, {
            ids: ids
        });
    }

    toggleAll(event) {
        var checked = event.target.checked;
        this.context.executeAction(toggleAll, {
            checked: checked
        });
    }

    toggle(todo) {
        this.context.executeAction(updateTodo, {
            id: todo.id,
            completed: !todo.completed,
            text: todo.text
        });
    }

    destroy(todo) {
        this.context.executeAction(deleteTodo, {
            ids: [todo.id]
        });
    }

    edit(todo, callback) {
        // refer TodoItem.handleEdit for the reasoning behind callback
        this.setState({ editing: todo.id }, function () {
            callback();
        });
    }

    save(todo, completed, text) {
        this.context.executeAction(updateTodo, {
            id: todo.id,
            completed: completed,
            text: text
        });

        this.setState({ editing: null });
    }

    cancel() {
        this.setState({ editing: null });
    }

    render() {
        var todos = this.props.items;
        var main;
        var footer;

        var shownTodos = todos.filter(function (todo) {
            switch(this.state.nowShowing) {
                case 'ACTIVE_TODOS':
                    return !todo.completed;
                case 'COMPLETED_TODOS':
                    return todo.completed;
                case 'ALL_TODOS':
                    return true;
            }
        }, this);

        var todoItems = shownTodos.map(function (todo) {
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={this.toggle.bind(this, todo)}
                    onDestroy={this.destroy.bind(this, todo)}
                    onEdit={this.edit.bind(this, todo)}
                    editing={this.state.editing === todo.id}
                    onSave={this.save.bind(this, todo)}
                    onCancel={this.cancel.bind(this)}
                />
            );
        }, this);

        var activeTodoCount = todos.reduce(function (total, todo) {
            return todo.completed ? total : total + 1;
        }, 0);

        var completedCount = todos.length - activeTodoCount;

        if (activeTodoCount || completedCount) {
            footer = <Footer
                count={activeTodoCount}
                completedCount={completedCount}
                nowShowing={this.state.nowShowing}
                onClearCompleted={this.clearCompleted.bind(this)}
                onFilterChange={this.changeFilter.bind(this)}
            />;
        }

        if (todos.length) {
            main = (
                <section id="main">
                    <input
                        id="toggle-all"
                        type="checkbox"
                        onChange={this.toggleAll.bind(this)}
                        checked={activeTodoCount === 0}
                    />
                    <ul id="todo-list">
                        {todoItems}
                    </ul>
                </section>
            );
        }

        return (
            <div>
                <header id="header">
                    <h1>todos</h1>
                    <input
                        ref="newField"
                        id="new-todo"
                        placeholder="What needs to be done?"
                        onKeyDown={this.handleNewTodoKeyDown.bind(this)}
                        autoFocus={true}
                    />
                </header>
                {main}
                {footer}
            </div>
        );
    }
}

TodoApp.contextTypes = {
    getStore:      React.PropTypes.func.isRequired,
    executeAction: React.PropTypes.func.isRequired
};

export default provideContext(connectToStores(
    TodoApp,
    [TodoStore],
    function (context, props) {
        return {
            items: context.getStore(TodoStore).getAll()
        };
    }
));
