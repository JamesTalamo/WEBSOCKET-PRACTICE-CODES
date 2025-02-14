const socket = new WebSocket('ws://localhost:3000')

socket.addEventListener('open', () => {
    console.log(`Connected to websocket ${socket.url}`)
})

const btn = document.querySelector('#btn')
const input = document.querySelector('#messageInput')


btn.addEventListener('click', (e) => {
    e.preventDefault()

    sendMessage()
    input.value = ''
})

const sendMessage = () => {
    socket.send(input.value)
}


socket.addEventListener('message', (message) => {
    const messages = document.querySelector('#messages')

    let text = document.createElement('div')
    text.innerHTML = message.data


    messages.appendChild(text)


})
