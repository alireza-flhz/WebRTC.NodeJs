import * as store from "./store.js";
import * as wss from "./wss.js";
import * as constans from "./constans.js";
import * as ui from './ui.js';
import * as webRTC from "./webRTCHandler.js";
import { getIncomingCallDialog } from "./element.js";


const socket = io("/");
wss.registerSocketEvents(socket);

webRTC.getLocalPreview();


const personalCodeBtn = document.getElementById("personalCodeBtn");
personalCodeBtn.addEventListener("click", () => {
  const Code = store.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(Code);
});

const personalCodeChatButton = document.getElementById("personal_code_chat");

const personalCodeVideoButton = document.getElementById("personal_code_video");

personalCodeChatButton.addEventListener('click', () => {
  const calleePersonalCode = document.getElementById('personal_code_chat_Input').value;
  const callType = constans.callType.CHAT_PERSONAL_CODE;
  webRTC.sendPreOffer(callType, calleePersonalCode);
})


personalCodeVideoButton.addEventListener('click', () => {
  const calleePersonalCode = document.getElementById('personal_code_chat_Input').value;
  const callType = constans.callType.VIDEO_PERSONAL_CODE;
  webRTC.sendPreOffer(callType, calleePersonalCode);
})


const micButton = document.getElementById('mic-button');

micButton.addEventListener('click', () => {
  const localStream = store.getState().localStream;
  //getAudioTracks miad kol mic hay vasl shode be system ro behemon mide --ma avalish ro migirim--
  const micEnable = localStream.getAudioTracks()[0].enabled;
  localStream.getAudioTracks()[0].enabled = !micEnable;
  ui.updateMicButton(micEnable);
})

const cameraButton = document.getElementById('camera-button');

cameraButton.addEventListener('click', () => {
  const localStream = store.getState().localStream;
  //getAudioTracks miad kol mic hay vasl shode be system ro behemon mide --ma avalish ro migirim--
  const cameraEnable = localStream.getVideoTracks()[0].enabled;
  localStream.getVideoTracks()[0].enabled = !cameraEnable;
  ui.updateCameraButton(cameraEnable);
})