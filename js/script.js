// Inisialisasi array kosong untuk menyimpan daftar todo
const todos = new Array();

// ================ Display Todos ================ //
const todoList = document.getElementById("todoList");

function calculateDaysLeft(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function renderTodos() {
  todoList.innerHTML = ""; // Kosongkan isi tabel dulu

  if (todos.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td colspan="4" style="text-align: center; font-style: italic;">
            Tidak ada hal yang harus dikerjakan.
        </td>
    `;
    todoList.appendChild(row);
    return;
  }

  todos.forEach((todo, index) => {
      const daysLeft = calculateDaysLeft(todo.date);

      let emote = "✅";
      if (daysLeft < 0) emote = "❌";
      else if (daysLeft <= 1) emote = "⚠️";

      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${todo.text}</td>
          <td>In ${daysLeft} day${daysLeft !== 1 ? 's' : ''}</td>
          <td>${emote} ${todo.status}</td>
          <td><button onclick="deleteTodo(${index})">DROP</button></td>
      `;
      todoList.appendChild(row);
  });
}

// ================ Handle Input ================ //
const todo = document.getElementById("todo");
const date = document.getElementById("date");
const addTodoFrom = document.getElementById("addTodo");

function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}

addTodoFrom.addEventListener("submit", function(e) {
  e.preventDefault(); // Validasi HTML5 tetap jalan sebelum event ini
  const newTodo = {
    id: generateUniqueId(),
    text: todo.value,
    date: date.value,
    status: "Just Added"
  };
  todos.push(newTodo);
  renderTodos();
  todo.value="";
  date.value="";
})

// ================ Always Run ================ //
renderTodos();