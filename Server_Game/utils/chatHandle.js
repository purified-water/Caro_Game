// Worker
let worker;

function startWW() {
    worker = new Worker('/js/worker.js');

    alert('Worker created');
    
    worker.onmessage = function (e) {
        alert('Message received from worker');
        console.log(e.data);
        alert(`${e.data} unread messages`);

        document.getElementById('chat-notification').innerText = `You have ${e.data} unread messages`;
    };
}

function stopWW() {
    alert('Stop WW');
    if (worker) {
        worker.terminate();
        worker = undefined;
        document.getElementById('chat-notification').innerText = '';
    }
}

function handleChat() {
    console.log('DDDMDMMDMD');
    function scrollToBottom() {
        var container = document.getElementById('message-list');
        container.scrollTop = container.scrollHeight;
    }

    const socket = io('http://localhost:3000');

    document.getElementById('commit-chat').addEventListener('submit', function (e) {
        e.preventDefault();
        const message = document.getElementById('message-input').value;
        if (message === '') {
            alert('Please type your message');
            return;
        }
        const userName = document.getElementById('user').value;
        socket.emit('message', message, userName);
        document.getElementById('message-input').value = '';

        startWW();

        return false;
    });

    socket.on('message', function (msg, userName) {
        const messageList = document.getElementById('message-list');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="message-container d-flex align-items-center bg-white p-1 border border-1 mb-1" style="width: fit-content;">
                <p class="fw-bold me-2 mb-0">${userName}: </p>
                <p class="m-0">${msg}</p>
            </div>
        `;
        messageList.appendChild(listItem);

        scrollToBottom();
    });
}

handleChat();

// // Worker
// let worker;
// function startWW() {
//     worker = new Worker('/js/worker.js');

//     alert('worker created');
//     worker.onmessage = function (e) {
//         alert('Message received from worker');
//         console.log(e.data);
//         alert(`${e.data} unread messages`);



//         $('#chat-notification').text(`You have ${e.data} unread messages`);
//     };
// }

// function stopWW() {
//     alert('Stop WW')
//     if (worker) {
//         worker.terminate();
//         worker = undefined;
//         $('#chat-notification').text('');

//     }
// }


// $(document).ready(() => {
//     function scrollToBottom() {
//         var container = $("#message-list");
//         container.scrollTop(container[0].scrollHeight);
//     };

//     const socket = io('http://localhost:3000');

//     $('#commit-chat').submit((e) => {
//         e.preventDefault();
//         const message = $('#message-input').val();
//         if (message === '')
//             return alert('Please type your message');
//         const userName = $('#user').val();
//         socket.emit('message', message, userName);
//         $('#message-input').val('');

//         startWW();

//         return false;
//     });

//     socket.on('message', (msg, userName) => {
//         $('#message-list').append(`
//         <li>
//             <div class="message-container d-flex align-items-center bg-white p-1 border border-1 mb-1" style="width: fit-content;">
//             <p class="fw-bold me-2 mb-0">${userName}: </p>
//             <p class="m-0">${msg}</p>
//             </div>
//         </li>
//         `);
//         scrollToBottom();

//     });
// });