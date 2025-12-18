let changeTheme = document.querySelector(".theme button");
let body = document.body;

changeTheme.addEventListener("click", () => {
  if (changeTheme.innerHTML === "Dark Mode") {
    body.style.backgroundColor = "black";
    body.style.color = "white";
    changeTheme.innerHTML = "Light Mode";
  } else {
    body.style.backgroundColor = "#4E56C0";
    body.style.color = "black";
    changeTheme.innerHTML = "Dark Mode";
  }
});

function openFeaturs() {
  let allElms = document.querySelectorAll(".card1");
  let allFullElms = document.querySelectorAll(".fullElm");
  let backBtn = document.querySelectorAll(".back");

  allElms.forEach((elm) => {
    elm.addEventListener("click", () => {
      allFullElms[elm.id].style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  backBtn.forEach((back) => {
    back.addEventListener("click", () => {
      back.parentElement.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });
}

openFeaturs();

let dateElm = document.querySelector(".date");
let timeElm = document.querySelector(".time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function updateDateTime() {
  let now = new Date();

  let day = now.getDay();
  let month = now.getMonth();
  let hour = now.getHours();
  let ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  dateElm.innerHTML = `${days[day]}, ${now.getDate()} / ${
    months[month]
  } / ${now.getFullYear()}`;

  let m = now.getMinutes().toString().padStart(2, "0");
  let s = now.getSeconds().toString().padStart(2, "0");

  timeElm.innerHTML = `${hour}:${m}:${s} ${ampm}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);

async function weather(city) {
  try {
    let apikey = "a591c9036328fdf2bb24d9c1fa832241";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    let res = await fetch(url);
    let data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "City not found");
    }

    let place = document.querySelector("header .left .city");
    let temp = document.querySelector("header .right .temperature");
    let humidity = document.querySelector("header .right .humidity");

    temp.innerHTML = `${Math.floor(data.main.temp)}°C`;
    place.innerHTML = `${data.name} (${data.sys.country})`;
    humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
  } catch (err) {
    console.log(err);
  }
}

weather("london");

// To-do JavaScript

let form = document.querySelector("form");
let taskInput = document.querySelector("form input");
let taskDetailInput = document.querySelector("form textarea");

let showTaks = document.querySelector(".showTaks");

let allTask = JSON.parse(localStorage.getItem("tasks")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  allTask.push({
    task: taskInput.value,
    details: taskDetailInput.value,
  });

  localStorage.setItem("tasks", JSON.stringify(allTask));

  renderTaks();
});

function renderTaks() {
  showTaks.innerHTML = "";

  allTask.forEach((elm, idx) => {
    let div = document.createElement("div");

    div.innerHTML = `
            <div class="task">
                <h4>${elm.task}</h4>
                <button id="${idx}">Mark as complete</button>
            </div>
  `;
    showTaks.appendChild(div);
  });
  let taskDeleteBtn = document.querySelectorAll(".task button");
  taskDeleteBtn.forEach((taskBtn) => {
    taskBtn.addEventListener("click", () => {
      allTask.splice(taskBtn.id, 1);

      localStorage.setItem("tasks", JSON.stringify(allTask));

      renderTaks();
    });
  });
}
renderTaks();

