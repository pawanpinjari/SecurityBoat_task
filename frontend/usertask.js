document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem('token');
    console.log(token)
    fetch("http://localhost:8000/usertask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res) => {
       
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then((data) => {
        const task1=data.tasks;
        console.log("task",task1)
        
        const div = document.getElementById("tasks");
        task1.forEach(function (task, index) {
            const taskList=document.createElement("ul")
            const listItem1 = document.createElement("li")
            listItem1.innerHTML=index+1
            const listItem2 = document.createElement("li")
            listItem2.innerHTML=task.description
            const listItem3 = document.createElement("li")
            listItem3.innerHTML=task.completed
            
            taskList.appendChild(listItem1);
            taskList.appendChild(listItem2);
            taskList.appendChild(listItem3);
            div.appendChild(taskList);
        });

    })
    .catch((error) => {
        console.error("Fetch error:", error);
    });
  });