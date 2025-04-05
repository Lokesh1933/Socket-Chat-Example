/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000",{withCredentials: true}),[]);

  const [messages,setMessages] =useState([])
  const [message, setMessage] = useState("");
  const [room,setRoom] =useState("")
  //list of messages handle karne k liye
  //as socket id instance create nhi hota h initially
  const [socketId,setSocketId] =useState("")
  const [roomName,SetRoomName] =useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message",{message,room})
    setMessage("")
  };

  const joinRoomHandler = (e) => {
    e.preventDefault()
    socket.emit("join-room",roomName)
    SetRoomName("")
  }

  useEffect(() => {
    socket.on(
      "connect",
      () => {
        //connect hote hi socket id hame milegi aur ham display kar denge
        setSocketId(socket.id)
        console.log("connected ", socket.id);
      },
      []
    );

    socket.on("receive-message",(data) => {
      console.log(data)
      setMessages((messages) => [...messages,data])
    })

    socket.on("welcome", (s) => {
      console.log(s);
    });

    // useeffect me cleanup function jab unmount hota h tab disconnect trigger hoga
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Container maxWidth="sm">
      <Box sx={{height:50}}/>
      <Typography variant="h2" component="div" gutterBottom>
        Welcome To Server Rooms
      </Typography>
      
      <Typography variant="h6" component="div" gutterBottom>
        {socketId}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          value={roomName}
          onChange={(e) => SetRoomName(e.target.value)}
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      <Stack>
        {messages.map((mess,i) => {
          return(
          <Typography key={i} variant="h6" component="div" gutterBottom>
           {mess}
          </Typography>)
        })}
      </Stack>
    </Container>
  );
};

export default App;
