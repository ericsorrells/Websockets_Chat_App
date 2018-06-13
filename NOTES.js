//=================================================================

export default function* rootSaga() {
  yield fork(flow);
}

function* flow() {
  while (true) {
    // presumably, the payload corresponds to messages in 'subscribe'
    let { payload } = yield take(`${login}`);
    // create webSocket
    const socket = yield call(connect);

    socket.emit('login', { username: payload.username });

    const task = yield fork(handleIO, socket);

    let action = yield take(`${logout}`);
    yield cancel(task);
    socket.emit('logout');
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* read(socket) {
  // create instance of channel
  const channel = yield call(subscribe, socket);
  while (true) {
    // listen on the channel
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { payload } = yield take(`${sendMessage}`);
    socket.emit('message', payload);
  }
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('users.login', ({ username }) => {
      emit(addUser({ username }));
    });
    socket.on('users.logout', ({ username }) => {
      emit(removeUser({ username }));
    });
    socket.on('messages.new', ({ message }) => {
      emit(newMessage({ message }));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });
    return () => { };
  });
}

function connect() {
  const socket = io('http://localhost:3001');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}