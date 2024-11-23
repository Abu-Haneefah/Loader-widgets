// Elements
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const loading = document.querySelector(".loading");
const circle = document.querySelector(".progress-circle");
const svgProgress = document.querySelector(".svg-progress");
const loaderSvg = document.querySelector(".loading-svg");
const linear = document.querySelector(".linear");
const circular = document.querySelector(".circular");
const dark = document.querySelector(".dark");
const night = document.querySelector(".night");
const light = document.querySelector(".light");
const sidebar = document.querySelector(".sidebar");
const intro = document.querySelector(".intro");

// Circumference for circular progress
const circumference = circle.getTotalLength();
circle.style.strokeDasharray = circumference;

// Fake upload percentages
const fakeUploadPerc = [0, 10, 25, 40, 60, 75, 90, 100];


// Function to get user name and store it if not already present
function askUserName() {
    const userName = localStorage.getItem('userName');
    
    if (!userName) {
        // Prompt the user for their name
        const name = prompt("What is your name?");
        if (name) {
            localStorage.setItem('userName', name);
            alert("Hello, " + name + "! Welcome to this awesome project! To begin, kindly choose a widget.");
        } else {
            alert("Name not entered. Please reload the page to try again.");
        }
    } else {
        // Greet the user if name is already saved
        intro.innerHTML= ("Welcome back, " + userName + "! do remember to give us a thumbs up on our socials");
    }
}

// Run the function on page load
window.onload = askUserName();


// Toggle Linear Loader
linear.addEventListener("click", () => {
    // Hide circular loader if visible
    svgProgress.style.display = "none";
    loaderSvg.innerHTML = "";

    // Toggle linear loader
    progressBar.style.display = progressBar.style.display === "block" ? "none" : "block";

    // Start linear loading
    if (progressBar.style.display === "block") {
        let i = 0;
        const interval = setInterval(() => {
            if (i < fakeUploadPerc.length) {
                progress.style.width = fakeUploadPerc[i] + "%";
                loading.innerHTML = fakeUploadPerc[i] + "%";
                i++;
            } else {
                clearInterval(interval);
                loading.innerHTML = "Completed";
            }
        }, 1000);
    }
});

// Toggle Circular Loader
circular.addEventListener("click", () => {
    // Hide linear loader if visible
    progressBar.style.display = "none";
    progress.style.width = "0%";
    loading.innerHTML = "";

    // Toggle circular loader
    svgProgress.style.display = svgProgress.style.display === "block" ? "none" : "block";

    // Start circular loading
    if (svgProgress.style.display === "block") {
        let i = 0;
        const interval = setInterval(() => {
            if (i < fakeUploadPerc.length) {
                circle.style.strokeDashoffset = circumference - (fakeUploadPerc[i] / 100) * circumference;
                loaderSvg.innerHTML = fakeUploadPerc[i] + "%";
                i++;
            } else {
                clearInterval(interval);
                loaderSvg.innerHTML = "Ok";
            }
        }, 1000);
    }
});

// Theme Change Events
dark.addEventListener("click", () => {
    document.body.style.backgroundColor = "#111827";
    intro.style.color = "#d3dceb";
    loading.style.color = "#d3dceb";
    sidebar.classList.remove("light", "night");
    sidebar.classList.add("dark");
});

night.addEventListener("click", () => {
    document.body.style.backgroundColor = "#312e81";
    sidebar.classList.remove("light", "dark");
    sidebar.classList.add("night");
});

light.addEventListener("click", () => {
    document.body.style.backgroundColor = "#f3f4f6";
    intro.style.color = "#111827";
    loading.style.color = "#111827";
    sidebar.classList.remove("dark", "night");
    sidebar.classList.add("light");
});