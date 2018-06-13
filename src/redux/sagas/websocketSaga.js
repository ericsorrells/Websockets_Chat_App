// ========================================================================================
import {takeEvery, eventChannel} from 'redux-saga';
import {put, call, take, fork, cancel } from 'redux-saga/effects';
import { sendMessage } from '../actions/actions';
// import {INITIALIZE_WEB_SOCKETS_CHANNEL, WEBSOCKET_MESSAGE_RECEIVED} from '../actions';
// ========================================================================================

export function* websocketSaga() {
  yield fork(initializeWebSocketsChannel);
}

function* initializeWebSocketsChannel() {
  // try {
    console.log('INITIALIZE SAGA: outside')
    const mySocket = new WebSocket("ws://localhost:3001/");
    while (true) {
      console.log('INITIALIZE SAGA: inside')

    // const channel = yield call(channelSubscriber, mySocket);

    // while (true) {
      // const message = yield take(channel);
      const task = yield fork(handleIO, mySocket);
              // TODO: wrap this in an ending task
              // yield cancel(task);
    }
  //   }
  // } finally {
  //   console.log('Terminate Connection');
    // add channel close logic here
  // }
}

function* handleIO(socket) {
  console.log('HANDLE IO: called')
  yield fork(readMessageSaga, socket);
  yield fork(writeMessageSaga, socket);
}

function* writeMessageSaga(socket) {
  // listen to channel for new messages
  // write new messages to DB
  // const message = yield take(channel);
  // const { writtenMessage } = yield take(`WEBSOCKET_MESSASGE_SENT`);
  // yield put({type: 'WEBSOCKET_MESSAGE_RECEIVED', body: writeMessage });
  // socket.emit('message', message);

  while (true) {
    const { message } = yield take('WEBSOCKET_MESSAGE_SENT');
    console.log('WRITE MESSAGE - inside: ', message)
    // picked up by socket 'onmessage'
    socket.onmessage(message);
  }
}

function* readMessageSaga(socket) {
  console.log('READ MESSAGE: outside')
  const channel = yield call(channelSubscriber, socket)
  while(true) {
    // listen on channel
    let message = yield take(channel);
    console.log('READ MESSAGE SAGA: inside', message)

    // send to store
    yield put(sendMessage(message));
  }
}

function channelSubscriber(mySocket) {
  return eventChannel(emit => {
    console.log('EMIITER', emit)

    mySocket.onmessage = (message) => {
      console.log('RECEIVING MESSAGE:', message)
      // send message through channel
      // picked up by the readMessageSaga
      emit(message.data)
    };

    mySocket.onopen = (error) => {
      sendMessageToServer("Hello My New Websocket Connection!!")
    }

    const sendMessageToServer = (message) => {
      console.log('SENDING MESSAGE: ', message);
      mySocket.send(message);
    }

    return () => {
      mySocket.close();
    };
  });
}
