const tasksEndpoint = "http://localhost:8080/task";

function hideLoader() {
  document.getElementById("loading").style.display = "none";
}

function show(tasks) {
  let tab = '';

  for (let task of tasks) {
    tab += `
      <tr id="task-row-${task.id}">
        <td>
          <span class="task-text" id="task-text-${task.id}">${task.description}</span>
          <input class="edit-input" type="text" id="edit-input-${task.id}" value="${task.description}" style="display:none;" />
        </td>
        <td>
          <button onclick="enableEdit(${task.id})" id="edit-btn-${task.id}">Edit</button>
          <button onclick="saveEdit(${task.id})" id="save-btn-${task.id}" style="display:none;">Save</button>
          <button onclick="cancelEdit(${task.id})" id="cancel-btn-${task.id}" style="display:none;">Cancel</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </td>
      </tr>
    `;
  }

  document.getElementById("tasks").innerHTML = tab;
}

async function getTasks() {
  let key = "Authorization";
  const response = await fetch(`${tasksEndpoint}/user`, {
    method: "GET",
    headers: new Headers({
      Authorization: localStorage.getItem(key),
    }),
  });

  if (response.ok) {
    const data = await response.json();
    hideLoader();
    show(data);
  } else {
    showToast("Failed to fetch tasks.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("Authorization")) {
    window.location = "login.html"; 
  } else {
    getTasks();
  }

  document.getElementById("signOutBtn").addEventListener("click", function () {
    localStorage.removeItem("Authorization");
    window.location = "login.html";
  });
});

async function createTask(event) {
  event.preventDefault(); 

  let description = document.getElementById("taskDescription").value.trim();

  if (!description) {
    showToast("Please enter a task description.");
    return;
  }

  try {
    let key = "Authorization";
    const response = await fetch(tasksEndpoint, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(key),
      }),
      body: JSON.stringify({
        description: description,
      }),
    });

    if (response.ok) {
      showToast("Task added successfully.");
      document.getElementById("taskDescription").value = '';
      getTasks(); 
    } else {
      showToast("Failed to add task.");
    }
  } catch (error) {
    console.error("Error adding task:", error);
    showToast("An error occurred. Please try again.");
  }
}

function enableEdit(taskId) {
  document.getElementById(`task-text-${taskId}`).style.display = 'none';
  document.getElementById(`edit-input-${taskId}`).style.display = 'inline';
  document.getElementById(`edit-btn-${taskId}`).style.display = 'none';
  document.getElementById(`save-btn-${taskId}`).style.display = 'inline';
  document.getElementById(`cancel-btn-${taskId}`).style.display = 'inline';
}

function cancelEdit(taskId) {
  document.getElementById(`task-text-${taskId}`).style.display = 'inline';
  document.getElementById(`edit-input-${taskId}`).style.display = 'none';
  document.getElementById(`edit-btn-${taskId}`).style.display = 'inline';
  document.getElementById(`save-btn-${taskId}`).style.display = 'none';
  document.getElementById(`cancel-btn-${taskId}`).style.display = 'none';
}

async function saveEdit(taskId) {
  let description = document.getElementById(`edit-input-${taskId}`).value.trim();

  if (!description) {
    showToast("Please enter a task description.");
    return;
  }

  try {
    let key = "Authorization";
    const response = await fetch(`${tasksEndpoint}/${taskId}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(key),
      }),
      body: JSON.stringify({
        description: description,
      }),
    });

    if (response.ok) {
      showToast("Task updated successfully.");
      getTasks();
    } else {
      showToast("Failed to update task.");
    }
  } catch (error) {
    console.error("Error updating task:", error);
    showToast("An error occurred. Please try again.");
  }
}

async function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) {
    return;
  }

  try {
    let key = "Authorization";
    const response = await fetch(`${tasksEndpoint}/${id}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: localStorage.getItem(key),
      }),
    });

    if (response.ok) {
      showToast("Task deleted successfully.");
      getTasks();
    } else {
      showToast("Failed to delete task.");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    showToast("An error occurred. Please try again.");
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
