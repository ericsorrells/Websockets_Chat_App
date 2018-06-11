// ========================================================================================
import {takeEvery, eventChannel} from 'redux-saga';
import {put, call, take, fork} from 'redux-saga/effects';
// import {INITIALIZE_WEB_SOCKETS_CHANNEL, WEBSOCKET_MESSAGE_RECEIVED} from '../actions';
// ========================================================================================

function* listeners() {
  yield [
    takeEvery('INITIALIZE_WEB_SOCKETS_CHANNEL', initializeWebSocketsChannel),
    takeEvery('WEBSOCKET_MESSAGE_SENT', )
  ]
}

export function* websocketSaga() {
  yield fork(initializeWebSocketsChannel);
  yield fork(listeners)
  // yield [
  //   takeEvery('INITIALIZE_WEB_SOCKETS_CHANNEL', initializeWebSocketsChannel)
  // ];
}

function* initializeWebSocketsChannel() {
  try {
    const mySocket = new WebSocket("ws://localhost:8080/");

    const channel = yield call(createEventChannel, mySocket);
    while (true) {
      const message = yield take(channel);
      yield put({type: 'WEBSOCKET_MESSAGE_RECEIVED', body: message});
    }
  } finally {
    console.log('Terminate Connection');
    // add channel close logic here
  }
}

function createEventChannel(mySocket) {
  return eventChannel(emit => {
    mySocket.onmessage = (message) => {
      console.log('RECEIVING MESSAGE:', message)
      emit(message.data)
    };

    mySocket.onopen = (error) => {
      sendMessage("Hello My New Websocket Connection!!")
    }

    const sendMessage = (message) => {
      console.log('SENDING MESSAGE: ', message);
      mySocket.send(message);
    }

    return () => {
      mySocket.close();
    };
  });
}
