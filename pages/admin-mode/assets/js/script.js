function toggleMenu(event) {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
  
  event.stopPropagation();
}

document.addEventListener("click", function(event) {
  const menu = document.getElementById("menu");
  const hamburger = document.querySelector(".hamburger");

  if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.classList.remove("show");
  }
});


const API_URL = 'https://demo-api-skills.vercel.app/api/FoodieTraveler/users';
let editingUserId = null;

window.onload = () => {
  if (localStorage.getItem('admin') === 'true') {
    showDashboard();
  }
};

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const validAdmins = [
    { username: 'xeanti', password: 'xeantiadmin' },
    { username: 'kit', password: 'kitadmin' },
    { username: 'niggu', password: 'nigguadmin' },
    { username: 'syno', password: 'saynoadmin' },
    { username: 'zaug', password: 'conadmin' },
  ];

  const isValidAdmin = validAdmins.some(admin => 
    admin.username === username && admin.password === password
  );

  if (isValidAdmin) {
    localStorage.setItem('admin', 'true');
    showDashboard();
  } else {
    document.getElementById('loginError').classList.remove('hidden');
  }
}

function logout() {
  localStorage.removeItem('admin');
  document.getElementById('dashboard').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');
}

function showDashboard() {
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
  fetchUsers();
}

async function fetchUsers() {
  try {
    const res = await axios.get(API_URL);
    const users = res.data;
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach(user => {
      const div = document.createElement('div');
      div.className = 'bg-white p-4 rounded shadow flex justify-between items-center';
      div.innerHTML = `
        <div>
          <p><strong>${user.name}</strong></p>
          <p class="text-sm text-gray-600">${user.email}</p>
          <p class="text-sm text-gray-400">Created: ${new Date(user.createdAt).toLocaleString()}</p>
        </div>
        <div class="flex gap-2">
          <button onclick="editUser('${user.id}', '${user.name}', '${user.email}')" class="bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
          <button onclick="deleteUser('${user.id}')" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
      `;
      userList.appendChild(div);
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    alert("Failed to fetch users. Please try again.");
  }
}

function hideUserForm() {
  document.getElementById('userFormModal').classList.add('hidden');
}

function editUser(id, name, email) {
  editingUserId = id;
  document.getElementById('formTitle').innerText = 'Edit User';
  document.getElementById('formName').value = name;
  document.getElementById('formEmail').value = email;
  document.getElementById('userFormModal').classList.remove('hidden');
}

async function submitUserForm() {
  const name = document.getElementById('formName').value;
  const email = document.getElementById('formEmail').value;

  if (!name || !email) {
    alert("Name and email are required.");
    return;
  }

  const userData = { name, email };

  try {
    await axios.put(`${API_URL}/${editingUserId}`, userData);
    alert("User edited successfully.");
  } catch (err) {
    console.error("Error editing user:", err.response ? err.response.data : err.message);
    alert("Failed to edit user. Please try again.");
  }

  hideUserForm();
  fetchUsers();
}

async function deleteUser(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    alert("User deleted successfully.");
    fetchUsers();
  } catch (err) {
    console.error("Error deleting user:", err);
    alert("Failed to delete user. Please try again.");
  }
}

function logout() {
    localStorage.removeItem('admin');
    
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
  
    document.getElementById('userList').innerHTML = '';
    hideUserForm();
  }