import { useEffect, useState, useRef } from "react";
import socket from "./socket";

function App() {
  let [name, setName] = useState("");
  let [room, setRoom] = useState("");
  let [messages, setMessages] = useState("");
  let [msg, setMsg] = useState([]);

  let [rooms, setRooms] = useState([])

  useEffect(() => {
    socket.on('message', (message) => {
      console.log('New Message:', message); // Debugging log
      setMsg((prevMsgs) => [...prevMsgs, message]); // Append new message to state
    });

    return () => {
      socket.off('message'); // Cleanup listener
    };
  }, []);


  useEffect(() => {
    socket.on('rooms', (roomList) => {
      console.log('Rooms:', roomList);
      setRooms(roomList); // Assuming you have `const [rooms, setRooms] = useState([])`
    });

    return () => {
      socket.off('rooms');
    };
  }, []);

  let handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("joinRoom", { room, name });
  };

  let handleMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", { room, name, messages });
    setMessages("");
  };

  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msg]); // Scrolls to the latest message when msg updates

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-900 flex items-center justify-center">
      <div className="w-[80%] h-[80%] bg-gray-700 rounded-3xl flex flex-col lg:flex-row items-center justify-around">
        {/* Sidebar */}
        <div className="w-[100%] lg:w-[30%] h-[80%] flex rounded-3xl flex items-center justify-start flex-col">
          <text className="p-3 font-bold text-white text-3xl">CHATROOMS</text>
          <form
            onSubmit={handleSubmit}
            className="w-[100%] h-[80%] flex rounded-3xl flex items-center justify-start flex-col"
          >
            <input
              value={name}
              type="text"
              placeholder="NAME"
              className="input input-bordered w-full max-w-xs m-3"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              value={room}
              type="text"
              placeholder="ROOM ID"
              className="input input-bordered w-full max-w-xs m-3"
              id="room"
              onChange={(e) => setRoom(e.target.value)}
            />
            <button className="btn btn-neutral w-full max-w-xs" type="submit">
              JOIN ROOM
            </button>
          </form>
          <div className='font-bold text-3xl text-white'>ROOMS</div>
          <div className='bg-gray-900 w-[100%] h-[100%] rounded-3xl flex items-start justify-center flex-wrap p-3 gap-1'>

            <div className='bg-gray-900 w-[100%] h-[100%] rounded-3xl flex items-start justify-center flex-wrap p-3 gap-1'>
              {rooms.map((room, index) => (
                <div key={index} className="badge badge-ghost">{room}</div>
              ))}
            </div>

          </div>
        </div>

        {/* Chat Section */}
        <div className="w-[100%] lg:w-[60%] h-[90%] rounded-3xl relative">
          {/* Chat container */}
          <div className="w-[100%] h-[80%] bg-gray-900 rounded-3xl flex flex-col-reverse items-center justify-start gap-1 overflow-y-scroll">
            {/* Messages */}
            {msg.map((message, index) => (
              <div
                key={index}
                ref={index === msg.length - 1 ? topRef : null} // Attach ref to last message
                className="w-[70%] h-[50px] bg-blue-900 rounded-3xl flex items-center justify-center flex-shrink-0 font-bold text-white"
              >
                {message}
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="w-[100%] h-[100px] bg-gray-900 rounded-3xl bottom-0 absolute flex items-center justify-around">
            <form
              className="flex items-center justify-around w-[100%] h-[100%]"
              onSubmit={handleMessage}
            >
              <input
                value={messages}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-[80%]"
                onChange={(e) => setMessages(e.target.value)}
              />
              <button className="btn btn-neutral" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
