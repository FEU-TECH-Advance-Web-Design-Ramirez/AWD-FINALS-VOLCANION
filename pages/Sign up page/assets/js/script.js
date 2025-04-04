







document.getElementById("sign-up-form").addEventListener("submit", function (event) {
    const API_URL = "https://demo-api-skills.vercel.app/api/FoodieTraveler/users";
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(name);
    console.log(email);
    console.log(password);

    axios.post(API_URL, { email, name, password })
        .then(res => {
            alert("User added successfully!");
            document.getElementById("sign-up-form").reset();
        })
        .catch(error => {
            alert(error.message);
            console.error("Error:", error);
        });
});
