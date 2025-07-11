// Inisialisasi array kosong untuk menyimpan daftar todo
const todos = new Array();
const search = document.getElementById("search");

// ================ Display Todos ================ //
const todoList = document.getElementById("todoList");

function calculateDaysLeft(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function renderTodos(keyword = "") {
  todoList.innerHTML = ""; // Kosongkan isi tabel dulu
  const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(keyword.toLowerCase()));
  if (filteredTodos.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td colspan="4" style="text-align: center; font-style: italic;">
            Tidak ada hal yang harus dikerjakan.
        </td>
    `;
    todoList.appendChild(row);
    return;
  }

  filteredTodos.forEach((todo) => {
      const daysLeft = calculateDaysLeft(todo.date);

      let emote = "✅";
      if (todo.status=="Selesai") {
        emote = "✅"
      } else if (daysLeft < 0) {
        todo.status = "Telat"
        emote = "⏰"
      }else if (daysLeft <= 1) {
        todo.status = "Kumpulnya hari ini!"
        emote = "📅"
      }  else if (daysLeft <= 3) {
        todo.status = "Hampir Deadline"
        emote = "⚠️"
      } else {
        emote = "🕒"
        todo.status = "Masih Lama"
      };
      
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${todo.text}</td>
          <td>In ${daysLeft} day${daysLeft !== 1 ? 's' : ''}</td>
          <td>${emote} ${todo.status}</td>
          <td style="display: flex; gap: 8px; align-items: center;">
            ${todo.status !== "Selesai" ? `
            <i class="fa-solid fa-check"
              style="background: #63E6BE; color: white; padding: 8px; border-radius: 6px; cursor: pointer; transition: 0.3s;"
              data-id="${todo.id}"></i>
            ` : ""}
            <i class="fa-solid fa-trash"
              style="background: #dd0808; color: white; padding: 8px; border-radius: 6px; cursor: pointer; transition: 0.3s;"
              data-id="${todo.id}">
            </i>
          </td>

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
});
// ================ Delete ALL ================ //
const deleteAllButton = document.getElementById("deleteAll");
deleteAllButton.addEventListener("click", function(e){
  e.preventDefault();
  if (confirm("Apakah Anda yakin ingin menghapus semua data?")) {
    todos.length = 0;
    renderTodos();
  }
});

// ================ Action ================ //
document.getElementById("todoList").addEventListener("click", function (e) {
  if (e.target.matches(".fa-trash")) {
    const id = e.target.getAttribute("data-id");
    deleteTodo(id);
    renderTodos();
  }
  if (e.target.matches(".fa-check")) {
    const id = e.target.getAttribute("data-id");
    updateStatus(id,"Selesai");
    renderTodos();
  }
});

const updateStatus = (id, newStatus) => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.status = newStatus;
  }
}
const deleteTodo = (id) => {
  if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    todos.splice(id, 1);
  }
};
// ================ Handle Searching ================ //
document.getElementById("search").addEventListener("input", function (e) {
  const keyword = e.target.value.toLowerCase();
  renderTodos(keyword);
});
// ================ Always Run ================ //
renderTodos();