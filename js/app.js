window.onload = function() {
  todoDB.open(refreshTodos);

  var newTodoForm = document.getElementById("new-todo-form");
  var newTodoInput = document.getElementById("new-todo");

  newTodoForm.onsubmit = function() {
    var text = newTodoInput.value;

    if (text.replace(/ /g, "") != "") {
      todoDB.createTodo(text, function(todo) {
        refreshTodos();
      });
    }

    newTodoInput.value = "";
    return false;
  };

  function refreshTodos() {
    todoDB.fetchTodos(function(todos) {
      var todoList = document.getElementById("todo-items");
      todoList.innerHTML = "";

      for (var i = 0; i < todos.length; i++) {
        var todo = todos[todos.length - 1 - i];

        var li = document.createElement("li");
        li.id = "todo-" + todo.timestamp;
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "todo-checkbox";
        checkbox.setAttribute("data-id", todo.timestamp);

        li.appendChild(checkbox);

        var span = document.createElement("span");
        span.innerHTML = todo.text;

        li.appendChild(span);

        todoList.appendChild(li);

        checkbox.addEventListener("click", function(e) {
          var id = parseInt(e.target.getAttribute("data-id"));

          todoDB.deleteTodo(id, refreshTodos);
        });
      }
    });
  }
};
