const userInfoForm = document.querySelector(".userInfoForm"),
  inUsername = document.querySelector(".inUsername"),
  inBabyBirth = document.querySelector(".inBabyBirth"),
  showingCN = "showing",
  greeting = document.querySelector(".greeting"),
  babyDue = document.querySelector(".babyDue"),
  anHour = 3600000,
  aDay = 24 * anHour,
  USERNAME_LS = "username";

function paintUserInfo() {
  const username = localStorage.getItem(USERNAME_LS);
  const babyBirth = localStorage.getItem("babyBirth");
  const dueIn = localStorage.getItem("dueIn");
  userInfoForm.classList.remove(showingCN);
  greeting.classList.add(showingCN);
  babyDue.classList.add(showingCN);
  greeting.innerHTML = `Hi ${username}`;
  babyDue.innerHTML = `Congrat! You are gonna be the father on ${babyBirth}👶, only ${dueIn} days left!`;
}
function dueCal(inputDate) {
  const today = new Date();
  const babyBirth = new Date(inputDate);
  const daysWait =
    Math.round((babyBirth.getTime() - today.getTime() + 7 * anHour) / aDay) + 1;

  localStorage.setItem("dueIn", daysWait);
}
function handleuserinfo(event) {
  event.preventDefault();
  const inputName = inUsername.value;
  const inputDate = inBabyBirth.value;
  dueCal(inputDate);
  localStorage.setItem("babyBirth", inputDate);
  localStorage.setItem(USERNAME_LS, inputName);
  paintUserInfo();
}

function askingUserinfo() {
  userInfoForm.classList.add(showingCN);
  userInfoForm.addEventListener("submit", handleuserinfo);
}

function init() {
  const loadedUsername = localStorage.getItem(USERNAME_LS);
  if (loadedUsername !== null) {
    const babyBirth = localStorage.getItem("babyBirth");
    dueCal(babyBirth);
    paintUserInfo();
  } else {
    askingUserinfo();
  }
}
init();
