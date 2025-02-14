const socket = io('http://localhost:3500')

const btn = document.querySelector('#btn')
const input = document.querySelector('#messageInput')


btn.addEventListener('click', (e) => {
    e.preventDefault()

    sendMessage()
    input.value = ''
})

const sendMessage = () => {
    let message = input.value.trim()
    socket.emit('message', message)
}


socket.on('message', (message) => {
    const messages = document.querySelector('#messages')

    let text = document.createElement('div')
    text.innerHTML = message


    messages.appendChild(text)


})
