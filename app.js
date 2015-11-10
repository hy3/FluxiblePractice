import Fluxible from 'fluxible';
import TodoApp from './components/TodoApp';
import TodoStore from './stores/TodoStore';
import PageStore from './stores/PageStore';
import fetchrPlugin from 'fluxible-plugin-fetchr';

// create new fluxible instance
const app = new Fluxible({
    component: TodoApp
});

app.plug(fetchrPlugin({
    xhrPath: '/api'
}));

// register stores
app.registerStore(TodoStore);
app.registerStore(PageStore);

export default app;
