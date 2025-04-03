// Toggle the mobile menu visibility
function toggleMenu(event) {
    const menu = document.getElementById("menu");
    menu.classList.toggle("d-none");
    event.stopPropagation(); // Prevents event from bubbling up
}

// Close the menu if clicked outside
document.addEventListener("click", function(event) {
    const menu = document.getElementById("menu");
    if (!menu.contains(event.target) && event.target.tagName !== "BUTTON") {
        menu.classList.add("d-none");
    }
});

// Carousel for Destination Sections
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
