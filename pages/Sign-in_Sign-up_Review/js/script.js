const API_URL_USERS = "https://demo-api-skills.vercel.app/api/FoodieTraveler/users";
const API_URL_REVIEWS = "https://demo-api-skills.vercel.app/api/FoodieTraveler/reviews";
let currentUser = null;

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

function toggleAuth(mode) {
    document.getElementById("auth").style.display = mode === "login" ? "block" : "none";
    document.getElementById("signup").style.display = mode === "signup" ? "block" : "none";
}

function showDashboard() {
    document.getElementById("auth").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("username").innerText = currentUser.name;
    fetchReviews();
}

async function fetchReviews() {
    try {
        const res = await axios.get(API_URL_REVIEWS);
        const reviews = res.data;
        const container = document.getElementById("reviews");
        container.innerHTML = "";
        reviews.forEach(review => {
            const div = document.createElement("div");
            div.innerHTML = `<strong>Food ID: ${review.foodId}</strong><br />
                            User: ${review.userId}<br />
                            Rating: ${review.rating}<br />
                            Comment: ${review.comment}<hr />`;
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Failed to load reviews:", err);
    }
}

document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;

    if (!email) {
        alert("Please enter your email.");
        return;
    }

    try {
        const res = await axios.get(API_URL_USERS);
        const user = res.data.find(u => u.email === email);

        if (user) {
            currentUser = user;
            showDashboard();
        } else {
            alert("User not found. Please sign up first.");
        }
    } catch (err) {
        console.error("Login error:", err);
        alert(`Login failed: ${err.response ? err.response.data.message : err.message}`);
    }
});

document.getElementById("sign-up-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("Please fill out all fields.");
        return;
    }

    try {
        const res = await axios.post(API_URL_USERS, { name, email, password });
        currentUser = res.data;
        showDashboard();
    } catch (err) {
        console.error("Sign-up error:", err);
        alert(`Sign-up failed: ${err.response ? err.response.data.message : err.message}`);
    }
});

document.getElementById("review-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const foodId = document.getElementById("foodId").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    if (!foodId || !rating || !comment) {
        alert("Please fill out all fields.");
        return;
    }

    try {
        await axios.post(API_URL_REVIEWS, {
            foodId,
            userId: currentUser.id,
            rating,
            comment
        });
        alert("Review submitted successfully!");
        fetchReviews();
    } catch (err) {
        console.error("Review submission error:", err);
        alert(`Failed to submit review: ${err.response ? err.response.data.message : err.message}`);
    }
});

document.getElementById("logout").addEventListener("click", () => {
    currentUser = null;
    document.getElementById("dashboard").style.display = "none";
    toggleAuth("login");
});

document.getElementById("show-login").addEventListener("click", () => toggleAuth("login"));
document.getElementById("show-signup").addEventListener("click", () => toggleAuth("signup"));