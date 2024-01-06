import React from 'react'
import NoPage from './components/NoPage'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Edit from './components/Edit';
import MobileChat from './components/MobileChat';
import Proj1 from "./components/Proj1"
import { ChatState } from "./components/ChatProvider";

function App() {
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chats" element={(localStorage.getItem("userinfo") !== null || user) ? < Chat /> : <Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/s_chats" element={<MobileChat />} />
        <Route path="/s_chats" element={<MobileChat />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  )
}

export default App
