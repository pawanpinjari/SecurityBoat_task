document.getElementById("task").addEventListener("submit",async function (e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
     const user = JSON.parse(localStorage.getItem('user'));
    const description = document.getElementById("description").value;
    console.log(description)
    fetch("http://localhost:8000/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({  description }),
    })
    .then((response) => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        // Handle a successful response here
        document.getElementById("message").innerText = data.message;
    })
    .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
    });
})