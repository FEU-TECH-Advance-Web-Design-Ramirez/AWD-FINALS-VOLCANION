function toggleMenu(event) {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
    event.stopPropagation();
}

document.addEventListener("click", function(event) {
    const menu = document.getElementById("menu");
    const hamburger = document.querySelector(".hamburger");

    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove("show");
    }
});

let currentIndex = 0;
const destinations = document.querySelectorAll(".destination");

function showDestination(index) {
    destinations.forEach(destination => destination.classList.remove("active"));
    destinations[index].classList.add("active");
}

function nextDestination() {
    currentIndex = (currentIndex + 1) % destinations.length;
    showDestination(currentIndex);
}

function prevDestination() {
    currentIndex = (currentIndex - 1 + destinations.length) % destinations.length;
    showDestination(currentIndex);
}

setInterval(nextDestination, 2500);
