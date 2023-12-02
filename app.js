// const express = require("express");
// // const https = require("http");

// const https = require(`https`);
// const fs = require(`fs`);

// const PORT = process.env.PORT || 3000;

// const app = express();
// const server = https.createServer(app);
// const io = require("socket.io")(server);

// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/index.html");
// });

// let connectedPeers = [];

// io.on("connection", (socket) => {
//   connectedPeers.push(socket.id);
//   console.log(connectedPeers);
//   socket.on("pre-offer", (data) => {
//     console.log("pre offer Come");
//     const { calleePersonalcode, callType } = data;
//     const connectedPeer = connectedPeers.find((peerSocketId) => peerSocketId === calleePersonalcode);
//     if (connectedPeer) {
//       const data = {
//         callerSocketId: socket.id,
//         callType,
//       };
//       io.to(calleePersonalcode).emit("pre-offer", data);
//     } else {
//       console.log('Not Found');
//       const data = {
//         preOfferAnswer: 'CALLEE_NOT_FOUND'
//       }
//       io.to(socket.id).emit('pre-offer-answer', data);
//     }
//   });

//   socket.on('pre-offer-answer', (data) => {
//     const { callersocketId } = data;
//     const connectedPeer = connectedPeers.find((peerSocketId) => peerSocketId == callersocketId);
//     if (connectedPeer) {
//       console.log("ok data");
//       io.to(callersocketId).emit("pre-offer-answer", data);
//     }

//   })

//   socket.on('webRTC-signaling', (data) => {
//     const { connectedUserSocketId } = data;
//     const connectedPeer = connectedPeers.find((peerSocketId) => peerSocketId == connectedUserSocketId);
//     if (connectedPeer) {
//       console.log("ok data");
//       io.to(connectedUserSocketId).emit("webRTC-signaling", data);
//     }
//   })

//   socket.on("disconnect", () => {
//     const newConnectrdPeers = connectedPeers.filter((socketPeer) => {
//       return socketPeer !== socket.id;
//     });
//     connectedPeers = newConnectrdPeers;
//     console.log(connectedPeers);
//   });
// });

// // server.listen(PORT, '0.0.0.0', () => {
// //   console.log("server is runing...");
// // });


// https.createServer( app).listen(PORT, console.log(`server runs on port ${PORT}`))



const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const mongo = require('mongoose');


const app = express()

// app.use('/', (req, res, next) => {
//   res.send('hello from ssl Server')
// })
app.use(express.static("public"));

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
  },
  app
)
const io = require("socket.io")(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


//#region DataBase

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://alirezaflhz:123@medis@cluster0.7loitev.mongodb.net/";
// var url = "mongodb://localhost:27017/"



// async function connectedDb(){
//   try{
//     await mongo.connect(url);
//     console.log("Connected Database ")
//   }catch(er){
//     console.log(er);
//   }

// }

//#endregion



let connectedPeers = [];

io.on("connection", (socket) => {
  connectedPeers.push(socket.id);
  console.log(connectedPeers);
  socket.on("pre-offer", (data) => {
    console.log("pre offer Come");
    const { calleePersonalcode, callType } = data;
    const connectedPeer = connectedPeers.find((peerSocketId) => peerSocketId === calleePersonalcode);
    if (connectedPeer) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };
      io.to(calleePersonalcode).emit("pre-offer", data);
    } else {
      console.log('Not Found');
      const data = {
        preOfferAnswer: 'CALLEE_NOT_FOUND'
      }
      io.to(socket.id).emit('pre-offer-answer', data);
    }
  });

  socket.on('pre-offer-answer', (data) => {
    const { callersocketId } = data;
    const connectedPeer = connectedPeers.find((peerSocketId) => peerSocketId == callersocketId);
    if (connectedPeer) {
      console.log("ok data");
      io.to(callersocketId).emit("pre-offer-answer", data);
    }

  })

  socket.on('webRTC-signaling', (data) => {
    const { connectedUserSocketId } = data;
    const connectedPeer = connectedPeers.find((peerSocketId) => peerSocketId == connectedUserSocketId);
    if (connectedPeer) {
      console.log("ok data");
      io.to(connectedUserSocketId).emit("webRTC-signaling", data);
    }
  })

  socket.on("disconnect", () => {
    const newConnectrdPeers = connectedPeers.filter((socketPeer) => {
      return socketPeer !== socket.id;
    });
    connectedPeers = newConnectrdPeers;
    console.log(connectedPeers);
  });
});

// connectedDb();

server.listen(8080,'0.0.0.0', () => console.log('secure server on port 3000'))