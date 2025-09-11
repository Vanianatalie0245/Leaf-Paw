const bubble = document.getElementById("bubble");
const container = document.querySelector(".story-container");

const story = [
  { text: "School ends early today, it's time for the cherry blossom already?", bg: "assets/story 1.png"},
  { text: "It rains arbitrarily, huh...", bg: "assets/story 2.png"},
  { text: "Wait, what is that? Huh?", bg: "assets/story 2.png"},
  { text: "A cat?", bg: "assets/story 3.png"},
  { text: "Are you alone as well?", bg: "assets/story 3.png"}, 
  { text: "There is a note left nearby", bg: "assets/story 3.png"},
  { text: "Hello, my name is KIKO i am a calico cat, 6 months old", bg: "assets/story 4.png"},
  { text: "I am easy to take care of, doesn't need a lot of attention", bg: "assets/story 4.png"},
  { text: "Will you please take me in?", bg: "assets/story 4.png"},
  { text: "(Should I take her with me?)", bg: "assets/story 3.png"},
  { text: "(But I don't think I am capable of-)", bg: "assets/story 3.png"}, 
  { text: "Meow~?", bg: "assets/story 3.png"},
  { text: "Do you want to come home with me?", bg: "assets/story 3.png"}, 
  { text: "Meow~", bg: "assets/story 3.png"},
  { text: "Alright, lets get you home...", bg: "assets/story 3.png"},
  { text: "Starting from now on, this will be your home.", bg: "assets/story 5.png"}, 
  { text: "I hope you have good days here...", bg: "assets/story 5.png"}


];

let index = 0;

function nextSentence() {
  if(index < story.length) {
    bubble.textContent = story[index].text;
    container.style.backgroundImage = `url('${story[index].bg}')`;

    if (index === 2) { 
      container.style.transform = 'scale(1.2)';
    } else {
      container.style.transform = 'scale(1)';
    }

    index++;
  }
   else {
    window.location.href = './main_home.html'; 
  }
}


setInterval(nextSentence, 2000);
