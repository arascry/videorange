import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import MessageBox from '../MessageBox/MessageBox';
import TextBox from '../TextBox/TextBox';

let socket;

const ChatRoom = (props) => {
    const [msg, setMsg] = useState('');
    const [msgHistory, setHistory] = useState([]);
    const tempData = [props.user, props.roomId];
    console.log(props);
    useEffect(() => {
        const [user, room] = tempData;
        socket = io('localhost:3001');
        socket.emit('join', { user, room }, error => {
            console.log(error);
        });
        socket.on('chat message', msg => {
            setHistory(msgHistory => [...msgHistory, msg]);
        });

    }, [props.roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('chat message', e.target[0].value, () => setMsg(''));
    }

    return (
        <div>
            <MessageBox
                msgHistory={msgHistory}
            />
            <TextBox
                msg={msg}
                setMsg={setMsg}
                sendMessage={sendMessage}
            />
        </div >
    );
};

export default ChatRoom;