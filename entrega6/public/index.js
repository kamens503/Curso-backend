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
    socket.emit('add_product', {price,title,thumbnail})
});

socket.on('product_added', data => {
    const status = data.success || data.error || '';
    document.querySelector('#status').innerHTML = status;
    
    if (!data.error) return;
    let html = '';
    Object.values(data.products).forEach(product => {
        html += `<tr class="border-2 border-b-slate-500" >
            <td class="text-center w-24 h-24">
                <img src="${product.thumbnail}" alt="" class="h-full w-full object-cover inline-block">
            </td>
            <td>
                <p>${product.title}</p>
            </td>
            <td class="text-center w-24">
                <p class="text-bold">${product.price}</p>
            </td>
        </tr>`
    })
    document.querySelector('#content-table').innerHTML = html;
})