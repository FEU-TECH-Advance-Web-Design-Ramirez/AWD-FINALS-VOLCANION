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










document.getElementById("sign-in-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const API_URL = "https://demo-api-skills.vercel.app/api/FoodieTraveler/users/login/"

    const email = document.getElementById("email").value;

    axios.get(API_URL+email)
        .then((response) => {
            const user = response.data;
            if (user.email == email) {
                alert("Login Success");
            }
            
            // localStorage.setItem("userId")
        })
        .catch((err) => {
            alert("Failed to login")
        })
})
