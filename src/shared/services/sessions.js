import {safeExec, prop} from '../utils';

export class SessionsService {
  _instance;

  static getInstance() {
    if (!this._instance) this._instance = new SessionsService();
    return this._instance;
  }

  compareSessionsByDate(session1, session2) {
    const extractTime = compose(
      safeExec('getTime'),
      safeExec('toDate'),
      prop('date'),
      safeExec('data'),
    );
    const session1Time = extractTime(session1);
    const session2Time = extractTime(session2);

    return session1Time - session2Time;
  }
}
