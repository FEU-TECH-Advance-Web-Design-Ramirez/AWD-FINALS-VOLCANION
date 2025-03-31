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

// Initialize the map
var map = L.map('map').setView([12, 122], 3.5); // Centered around the Philippines

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Hidden Gems Data (Coordinates, Names, Descriptions, Images)
var hiddenGems = [
    { 
        name: "Vietnam", 
        lat: 14.0583, 
        lng: 108.2772, 
        description: "A Vibrant Tapestry of Culture, History, and Natural Beauty",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Jiufen%2C_Taiwan.jpg",
        link: "https://en.wikipedia.org/wiki/Vietnam"
    },
    { 
        name: "Thailand", 
        lat: 15.8700, 
        lng: 100.9925, 
        description: "A Tropical Paradise of Rich Culture and Breathtaking Beaches",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chefchaouen_morocco.jpg",
        link: "https://en.wikipedia.org/wiki/Thailand"
    },
    { 
        name: "Italy", 
        lat: 41.8719, 
        lng: 12.5674, 
        description: "A Timeless Journey Through Art, History, and Culinary Excellence",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chefchaouen_morocco.jpg",
        link: "https://en.wikipedia.org/wiki/Italy"
    },
    { 
        name: "Monaco", 
        lat: 43.7384, 
        lng: 7.4246, 
        description: "A Glamorous Haven of Luxury and Mediterranean Charm",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chefchaouen_morocco.jpg",
        link: "https://en.wikipedia.org/wiki/Monaco"
    },
    { 
        name: "Spain", 
        lat: 40.4637, 
        lng: 3.7492, 
        description: "A Colorful Fusion of Passion, Tradition, and Diverse Landscapes",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chefchaouen_morocco.jpg",
        link: "https://en.wikipedia.org/wiki/Spain"
    },
    { 
        name: "Japan", 
        lat: 36.2048, 
        lng: 138.2529, 
        description: "A Harmonious Blend of Tradition, Innovation, and Stunning Landscapes",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Hallstatt_Austria.jpg",
        link: "https://en.wikipedia.org/wiki/Japan"
    },
    { 
        name: "Philippines", 
        lat: 12.8797, 
        lng: 121.7740, 
        description: "An Archipelago of Stunning Islands and Warm Hospitality",
        image: "../../../../assets/img/bora.avif",
        link: "https://en.wikipedia.org/wiki/Philippines"
    }
];

// Add markers to the map
hiddenGems.forEach(function(gem) {
    var marker = L.marker([gem.lat, gem.lng]).addTo(map);
    marker.bindPopup(`
        <b>${gem.name}</b><br>
        ${gem.description}<br>
        <img src="${gem.image}" width="200"><br>
        <a href="${gem.link}" target="_blank">Learn more</a>
    `);
});