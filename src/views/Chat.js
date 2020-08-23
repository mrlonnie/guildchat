import React, { useState, useEffect, } from "react";
import moment from "moment";
import {
  firebaseAuth,
  firebaseDb
} from "../services/firebase";


const Chat = () => {
  const [user] = useState(firebaseAuth().currentUser);
  const [chats, updateChats] = useState([]);
  const [message, updateMessage] = useState();
  const [errorMessage, updateErrorMessage] = useState();
  const [isLoading, updateLoader] = useState(false);
 
  useEffect(() => {
    updateLoader(true);
    updateErrorMessage(null);
    try {
      firebaseDb.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        // Chats do not come down in any particular order(?)
        chats.sort(function (a, b) {
          return a.timestamp - b.timestamp
        });
        updateChats(chats);
        updateLoader(false);
        markMessagesRead(snapshot)
      });

      const markMessagesRead = (snapshot) => {
        snapshot.forEach((child) => {
          let item = child.val();
          if(item.uid !== user.uid && !item.isRead) {
            console.log('Updating is read')
            child.ref.update({
              isRead: true
            });
          }
        })
      }
    } catch (error) {
      updateLoader(true);
      updateErrorMessage(error.message);
    }
  }, [user.uid]);

  const handleChange = (e) => {
    updateMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateErrorMessage(null);
    try {
      await firebaseDb.ref("chats").push({
        message: message,
        timestamp: moment().unix(),
        uid: user.uid,
        isRead: false
      });
      updateMessage('');
    } catch (error) {
      updateErrorMessage(error.message)
    }
  };

  const renderChats = () => {
    return chats.map(chat => {
      return (
        <div 
          key={chat.timestamp}>
          <p
            className={(user.uid === chat.uid ? "current-user" : "")}
          >
          {
            user.uid !== chat.uid &&
              <span>{user.email}<br/></span>
          }
          {chat.message}<br/>
          Sent:{moment(chat.timestamp).format('MM-DD-YYYY hh:mm')}< br/>
          { 
            user.uid === chat.uid &&
              <span>{chat.isRead ? 'Message Read' : 'Message Unread'}</span>
          }
          </p>
          <hr/>
        </div>
      )
    })
  }

  return (
    <section>
      <div>
        {isLoading &&
          <span>Loading...</span>}
        {renderChats()}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea name="messages" onChange={handleChange} value={message}></textarea>
        {
          errorMessage &&
            <p>{this.state.error}</p>
        }
        <button type="submit">Send</button>
      </form>
      <p>
        Current User: <strong>{user.email}</strong>
      </p>
    </section>
  );
}

export default Chat;