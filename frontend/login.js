
document.getElementById("login-form").addEventListener("submit",async function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("Data:",  email, password);
 
    fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({  email, password }),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            document.getElementById("message").innerText = data.message;
            const token=data.token
           const user=data.user
           localStorage.setItem('token', token);
           localStorage.setItem('user', JSON.stringify(user));
            window.location.href="/SecurityBoat/frontend/usertask.html"
            
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
});

