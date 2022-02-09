const socket = io();
const date = new Date();


socket.on('mi mensaje', data => {
    alert(data)
});

const chat = document.querySelector('#history')
const form= document.querySelector('#form').addEventListener('submit', event =>{
    event.preventDefault()
    const message = document.querySelector('#msg').value,
          mail = document.querySelector('#mail').value,
            _date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    socket.emit('message_send', {message, mail, date: _date})
});

socket.on('render_history', messages =>{
    let html = '';
    console.log(messages);
    Object.values(messages).forEach(message => {
       html += `<div class=" text-white bubble inline-block ${message.mail == document.querySelector('#mail').value ? 'bg-green-800 mx-5' : 'bg-slate-800'} p-5 rounded-md mx-3 my-2 relative w-80">
                <b class="user text-sm"> ${message.mail}</b>
                <i class="absolute top-2 right-2 opacity-40 text-xs">${message.date}</i :<br> 
                <p>${message.message}</p></div>`;
       html += "<br>"
      });
      chat.innerHTML = html;
})

const product_form= document.querySelector('#product-form').addEventListener('submit', event =>{
    event.preventDefault()
    const price = document.querySelector('#price').value,
          title = document.querySelector('#title').value,
          thumbnail = document.querySelector('#thumbnail').value;
    socket.emit('message_send', {price,title,thumbnail})
});