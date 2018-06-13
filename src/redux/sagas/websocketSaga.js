// // ========================================================================================
import {takeEvery, eventChannel} from 'redux-saga';
import {put, call, take, fork} from 'redux-saga/effects';
// // import {INITIALIZE_WEB_SOCKETS_CHANNEL, WEBSOCKET_MESSAGE_RECEIVED} from '../actions';
// import { receivedMessage } from '../actions/actions';
// // ========================================================================================


export function* websocketSaga() {
//   console.log('WEBSOCKET SAGA ALIVE')

  // yield fork(initializeWebSockets)
}

// function connect() {
//   return new Promise(function(resolve, reject) {
//     const socket = new WebSocket("ws://localhost:3001/");
//     socket.onopen = function() {
//       console.log('RESOLVING PROMISE')
//       socket.send('hello from the client');
//       resolve(socket);
//     };
//     socket.onmessage = (message) => {
//       console.log('SOCKET: onmessage', message)
//     }
//     socket.onerror = function(err) {
//         reject(err);
//     };
// });
//   // console.log('CONNECT: creating webSocket connection')
//   // const socket = new WebSocket("ws://localhost:3001/");
//   // return new Promise(resolve => {
//   //   socket.onopen(() => {
//   //     console.log('RESOLVING CONNECT PROMISE')
//   //     resolve(socket);
//   //   });
//   // });
// }

// function* initializeWebSockets() {
//   // while (true) {
//     const socket =  yield call(connect);
//     console.log('INITIALIZE: socket', socket)

//     const task = yield fork(handleIO, socket);
//     console.log('INITIALIZE: task', task)

//   // }
// }

// function* handleIO(socket) {
//   console.log('HANDLE_IO')
//   yield fork(readSaga, socket);
//   yield fork(writeSaga, socket);
// }

// function* readSaga(socket) {
//   const channel = yield call(subscribe, socket);
//   console.log('READ: outside')
//   while (true) {
//     let action = yield take(channel);
//     console.log('READ: inside:', action)
//     yield put(action);
//   }
// }

// function* writeSaga(socket) {
//   while (true) {
//     const { payload } = yield take();
//     console.log('WRITE inside: ', payload)
//     socket.emit('message', payload);
//   }
// }

// function subscribe(socket) {
//   return eventChannel(emit => {
//     console.log('SUBSCRIBE:', socket)

//     // socket.on('users.login', ({ username }) => {
//     //   console.log('SUBSCRIBE: login', username);
//     //   emit(addUser({ username }));
//     // });
//     // socket.on('users.logout', ({ username }) => {
//     //   console.log('SUBSCRIBE: users.logout')

//     //   emit(removeUser({ username }));
//     // });
//     socket.onmessage(({ message }) => {

//       console.log('SUBSCRIBE: messages.new', message)
//       // emit(newMessage({ message }));
//     });
//     // socket.on('disconnect', e => {
//     //   console.log('SUBSCRIBE: disconnect')
//     //   // TODO: handle
//     // });
//     return () => {};
//   });
// }







// // function* listeners(socket) {
// //   yield [
// //     takeEvery('INITIALIZE_WEB_SOCKETS_CHANNEL', initializeWebSocketsChannel),
// //     takeEvery('WEBSOCKET_MESSAGE_SENT', sendMessageSaga, socket),
// //     // takeEvery()
// //   ]
// // }

// // export function* websocketSaga() {
// //   yield fork(initializeWebSocketsChannel)
// // }

// // function* initializeWebSocketsChannel() {
// //   try {
// //     const socket = new WebSocket("ws://localhost:3001/");
// //     const channel = yield call(createEventChannel, socket);

// //     while (true) {
// //       yield fork(listeners, socket)
// //       const message = yield take(channel);
// //       // yield put({type: 'WEBSOCKET_MESSAGE_RECEIVED', body: message});
// //     }

// //   } finally {
// //     console.log('Terminate Connection');
// //     // add channel close logic here
// //   }
// // }

// // function createEventChannel(socket) {
// //   console.log('CREATE_EVENT_CHANNEL: outside')
// //   return eventChannel(emit => {
// //     console.log('EVENT CHANNEL')

// //     socket.onmessage = (message) => {
// //       console.log('RECEIVING MESSAGE:', message)
// //       emit(receivedMessage(message))
// //     };

// //     socket.onopen = (error) => {
// //       sendMessage("Hello My New Websocket Connection!!")
// //     }

// //     const sendMessage = (message) => {
// //       console.log('SENDING MESSAGE: ', message);
// //       socket.send(message);
// //     }

// //     return () => {
// //       socket.close();
// //     };
// //   });
// // }

// // function* sendMessageSaga(socket, message) {
// //   console.log('SEND MESSAGE SAGA: message', message)
// //   console.log('SEND MESSAGE SAGA: socket', socket)
// //   // const channel = yield call(createEventChannel, socket);
// //   yield socket.send(message.message)
// // }
