import $ from 'jquery';

export default function () {

    var newName = $('#newName'),
        todoList = $('#todoList');

    var todos;

    function renderTodo (todo) {
        return `
    <li class="list-group-item" id="${ todo.id }">
        <span>${ todo.name }</span>
        <input class="form-control input-sm" title="Edit title"
               value="${ todo.name }"/>

        <div class="btn-group pull-right" role="group">
            <button class="btn btn-xs btn-default edit">Edit</button>
            <button class="btn btn-xs btn-default delete">Delete</button>
        </div>
    </li>`;
    }

    function refreshToDos () {
        /* Fetch the list of todos and re-draw the listing */
        $.get('http://localhost:5000/api/todo', function (data) {
            todos = data['objects'];
            todoList.find('ul')
                .html(
                    todos
                        .map(todo => renderTodo(todo))
                        .join('\n')
                );
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
};
