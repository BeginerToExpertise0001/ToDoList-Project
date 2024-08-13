
// Form validation and toggle buttons

// Get form elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleSignupFormBtn = document.getElementById('toggle-signup-form');
const toggleLoginFormBtn = document.getElementById('toggle-login-form');
const emailInput = document.getElementById('email');

// Store usernames and passwords in local storage
let storedAccounts = localStorage.getItem('accounts');
let accounts = storedAccounts ? JSON.parse(storedAccounts) : {};

// Login form validation
loginForm.addEventListener('submit', (e) => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === '' || password === '') {
    alert('Please fill in all fields');
    e.preventDefault();
  } else if (!accounts[username]) {
    alert('Account not found. Please sign up first.');
    e.preventDefault();
  } else if (accounts[username] !== password) {
    alert('Incorrect password');
    e.preventDefault();
  }
});

// Signup form validation
signupForm.addEventListener('submit', (e) => {
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (username === '' || email === '' || password === '' || confirmPassword === '') {
    alert('Please fill in all fields');
    e.preventDefault();
  } else if (username.length < 3) {
    alert('Username must be at least 3 characters');
    e.preventDefault();
  } else if (password.length < 8) {
    alert('Password must be at least 8 characters');
    e.preventDefault();
  } else if (password !== confirmPassword) {
    alert('Passwords do not match');
    e.preventDefault();
  } else if (!validateEmail(email)) {
    alert('Invalid email address');
    e.preventDefault();
  } else if (accounts[username]) {
    alert('Username already taken');
    e.preventDefault();
  } else {
    // Add account to local storage
    accounts[username] = password;
    localStorage.setItem('accounts', JSON.stringify(accounts));
    alert('Account created successfully!');
  }
});

// Email domain name validation
function validateEmail(email) {
  const domain = email.split('@')[1];

  // Check if domain is valid
  if (!domain) {
    return false;
  }

  // Check if domain has at least two parts (e.g., (link unavailable))
  if (domain.split('.').length < 2) {
    return false;
  }

  // Check if domain has any invalid characters
  if (!/^[a-zA-Z0-9.-]+$/.test(domain)) {
    return false;
  }

  /*Check if domain has a valid top-level domain (TLD)
  const tld = domain.split('.').pop();
  if (!/^[a-zA-Z]{2,}$/.test(tld)) {
    return false;
  }*/
  return true;
}

// Toggle buttons
toggleSignupFormBtn.addEventListener('click', () => {
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  toggleSignupFormBtn.style.display = 'none';
});
