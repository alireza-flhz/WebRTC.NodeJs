import { callType } from "./constans.js";


export const getIncomingCallDialog = (callType, acceptCallHandler, rejectCallHandler) => {
    console.log('getting incoming call dialog elemetjs');
    const dialog = document.createElement('div');
    dialog.classList.add('dialog_wrapper');
    const dialogContent = document.createElement('div');
    dialogContent.classList.add('dialog_content');
    dialog.appendChild(dialogContent);

    const title = document.createElement('p');
    title.classList.add('dialog_title');
    title.innerHTML = `Incoming ${callType} Call`

    const imageContainre = document.createElement('div');
    imageContainre.classList.add("dialog_image_container");
    const image = document.createElement('img');
    const avatarImagePath = './utils/images/dialogAvatar.png';
    image.src = avatarImagePath;
    imageContainre.appendChild(image);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('dialog_button_container');

    const acceptCallButton = document.createElement('button');
    acceptCallButton.classList.add('dialog_accept_call_button');
    const acceptCallImg = document.createElement('img');
    acceptCallImg.classList.add('dialog_button_image');
    const acceptCallImgPath = './utils/images/acceptCall.png';
    acceptCallImg.src = acceptCallImgPath;
    acceptCallButton.append(acceptCallImg);
    buttonContainer.appendChild(acceptCallButton);

    const rejectCallButton = document.createElement('button');
    rejectCallButton.classList.add('dialog_reject_call_button');
    const rejectCallImg = document.createElement('img');
    rejectCallImg.classList.add('dialog_button_image');
    const rejectCallImgPath = './utils/images/rejectCall.png';
    rejectCallImg.src = rejectCallImgPath;
    rejectCallButton.append(rejectCallImg);
    buttonContainer.appendChild(rejectCallButton);

    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainre);
    dialogContent.appendChild(buttonContainer);

    acceptCallButton.addEventListener('click', () => {
        acceptCallHandler();
    })

    rejectCallButton.addEventListener('click', () => {
        rejectCallHandler();
    })

    return dialog;
}

export const showCallingDialog = (rejectCallHandler) => {
    const dialog = document.createElement('div');
    dialog.classList.add('dialog_wrapper');
    const dialogContent = document.createElement('div');
    dialogContent.classList.add('dialog_content');
    dialog.appendChild(dialogContent);

    const title = document.createElement('p');
    title.classList.add('dialog_title');
    title.innerHTML = `Call ...`

    const imageContainre = document.createElement('div');
    imageContainre.classList.add("dialog_image_container");
    const image = document.createElement('img');
    const avatarImagePath = './utils/images/dialogAvatar.png';
    image.src = avatarImagePath;
    imageContainre.appendChild(image);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('dialog_button_container');
    const hangUpCallButton = document.createElement('button');
    hangUpCallButton.classList.add('dialog_reject_call_button');


    const hangUpCallImg = document.createElement('img');
    hangUpCallImg.classList.add('dialog_button_image');
    const rejectCallImgPath = './utils/images/rejectCall.png';
    hangUpCallImg.src = rejectCallImgPath;
    hangUpCallButton.append(hangUpCallImg);
    buttonContainer.appendChild(hangUpCallButton);


    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainre);
    dialogContent.appendChild(buttonContainer);


    return dialog;
}

export const getInfoDialog = (dialogTitle, dialogDescription) => {
    const dialog = document.createElement('div');
    dialog.classList.add('dialog_wrapper');
    const dialogContent = document.createElement('div');
    dialogContent.classList.add('dialog_content');
    dialog.appendChild(dialogContent);

    const title = document.createElement('p');
    title.classList.add('dialog_title');
    title.innerHTML = dialogTitle;

    const imageContainre = document.createElement('div');
    imageContainre.classList.add("dialog_image_container");
    const image = document.createElement('img');
    const avatarImagePath = './utils/images/dialogAvatar.png';
    image.src = avatarImagePath;
    imageContainre.appendChild(image);

    const description = document.createElement('p');
    description.classList.add('dialog_description');
    description.innerHTML = dialogDescription;

    dialogContent.appendChild(title);
    dialogContent.appendChild(imageContainre);
    dialogContent.appendChild(description);

    return dialog;
}