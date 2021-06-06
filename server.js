const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;
const server = require('http').Server(app); // server to use with socket.io
const io = require('socket.io')(server);
const { v4:uuidV4 } = require('uuid');


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.redirect(`/${uuidV4()}`)
});

app.get('/:room', (req, res)=>{
    res.render('room', {roomId:req.params.room});
});



io.on('connection', (socket)=> {
    socket.on('join-room', (roomId, userId)=>{
        console.log(roomId, userId);
        socket.join(roomId)
        const brd = socket.to(roomId).emit('user-connected', userId);
        // console.log("Broadcast: ", brd)
    })
})

server.listen(PORT, ()=>{
    console.log(`Listening to http://localhost:${PORT}`);
})