document.addEventListener("DOMContentLoaded", function() {
    // Toggle menu
    const menu = document.getElementById("menu");
    const hamburger = document.querySelector(".hamburger");

    if (menu && hamburger) {
        hamburger.addEventListener("click", function(event) {
            menu.classList.toggle("show");
            event.stopPropagation();
        });

        document.addEventListener("click", function(event) {
            if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
                menu.classList.remove("show");
            }
        });
    }

    // Destination auto-rotation
    const destinations = document.querySelectorAll(".destination");
    let currentIndex = 0;

    function showDestination(index) {
        destinations.forEach((destination, i) => {
            destination.classList.toggle("active", i === index);
        });
    }

    function nextDestination() {
        if (destinations.length > 0) {
            currentIndex = (currentIndex + 1) % destinations.length;
            showDestination(currentIndex);
        }
    }

    if (destinations.length > 0) {
        setInterval(nextDestination, 2500);
    }
});
