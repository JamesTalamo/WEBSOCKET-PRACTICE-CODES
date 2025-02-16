const socket = io('http://localhost:3500')

const btn = document.querySelector('#btn')
const input = document.querySelector('#messageInput')

const activity = document.querySelector('#activity')

btn.addEventListener('click', (e) => {
    e.preventDefault()
    sendMessage()


})

const sendMessage = () => {
    socket.emit('textMsg', input.value)
}


socket.on('message', (data) => {
    activity.innerHTML = ''
    let messages = document.querySelector('#messages')

    let div = document.createElement('div')
    div.innerHTML = data

    messages.appendChild(div)
})

input.addEventListener('keypress', () => {
    socket.emit('activity', `${socket.id}`)
})

let activityTimer
socket.on('activity', (name) => {


    activity.innerHTML = `${name} is typing`

    clearTimeout(activityTimer)
    activityTimer = setTimeout(() => {
        activity.innerHTML = ''
    }, 3000)
}) 
