import React from 'react'
import conv from "./Conversation.module.css"
const Conversation = () => {
  return (
    <div className={conv.conversation}>

      <img className={conv.conversationImg} src='https://img.freepik.com/free-photo/beautiful-girl-stands-park_8353-5084.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703203200&semt=ais' alt=''/>
      <span className={conv.conversationName}>John Doe</span>
    </div>
  )
}

export default Conversation