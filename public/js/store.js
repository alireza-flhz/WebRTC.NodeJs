let state = {
  socketId: null,
  localStream: null,
  remoteStream: null,
  screenShatingStream: null,
  allowConnectionsFromStrange: false,
  screensharingActive: false,
};

export const setSocketId = (socketId) => {
  state = {
    ...state,
    socketId,
  }
};

export const setlocalStream = (stream) => {
  state = {
    ...state,
    localStream: stream,
  }
};

export const setAllowConnectionsFromStranger = (allowconnection) => {
  state = {
    ...state,
    allowConnectionsFromStrange: allowconnection,
  }
};

export const setScreenSharingActive = (ScreenSharingActive) => {
  state = {
    ...state,
    ScreenSharingActive,
  }
};

export const setScreenSharingStream = (stream) => {
  state = {
    ...state,
    screenShatingStream: stream,
  }
};

export const setRemoteStream = (stream) => {
  state = {
    ...state,
    remoteStream: stream,
  }
};

export const getState = () => {
  return state;
};
