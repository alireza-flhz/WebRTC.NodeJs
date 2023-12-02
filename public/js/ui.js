import * as constans from './constans.js';
import * as element from './element.js';


export const updatePersonalCode = (personalCode) => {
    const personalCodeParagraph = document.getElementById('Personaltitle');
    personalCodeParagraph.innerHTML = personalCode;
}


export const updateLocalVideo = (stream) => {
    const localVideo = document.getElementById('local_video')
    localVideo.srcObject = stream;

    localVideo.addEventListener('loadedmetadata', () => {
        localVideo.play();
    })
}

export const updateRemoteVideo = (stream) => {
    const remoteVideo = document.getElementById('remote_video');
    remoteVideo.srcObject = stream;
}

export const showIncomingCAllDialog = (callType, acceptCallHandler, rejectCallHandler) => {
    const callTypeInfo = constans.callType.CHAT_PERSONAL_CODE == callType ? 'chat' : 'video';
    const dialog = element.getIncomingCallDialog(callTypeInfo, acceptCallHandler, rejectCallHandler);
    //removing all element in dialog tag for new call incoming
    const dialogelement = document.getElementById('dialog');
    dialogelement.querySelectorAll('*').forEach((el) => el.remove())
    dialogelement.appendChild(dialog);
}

export const ShowCallingDialog = (rejectCallHandler) => {
    const dialog = element.showCallingDialog(rejectCallHandler);
    //removing all element in dialog tag for new call incoming
    const dialogelement = document.getElementById('dialog');
    dialogelement.querySelectorAll('*').forEach((el) => el.remove())
    dialogelement.appendChild(dialog);
}

export const removeAllDialogs = () => {
    const dialogelement = document.getElementById('dialog');
    dialogelement.querySelectorAll('*').forEach((el) => el.remove())
}

export const showInfodialog = (preeOfferAnswer) => {
    let infoDialog = null;
    if (preeOfferAnswer == constans.preeOfferAnswer.CALL_REJECTED) {
        infoDialog = element.getInfoDialog('Call rejected', 'calle rejected your Call');
    }
    if (preeOfferAnswer == constans.preeOfferAnswer.CALL_UNACAILABLE) {
        infoDialog = element.getInfoDialog('call is not possible', 'Probly callee Not Found');
    }
    if (preeOfferAnswer == constans.preeOfferAnswer.CALLEE_NOT_FOUND) {
        infoDialog = element.getInfoDialog('calle not found ', 'Please check personal code');
    }
    if (infoDialog) {
        console.log("Info dialog OK!!!!");
        const dialog = document.getElementById('dialog');
        dialog.appendChild(infoDialog)
    }

    setTimeout(() => {
        removeAllDialogs()
    }, 4000)
}


const micOnImgSrc = './utils/images/mic.png';
const micOffImgSrc = './utils/images/micOff.png';


export const updateMicButton = (minActive) => {
    const micButtonImage = document.getElementById('mic_button_image');
    micButtonImage.src = minActive ? micOffImgSrc : micOnImgSrc;
}



const cameraOnImgSrc = './utils/images/camera.png';
const cameraOffImgSrc = './utils/images/cameraOff.png';


export const updateCameraButton = (cameraActive) => {
    const cameraButtonImage = document.getElementById('camera_button_image');
    cameraButtonImage.src = cameraActive ? cameraOffImgSrc : cameraOnImgSrc;
}