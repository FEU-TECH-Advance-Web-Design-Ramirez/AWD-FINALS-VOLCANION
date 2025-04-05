// Toggle Menu Function
function toggleMenu(event) {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
    
    event.stopPropagation(); // Prevents click event from propagating to the document
}

// Close Menu when clicking outside
document.addEventListener("click", function(event) {
    const menu = document.getElementById("menu");
    const hamburger = document.querySelector(".hamburger");

    if (menu && hamburger && !menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove("show");
    }
});

// Initialize Leaflet Map
var map = L.map('map').setView([12, 122], 3.5); // Centered around the Philippines

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Famous Landmarks in the 7 Countries
var landmarks = [
    { 
        country: "Vietnam",
        name: "Ha Long Bay", 
        lat: 20.9101, 
        lng: 107.1839, 
        description: "A UNESCO World Heritage Site known for emerald waters and limestone islands."
    },
    { 
        country: "Thailand",
        name: "Grand Palace", 
        lat: 13.7500, 
        lng: 100.4913, 
        description: "A stunning royal palace and the heart of Thailand's history."
    },
    { 
        country: "Italy",
        name: "Colosseum", 
        lat: 41.8902, 
        lng: 12.4922, 
        description: "An iconic Roman amphitheater known for gladiator battles."
    },
    { 
        country: "Monaco",
        name: "Monte Carlo Casino", 
        lat: 43.7394, 
        lng: 7.4274, 
        description: "A world-famous casino known for luxury and James Bond films."
    },
    { 
        country: "Spain",
        name: "Sagrada Familia", 
        lat: 41.4036, 
        lng: 2.1744, 
        description: "A breathtaking basilica designed by Antoni Gaudí."
    },
    { 
        country: "Japan",
        name: "Mount Fuji", 
        lat: 35.3606, 
        lng: 138.7274, 
        description: "Japan's highest and most iconic mountain."
    },
    { 
        country: "Philippines",
        name: "Chocolate Hills", 
        lat: 9.8232, 
        lng: 124.1435, 
        description: "A natural wonder of cone-shaped hills in Bohol."
    }
];

landmarks.forEach(function(landmark) {
    var marker = L.marker([landmark.lat, landmark.lng]).addTo(map);
    marker.bindPopup(`
        <b>${landmark.name} (${landmark.country})</b><br>
        ${landmark.description}
    `);
});
