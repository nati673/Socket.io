import React, { useState, useEffect } from "react";
import "./App.css";
// import link from react dom
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const io = require("socket.io-client");

const socket = io.connect("http://localhost:8000");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const joinRoom = () => {
    if (room) {
      setError("");
      socket.emit("joinRoom", room);
      setSuccess(`Joined room ${room}`);
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } else {
      setError("Please enter a room name");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const sendMessage = () => {
    if (!message) {
      setError("Please enter a message to send");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      setError("");
      socket.emit("sendMessage", { message, room });
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setReceivedMessage(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <header className="App-header">
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        {receivedMessage && (
          <div className="received-message">
            <h6>Received message:</h6>
            <p className="messageRecived">{receivedMessage}</p>
          </div>
        )}
        {/* room */}
        <div className="headerTitel">
          <h4>Enter room name</h4>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder={"Join Room.."}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
        {/* message */}
        <div className="headerTitel">
          <h4>Type something and press send</h4>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder={"Message.."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </header>
      <footer className="footer">
        <a href="https://natnaelhailu.com/" target="_blank">
          Natnael Hailu (www.natnaelhailu.com)
        </a>
      </footer>
    </div>
  );
}

export default App;
