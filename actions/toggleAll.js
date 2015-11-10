export default function (context, payload, done) {
    context.dispatch('TOGGLE_ALL_TODO_START', payload);

    context.service.update('todo.toggleAll', payload, {}, function (err, todos) {
        if (err) {
            context.dispatch('TOGGLE_ALL_TODO_FAILURE', payload);
            done();
            return;
        }

        context.dispatch('TOGGLE_ALL_TODO_SUCCESS', todos);
        done();
    });
};
