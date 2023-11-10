document.addEventListener('DOMContentLoaded', load());

function ask(){
    console.log("clicked button");
    const chat_message = document.getElementById('message').value;
    console.log(chat_message);

    fetch('/ask', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({chat_message: chat_message})
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                console.log("message added on server");
            } else {
                console.log(data);
                alert(data.message);
            }
            load();
        });
};


function load(){
    fetch('/load_messages')
        .then(res => res.json())
        .then(data => {
            var EL_ul = document.getElementById('message_ul');
            console.log(data.liste);
            EL_ul.innerHTML = '';
            data.liste.forEach((chat_messages, index) => {
                var li = document.createElement('li');
                li.textContent = chat_messages;
                console.log(chat_messages);
                EL_ul.appendChild(li);
            });      
        }
    );
};