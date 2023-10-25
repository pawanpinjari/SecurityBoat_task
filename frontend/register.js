
document.getElementById("registration-form").addEventListener("submit",async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
 
    fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            document.getElementById("message").innerText = data.message;
           
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
});
