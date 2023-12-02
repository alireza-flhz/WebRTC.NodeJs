import * as store from "./store.js";
import * as ui from "./ui.js";
import * as webRTC from "./webRTCHandler.js";
import * as constans from './constans.js'

// baray kar ba Server ma hast --app.js--
let SocketIO = null;

export const registerSocketEvents = (socket) => {
  socket.on("connect", () => {
    SocketIO = socket;
    console.log("success connected main js...");
    store.setSocketId(socket.id);
    ui.updatePersonalCode(socket.id);
  });

  socket.on("pre-offer", (data) => {
    webRTC.handlePreOffer(data);
  });

  socket.on('pre-offer-answer', (data) => {
    webRTC.handlePreOfferAnswer(data);
  });

  socket.on('webRTC-signaling', (data) => {
    switch (data.type) {
      case constans.webRTCSignaling.OFFER:
        webRTC.handleWebRTCOffer(data);
        break;
      case constans.webRTCSignaling.ANSWER:
        webRTC.handleWebRTCAnswer(data);
        break;
      case constans.webRTCSignaling.ICE_CANDIDATE:
        webRTC.handleWebRTCCandidate(data);
        break;
      default:
        break;
    }
  })
};

export const sendPreOffer = (data) => {
  SocketIO.emit("pre-offer", data);
};


export const sendPreOfferAnswer = (data) => {
  SocketIO.emit('pre-offer-answer', data);
}

export const sendDataUsingWebRTCSignaling = (data) => {
  SocketIO.emit('webRTC-signaling', data);
}