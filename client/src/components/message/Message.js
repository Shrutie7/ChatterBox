import React from 'react'
import ms from "./Message.module.css"

const Message = ({own}) => {
  return (
    <div className={own ? `${ms.own} ${ms.message}`: `${ms.message}`}>

        <div className={ms.messageTop}>
            <img className={ms.messageImg} src="https://img.freepik.com/free-photo/beautiful-girl-stands-park_8353-5084.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703203200&semt=ais"
            alt="img"/>
            <p className={ms.messageText}>Lorem ipsum dolor sit amet. In vitae</p>
        </div>
        <div className={ms.messageBottom}> 1 hour ago</div>
    </div>
  )
}

export default Message