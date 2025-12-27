/* login.js */

const f = document.getElementById('loginForm');
const u = document.getElementById('username');
const p = document.getElementById('password');
const uErr = document.getElementById('uErr');
const pErr = document.getElementById('pErr');
const remember = document.getElementById('remember');
const formMsg = document.getElementById('formMsg');

// --- SET YOUR SPECIFIC ID AND PASS HERE ---
const VALID_USER = "dhruv";
const VALID_PASS = "1234"; 

// Pre-fill username if remembered
const remembered = localStorage.getItem('demo:username');
if (remembered) {
  u.value = remembered;
  remember.checked = true;
}

// Visual Validation only (Checks if empty)
function validateInput() {
  let isValid = true;
  if (!u.value.trim()) { uErr.textContent = 'Username is required.'; isValid = false; } 
  else { uErr.textContent = ''; }
  
  if (!p.value) { pErr.textContent = 'Password is required.'; isValid = false; } 
  else { pErr.textContent = ''; }
  
  return isValid;
}

// Clear errors on type
u.addEventListener('input', () => { uErr.textContent = ''; formMsg.classList.add('d-none'); });
p.addEventListener('input', () => { pErr.textContent = ''; formMsg.classList.add('d-none'); });

f.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (!validateInput()) return;

  const usernameInput = u.value.trim();
  const passwordInput = p.value;

  // CHECK CREDENTIALS
  if (usernameInput === VALID_USER && passwordInput === VALID_PASS) {
    
    // 1. Success: Handle "Remember Me"
    if (remember.checked) localStorage.setItem('demo:username', usernameInput);
    else localStorage.removeItem('demo:username');

    // 2. Set Session (Logs them in)
    sessionStorage.setItem('demo:activeUser', usernameInput);

    // 3. Redirect to your Portfolio (Index.html)
    window.location.href = 'index.html';

  } else {
    // Failure: Show error banner
    formMsg.classList.remove('d-none');
    p.value = ''; // Clear password field
  }
});