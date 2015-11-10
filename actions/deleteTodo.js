export default function (context, payload, done) {
    context.dispatch('DELETE_TODO_START', payload);

    context.service.delete('todo', payload, {}, function (err, todos) {
        if (err) {
            context.dispatch('DELETE_TODO_FAILURE', payload);
            done();
            return;
        }

        context.dispatch('DELETE_TODO_SUCCESS', todos);
        done();
    });
};
