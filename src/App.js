import react  , {useState} from "react";
import './App.css';
import io from "socket.io-client";
import Chat from "./Chat";


const socket=io.connect("http://localhost:3001")

function App() {
  const [username,setUsername]=useState("");
  const [room , setRoom]=useState("");
  const [showChats , setShowChats]=useState(false);

  
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChats(true)
    }
  };
  return (
    <div className="App">
      {!showChats ? (
      <div className="joinChatContainer">
        <h3> Join Chat</h3>
        <input type="text" placeholder="name" onChange={(event)=>{setUsername(event.target.value)}}></input>
        <input type="text" placeholder="room" onChange={(event)=>{setRoom(event.target.value)}}></input>
        <button onClick={joinRoom}>Join A Room</button>
      </div>)
      : (
      <Chat socket={socket} username={username} room={room}></Chat>)}
    </div>
  );
}

export default App;
