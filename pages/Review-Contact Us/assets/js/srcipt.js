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


function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

document.querySelector('.review-section form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!isLoggedIn()) {
        window.location.href = '../../../../pages/Sign in page/index.html';
    } else {
        const reviewData = {
            food: document.querySelector('input[placeholder="Food, Destination, Culture"]').value,
            location: document.querySelector('input[placeholder="Where to Find"]').value,
            review: document.querySelector('input[placeholder="Your Review"]').value,
            stars: document.querySelector('input[placeholder="Stars (1-5)"]').value
        };

        submitReviewToAPI(reviewData);
    }
});

function submitReviewToAPI(reviewData) {
    fetch('https://demo-api-skills.vercel.app/api/FoodieTraveler/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Review submitted successfully!');
        // Optionally, reset the form here
    })
    .catch(error => {
        console.error('Error submitting review:', error);
    });
}