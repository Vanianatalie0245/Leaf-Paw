const cat = document.getElementById('cat');
const meowAudio = new Audio('assets/cat-meow.mp3'); 
let patCount = 0;
let resetTimer;

//cat animation changing every pats 

cat.addEventListener('click', () => {
  if (patCount < 3) {
    patCount++;

    if (patCount === 1) {
      cat.src = 'assets/cat-slowly-waking.png';
    } else if (patCount === 2) {
      cat.src = 'assets/pet-stretching.png';
    } else if (patCount === 3) {
      cat.src = 'assets/pet-awake.png';
    }

    meowAudio.currentTime = 0; 
    meowAudio.play();

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      patCount = 0;
      cat.src = 'assets/cat-sleeping.png';
    }, 5000);
  }
});

//pop-up for planner, diary, and recorded-diary

const overlay = document.getElementById('overlay');
const menu2 = document.getElementById('menu-2');
const popup2 = document.getElementById('popup-2');

menu2.addEventListener('click', () => {
  popup2.style.display = 'flex'; 
  overlay.style.display = 'flex';
});

const closeBtn = document.getElementById('button-close1'); 
closeBtn.addEventListener('click', () => {
  popup2.style.display = 'none'; 
  overlay.style.display = 'none';
});

const menu3 = document.getElementById('menu-3');
const popup3 = document.getElementById('popup-3');

menu3.addEventListener('click', () => {
  popup3.style.display = 'flex'; 
  overlay.style.display = 'flex';
});

const closeBtn3 = document.getElementById('button-close3'); 
closeBtn3.addEventListener('click', () => {
  popup3.style.display = 'none'; 
  overlay.style.display = 'none';

});

//get today's date and tommorrow's date for pop-ups

const spanDate = document.getElementById('tommorowDate'); 
const spanDate2 = document.getElementById('tommorowDate2'); 
const spanDate3 = document.getElementById('tommorowDate3')

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

// format tomorrow
const ddTomorrow = String(tomorrow.getDate()).padStart(2, '0');
const mmTomorrow = String(tomorrow.getMonth() + 1).padStart(2, '0');
const yyTomorrow = String(tomorrow.getFullYear());

// format today
const ddToday = String(today.getDate()).padStart(2, '0');
const mmToday = String(today.getMonth() + 1).padStart(2, '0');
const yyToday = String(today.getFullYear());

spanDate.textContent = `${ddTomorrow}/${mmTomorrow}/${yyTomorrow}`;
spanDate2.textContent = `${ddToday}/${mmToday}/${yyToday}`;
spanDate3.textContent = `${ddToday}/${mmToday}/${yyToday}`;

//login streak counter --> date from firestore --> updated by server-time

import { auth, db } from './firebase.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const dateSpan = document.getElementById('countDays');

async function updateLoginStreak() {
    const user = auth.currentUser;
    if (!user) return;

    const streakRef = doc(db, 'loginStreaks', user.uid);
    const streakSnap = await getDoc(streakRef);

    const today = new Date();
    const todayStr = today.toDateString(); 

    if (!streakSnap.exists()) {
        await setDoc(streakRef, { lastLogin: todayStr, streak: 1 });
        dateSpan.textContent = 1; 
    } else {
        const data = streakSnap.data();
        if (data.lastLogin !== todayStr) {
            await setDoc(streakRef, {
                lastLogin: todayStr,
                streak: data.streak + 1
            });
            dateSpan.textContent = data.streak + 1;
        } else {
            dateSpan.textContent = data.streak;
        }
    }
}

auth.onAuthStateChanged(user => {
    if (user) {
        updateLoginStreak();
    }
});

//planning input pop-up --> binned every server-time refresh

const planInput = document.getElementById('planInputLine');
const saveBtn = document.getElementById('savePlan');

function isToday(date) {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
}

async function loadPlan() {
    const user = auth.currentUser;
    if(!user) return;

    const planRef = doc(db, 'plans', user.uid);
    const planSnap = await getDoc(planRef);

    if(planSnap.exists()) {
        const data = planSnap.data();
        const planDate = data.createdAt.toDate ? data.createdAt.toDate() : data.createdAt;

        if(isToday(planDate)) {

            planInput.value = data.plan;
        } else {
            planInput.value = '';
        }
    }
}

saveBtn.addEventListener('click', async () => {
    const user = auth.currentUser;
    if(!user) return;

    const plan = planInput.value.trim();
    if(!plan) return;

    const planRef = doc(db, 'plans', user.uid);
    await setDoc(planRef, { plan, createdAt: new Date() });
    alert("Plan saved! ✅");
});

auth.onAuthStateChanged((user) => {
    if(user) loadPlan();
});

//diary input pop-up --> collection by day 

const dayInput = document.getElementById('daytoday');
const feelInput = document.getElementById('todayfeel');
const smileInput = document.getElementById('smiletoday');
const tomorrowPlanInput = document.getElementById('tommorowplan');
const saveDiaryBtn = document.getElementById('saveDiary');

const diaryDate = new Date();
const ddDiary = String(diaryDate.getDate()).padStart(2, '0');
const mmDiary = String(diaryDate.getMonth() + 1).padStart(2, '0');
const yyDiary = diaryDate.getFullYear();
const formattedDiaryDate = `${ddDiary}/${mmDiary}/${yyDiary}`; 

function getTodayKey() {
    return diaryDate.toISOString().split('T')[0]; 
}

async function loadDiary() {
    const user = auth.currentUser;
    if (!user) return;

    const diaryRef = doc(db, 'diaries', user.uid + "_" + getTodayKey());
    const diarySnap = await getDoc(diaryRef);

    if (diarySnap.exists()) {
        const data = diarySnap.data();
        dayInput.value = data.day || '';
        feelInput.value = data.feel || '';
        smileInput.value = data.smile || '';
        tomorrowPlanInput.value = data.tomorrow || '';
    }
}

saveDiaryBtn.addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) return;

    const diaryRef = doc(db, 'diaries', user.uid + "_" + getTodayKey());

    await setDoc(diaryRef, {
        day: dayInput.value.trim(),
        feel: feelInput.value.trim(),
        smile: smileInput.value.trim(),
        tomorrow: tomorrowPlanInput.value.trim(),
        date: formattedDiaryDate 
    });

    alert("Diary saved for today! 🐾");
});


auth.onAuthStateChanged(user => {
    if (user) loadDiary();
});


//archived diary load --> user can view their entries

import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


const diaryList = document.getElementById('diaryList');
const diaryDetails = document.getElementById('diaryDetails');
const menu4 = document.getElementById('menu-4');
const popup4 = document.getElementById('popup-4');
const closeBtn4 = document.getElementById('button-close4'); 

menu4.addEventListener('click', () => {
    popup4.style.display = 'flex';
    overlay.style.display = 'flex';
    loadDiaries();
});

closeBtn4.addEventListener('click', () => {
    popup4.style.display = 'none';
    overlay.style.display = 'none';
    diaryDetails.innerHTML = ''; 
});

async function loadDiaries() {
    const user = auth.currentUser;
    if(!user) return;

    diaryList.innerHTML = ''; 
    const diariesCol = collection(db, 'diaries');
    const diarySnapshot = await getDocs(diariesCol);
    let count = 1;

    diarySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    if(docSnap.id.startsWith(user.uid + "_")) {
        const li = document.createElement('li');
        li.textContent = `Diary ${count} - ${data.date || docSnap.id.split('_')[1]}`;
        
        li.addEventListener('click', () => {
            if (diaryDetails.getAttribute('data-current') === docSnap.id) {
                diaryDetails.innerHTML = '';
                diaryDetails.removeAttribute('data-current');
            } else {
                diaryDetails.innerHTML = `
                  <p><strong>How was your day?</strong><br>${data.day || ''}</p>
                  <p><strong>How did you feel?</strong><br>${data.feel || ''}</p>
                  <p><strong>What made you smile?</strong><br>${data.smile || ''}</p>
                  <p><strong>Looking forward to tomorrow:</strong><br>${data.tomorrow || ''}</p>
                  <p><strong>Date:</strong><br>${data.date || ''}</p>
                `;

                diaryDetails.setAttribute('data-current', docSnap.id);
            }
        });

        diaryList.appendChild(li);
        count++;
    }
});


    if(count === 1) diaryList.innerHTML = '<li>No diary entries yet.</li>';
}