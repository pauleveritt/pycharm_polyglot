import $ from 'jquery';

export class ToDos {
    constructor () {
        this.todos = [];
        this.newName = $('#newName');
        this.todoList = $('#todoList');

        // Event handlers
        this.newName.change(() => this.create(this.newName.val()));
        this.todoList.on('click', '.delete', (evt) => {
            this.delete($(evt.target).closest('li')[0].id);
        });
        this.todoList.on('click', '.edit', (evt) => {
            // Toggle the <input> for this todo
            this.todoList.find('li').removeAttr('editing');
            $(evt.target).closest('li').first().attr('editing', '1');
        });
        this.todoList.on('change', 'input', (evt) => {
            let todoId = $(evt.target).closest('li')[0].id,
                data = JSON.stringify({name: $(evt.target).val()});
            this.update(todoId, data);
        });

        this.refresh();
    }

    create (newName) {
        let payload = JSON.stringify({name: newName});
        $.post('http://localhost:5000/api/todo', payload, () => {
            this.refresh();
            this.newName.val('');
        });
    }

    update (todoId, data) {
        $.ajax({url: 'http://localhost:5000/api/todo/' + todoId, type: 'PATCH', data: data})
            .done(() => this.refresh());

    }

    delete (todoId) {
        $.ajax({url: 'http://localhost:5000/api/todo/' + todoId, type: 'DELETE'})
            .done(() => this.refresh());
    }

    renderTodo (todo) {
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

    refresh () {
        /* Fetch the list of todos and re-draw the listing */
        $.get('http://localhost:5000/api/todo', (data) => {
            this.todos = data['objects'];
            this.todoList.find('ul')
                .html(
                    this.todos
                        .map(todo => this.renderTodo(todo))
                        .join('\n')
                );
        });
    }
}
