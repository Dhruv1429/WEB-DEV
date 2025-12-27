// --- DOM Elements ---
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const fetchBtn = document.getElementById('fetch-btn');
const taskList = document.getElementById('task-list');
const errorBox = document.getElementById('error-box');
const themeToggle = document.getElementById('theme-toggle');
const taskCountLabel = document.getElementById('task-count'); // New

// --- 1. Browser Storage & Preferences ---

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadTheme();
});

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskCount(tasks.length);
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks(tasks);
    updateTaskCount(tasks.length);
}

function updateTaskCount(count) {
    taskCountLabel.innerText = `${count} ${count === 1 ? 'Task' : 'Tasks'}`;
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerText = '☀';
    }
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.innerText = isDark ? '☀' : '🌙';
});

// --- 2. Error Handling ---

function showError(message) {
    errorBox.textContent = `⚠ ${message}`;
    errorBox.classList.add('visible');
    setTimeout(() => {
        errorBox.classList.remove('visible');
    }, 3000);
}

function clearError() {
    errorBox.classList.remove('visible');
}

// --- 3. Core Logic ---

function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        // Added fade-in animation via CSS, structure is cleaner
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" onclick="deleteTask(${index})" title="Delete">&times;</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask(taskText) {
    try {
        if (!taskText.trim()) throw new Error("Please enter a task!");
        
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.unshift(taskText); // Add to top of list
        
        saveTasksToStorage(tasks);
        renderTasks(tasks);
        taskInput.value = '';
        taskInput.focus(); // Keep focus on input
        clearError();
        
    } catch (error) {
        showError(error.message);
    }
}

window.deleteTask = (index) => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
    renderTasks(tasks);
};

// Add on Click or Enter Key
addBtn.addEventListener('click', () => addTask(taskInput.value));
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask(taskInput.value);
});

// --- 4. Fetch External Data ---

fetchBtn.addEventListener('click', async () => {
    try {
        fetchBtn.innerText = "Loading...";
        fetchBtn.disabled = true;
        fetchBtn.style.cursor = "wait";

        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
        if (!response.ok) throw new Error("API Limit Reached or Network Error");

        const data = await response.json();
        const currentTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTasks = data.map(item => item.title); // Clean title only
        
        // Combine and remove duplicates (Set)
        const uniqueTasks = [...new Set([...currentTasks, ...newTasks])];
        
        saveTasksToStorage(uniqueTasks);
        renderTasks(uniqueTasks);
        
    } catch (error) {
        showError(error.message);
    } finally {
        fetchBtn.innerText = "⬇ Load Sample Data";
        fetchBtn.disabled = false;
        fetchBtn.style.cursor = "pointer";
    }
});