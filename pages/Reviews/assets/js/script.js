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
  
window.onload = () => {
    fetch('https://demo-api-skills.vercel.app/api/FoodieTraveler/foods')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                document.getElementById('grid').innerHTML = '<p>No food items available.</p>';
            } else {
                const output = data.map(food => `
                    <div class="food">
                        <h3>${food.name || 'Food Item'}</h3>
                        <p><strong>Description:</strong> ${food.description || 'No description available.'}</p>
                    </div>
                `).join('');
                document.getElementById('grid').innerHTML = output;
            }
        })
        .catch(error => {
            document.getElementById('grid').innerHTML = 'Error fetching food data';
            console.error('Error:', error);
        });
};