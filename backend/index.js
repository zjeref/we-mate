require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user-routes');
const preferenceRoutes = require('./routes/preference-routes');
const chatRoutes = require('./routes/chat-routes');
const Message = require('./model/Message');

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  },
  autoConnect: false
});

mongoose.connect('mongodb://127.0.0.1:27017/wemate')
  .then(() => { console.log("DB CONNECTED") })
  .catch(err => { console.log(err) });

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/prefer', preferenceRoutes);
app.use('/api/chat', chatRoutes);

// Socket event listeners and handlers
// io.on('connection', (socket) => {
//   console.log('Connection Done');

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('directMessage', async (messageObj) => {
//     const message = new Message(messageObj);
//     await message.save();
//     io.to(messageObj.receiver).emit('directMessage', messageObj); // Emit to receiver
//     io.to(messageObj.sender).emit('directMessage', messageObj); // Emit to sender
//   });
// });


const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
