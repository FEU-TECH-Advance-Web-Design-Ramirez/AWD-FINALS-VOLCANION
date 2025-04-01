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


function filterSelection(button, category) {
    let cards = document.querySelectorAll('.card');
    let buttons = document.querySelectorAll('.local-spotlights-buttons button');
    
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active'); // Add active class to clicked button
    
    // Show/Hide cards based on category
    if (category === 'all') {
        cards.forEach(card => card.classList.add('show'));
    } else {
        cards.forEach(card => {
            card.classList.remove('show');
            if (card.classList.contains(category)) {
                card.classList.add('show');
            }
        });
    }
}