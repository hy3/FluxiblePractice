export default function (context, payload, done) {
    context.dispatch('RECEIVE_TODOS_START', payload);
    context.dispatch('UPDATE_PAGE_TITLE', 'showTodos | flux-examples');

    context.service.read('todo', {}, {}, function (err, todos) {
        if (err) {
            context.dispatch('RECEIVE_TODOS_FAILURE', payload);
            done();
            return;
        }
        context.dispatch('RECEIVE_TODOS_SUCCESS', todos);
        done();
    });
};
