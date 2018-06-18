// // ========================================================================================
import { takeEvery, eventChannel } from 'redux-saga';
import { put, call, take, fork } from 'redux-saga/effects';
import { sendLocalMessage } from '../actions/actions'
// // ========================================================================================


function* listeners() {
  yield [
    takeEvery('RECEIVED_BID', bidSaga)
  ]
}

export function* mainSaga() {
  console.log('MAIN SAGA IS ALIVE')
  yield fork(listeners)
}

export function* bidSaga(incomingBid) {
  const { bidAmount, userName } = incomingBid
  yield put(sendLocalMessage(`* NEW BID RECEIVED: $${bidAmount} from ${userName} *`))
}
