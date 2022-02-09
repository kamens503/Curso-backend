const socket = io();
socket.on('mi mensaje', data => {
    alert(data)
})
const chat = document.querySelector('#chat')
const form= document.querySelector('#form').addEventListener('submit', event =>{
    event.preventDefault()
    const message = document.querySelector('#msg').value;
    const user = document.querySelector('#user').value;
    socket.emit('message', {message, user})
});

socket.on('messages', messages =>{
    let html;
    Object.values(messages).forEach(message => {
       html += `${message.user} : ${message.data}`;
       html += "<br>"
      });
      chat.innerHTML = html;
})
