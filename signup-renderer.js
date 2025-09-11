import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
  const signupLink = document.getElementById('goToSignup');
  signupLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    window.location.href = 'login.html';
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('sign-in-form-main');
  const emailInput = document.getElementById('sign-in-email');
  const passwordInput = document.getElementById('sign-in-password');
  const statusMsg = document.getElementById('statusMsg');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      statusMsg.textContent = 'Login successful! Redirecting…';

      setTimeout(() => {
        window.location.href = './main_home.html'; 
      }, 1500);

    } catch (err) {
      statusMsg.textContent = err.message;
    }
  });
});
