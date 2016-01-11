(function () {

    $(document).ready(function () {

        var newName = $('#newName'),
            todoList = $('#todoList'),
            template = tmpl('list_todos');

        var todos;

        function refreshToDos () {
            /* Fetch the list of todos and re-draw the listing */
            $.get('http://localhost:5000/api/todo', function (data) {
                todos = data['objects'];
                todoList.find('ul')
                    .replaceWith(template({todos: todos}));
            });
        }

        // Create a new to do
        newName.change(function () {
            var payload = JSON.stringify({name: newName.val()});
            $.post('http://localhost:5000/api/todo', payload, function () {
                refreshToDos();
                newName.val('');
            })
        });

        // Edit a to do
        todoList.on('click', '.edit', function () {
            // Toggle the <input> for this todo
            todoList.find('li').removeAttr('editing');
            var li = $(this).closest('li').first().attr('editing', '1');
        });
        todoList.on('change', 'input', function () {
            // When the revealed-input changes, update using PATCH
            var todoId = $(this).closest('li')[0].id,
                data = JSON.stringify({name: $(this).val()});
            $.ajax({url: 'http://localhost:5000/api/todo/' + todoId, type: 'PATCH', data: data})
                .done(function () {
                    refreshToDos();
                });
        });

        // Delete an existing to do
        todoList.on('click', '.delete', function () {
            var todoId = $(this).closest('li')[0].id;
            $.ajax({url: 'http://localhost:5000/api/todo/' + todoId, type: 'DELETE'})
                .done(function () {
                    refreshToDos();
                });
        });

        // On startup, go fetch the list of todos and re-draw
        refreshToDos();
    });

})();