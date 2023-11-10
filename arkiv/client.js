
document.addEventListener('DOMContentLoaded', load())


function ask(){
    console.log("clicked button")
    const task = document.getElementById('task').value;
    console.log(task)

    fetch('/ask', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({task: task})
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log("task added on server")
            } else {
                console.log(data)
                alert(data.message)
            }
            load()
        });
}

function load(){
    fetch('/load_tasks')
        .then(res => res.json())
        .then(data => {
            var EL_ul = document.getElementById('task_ul')
            console.log(data.liste)
            EL_ul.innerHTML = ''
            data.liste.forEach((task, index) => {
                var li = document.createElement('li')
                li.textContent = task
                console.log(task)

                var btn = document.createElement('button')
                btn.textContent = 'Delete'
                btn.onclick = function() {
                    deleteTask(index)
                }
                li.appendChild(btn)
                EL_ul.appendChild(li)
            });      
        }
    )
}

function deleteTask(index) {
    fetch(`/delete/${index}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            load()
        } else {
            alert("Could not delete")
        }
    })
} 