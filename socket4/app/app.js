const socket = io('http://localhost:3500')

const btn = document.querySelector('#btn')
const input = document.querySelector('#messageInput')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    sendMessage()


})

const sendMessage = () => {
    socket.emit('msg', input.value) // nag sesend sa backend ng value
}

socket.on('msg', (message) => {

    const messages = document.querySelector('#messages')

    let div = document.createElement('div')

    div.innerHTML = message

    messages.appendChild(div)


})

