// ========================================================================================
import {takeEvery, eventChannel} from 'redux-saga';
import {put, call, take, fork} from 'redux-saga/effects';
// import {INITIALIZE_WEB_SOCKETS_CHANNEL, WEBSOCKET_MESSAGE_RECEIVED} from '../actions';
import { receivedMessage } from '../actions/actions';
// ========================================================================================

function* listeners(socket) {
  yield [
    takeEvery('INITIALIZE_WEB_SOCKETS_CHANNEL', initializeWebSocketsChannel),
    takeEvery('WEBSOCKET_MESSAGE_SENT', sendMessageSaga, socket),
    // takeEvery()
  ]
}

export function* websocketSaga() {
  yield fork(initializeWebSocketsChannel)
}

function* initializeWebSocketsChannel() {
  try {
    const socket = new WebSocket("ws://localhost:3001/");
    const channel = yield call(createEventChannel, socket);

    while (true) {
      yield fork(listeners, socket)
      const message = yield take(channel);
      // yield put({type: 'WEBSOCKET_MESSAGE_RECEIVED', body: message});
    }

  } finally {
    console.log('Terminate Connection');
    // add channel close logic here
  }
}

function createEventChannel(socket) {
  console.log('CREATE_EVENT_CHANNEL: outside')
  return eventChannel(emit => {
    console.log('EVENT CHANNEL')

    socket.onmessage = (message) => {
      console.log('RECEIVING MESSAGE:', message)
      emit(receivedMessage(message))
    };

    socket.onopen = (error) => {
      sendMessage("Hello My New Websocket Connection!!")
    }

    const sendMessage = (message) => {
      console.log('SENDING MESSAGE: ', message);
      socket.send(message);
    }

    return () => {
      socket.close();
    };
  });
}

function* sendMessageSaga(socket, message) {
  console.log('SEND MESSAGE SAGA: message', message)
  console.log('SEND MESSAGE SAGA: socket', socket)
  // const channel = yield call(createEventChannel, socket);
  yield socket.send(message.message)
}
