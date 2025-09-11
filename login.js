import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


document.addEventListener('DOMContentLoaded', () => {
  const signupLink = document.getElementById('signupLink');
  signupLink.addEventListener('click', (e) => {
    e.preventDefault(); 
    window.location.href = 'signup.html';
  });
});

const signUpForm = document.getElementById('sign-in-form-main');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const confirmPasswordInput = document.getElementById('confirm-password-input')
const statusMsg = document.getElementById('statusMsg');

signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const confirm = confirmPasswordInput.value; 

  if (password !== confirm) {
    statusMsg.textContent = 'Passwords do not match';
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      createdAt: new Date()
    });

    statusMsg.textContent = 'Account created! Redirecting…';
    setTimeout(() => window.location.href = './story.html', 1500);
  } catch (err) {
    statusMsg.textContent = err.message;
  }
});
