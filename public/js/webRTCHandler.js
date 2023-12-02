import * as wss from "./wss.js";
import * as ui from './ui.js';
import * as store from './store.js'
import * as constans from './constans.js'
let connectedUserDetail;
let peerConnection;

const configuration = {
  iceServer: [
    {
      urls: 'stun:stun.l.google.com:13902'
    }
  ]
}


const defaultConstreaints = {
  audio: true,
  video: true
}


export const getLocalPreview = () => {
  navigator.mediaDevices.getUserMedia(defaultConstreaints)
    .then((stream) => {
      ui.updateLocalVideo(stream);
      store.setlocalStream(stream);
    })
}


const createPeerConnection = () => {
  console.log("RTC");
  peerConnection = new RTCPeerConnection(configuration);
  console.log("RTC2");

  peerConnection.onicecandidate = (event) => {
    console.log('getting ice candidate from stun  server');
    if (event.candidate) {
      //send our ice candidate to other peer .... 
      wss.sendDataUsingWebRTCSignaling({
        type: constans.webRTCSignaling.ICE_CANDIDATE,
        candidate: event.candidate,
        connectedUserSocketId: connectedUserDetail.SocketId
      })
    }
  }

  const remoteStream = new MediaStream();
  store.setRemoteStream(remoteStream);
  ui.updateRemoteVideo(remoteStream);

  peerConnection.ontrack = (event) => {
    remoteStream.addTrack(event.track);
  }

  if (connectedUserDetail.callType === constans.callType.VIDEO_PERSONAL_CODE) {
    const localStream = store.getState().localStream;

    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    })
  }
}


export const sendPreOffer = (callType, calleePersonalcode) => {
  const data = {
    callType,
    calleePersonalcode,
  };
  connectedUserDetail = {
    callType,
    SocketId: calleePersonalcode
  }
  ui.ShowCallingDialog(showCallingrejecredDialogHandler)
  wss.sendPreOffer(data);
};


export const handlePreOffer = (data) => {
  const { callType, callerSocketId } = data;
  connectedUserDetail = {
    SocketId: callerSocketId,
    callType,
  };
  ui.showIncomingCAllDialog(callType, acceptCallHandler, rejectCallHandler);
};


const acceptCallHandler = () => {
  console.log('Accept Call Handler...');
  createPeerConnection();
  sendPreOfferAnswer(constans.preeOfferAnswer.CALL_ACCEPTED);
}


const rejectCallHandler = () => {
  console.log('Reject Call Handler...');
  sendPreOfferAnswer(constans.preeOfferAnswer.CALL_REJECTED);
}


const showCallingrejecredDialogHandler = () => {
  console.log('show coming dialog rejected handler');
}


const sendPreOfferAnswer = (preofferAnswer) => {
  const data = {
    callersocketId: connectedUserDetail.SocketId,
    preofferAnswer
  }
  ui.removeAllDialogs();
  wss.sendPreOfferAnswer(data);
}


export const handlePreOfferAnswer = (data) => {
  console.log(" Webrtc dialog OK!!!!");
  console.log(data);
  const { preofferAnswer } = data;
  console.log(preofferAnswer);
  ui.removeAllDialogs();
  switch (preofferAnswer) {
    case constans.preeOfferAnswer.CALLEE_NOT_FOUND:
      console.log("Handle Webrtc dialog OK!!!!");
      ui.showInfodialog(preofferAnswer)
      break;
    case constans.preeOfferAnswer.CALL_ACCEPTED:
      ui.showInfodialog(preofferAnswer)
      createPeerConnection();
      sendWrbRTCOffer();
      break;
    case constans.preeOfferAnswer.CALL_REJECTED:
      ui.showInfodialog(preofferAnswer)
      break;
    case constans.preeOfferAnswer.CALL_UNACAILABLE:

      break;
  }
}


const sendWrbRTCOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  wss.sendDataUsingWebRTCSignaling({
    connectedUserSocketId: connectedUserDetail.SocketId,
    type: constans.webRTCSignaling.OFFER,
    offer: offer
  })
}


export const handleWebRTCOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  wss.sendDataUsingWebRTCSignaling({
    connectedUserSocketId: connectedUserDetail.SocketId,
    type: constans.webRTCSignaling.ANSWER,
    answer: answer
  })
}

export const handleWebRTCAnswer = async (data) => {
  console.log("handeling web !!!!!!!!!!!!!!!!! OK!!!!!!!!!!!!!!!!");
  await peerConnection.setRemoteDescription(data.answer);
}


export const handleWebRTCCandidate = async (data) => {
  try {
    await peerConnection.addIceCandidate(data.candidate);
  } catch (error) {
    console.log('error in handle wheb RTc candidate ');
    console.log(error);
  }
}