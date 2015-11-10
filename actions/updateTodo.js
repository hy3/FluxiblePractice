export default function (context, payload, done) {
    var todo = payload;
    todo.pending = true;

    context.dispatch('UPDATE_TODO_START', todo);

    context.service.update('todo', todo, {}, function (err, theTodo) {
        if (err) {
            context.dispatch('UPDATE_TODO_FAILURE', todo);
            done();
            return;
        }

        context.dispatch('UPDATE_TODO_SUCCESS', theTodo);
        done();
    });
};
