import {compose, safeExec, prop} from '../../utils';
import {Singleton} from './singletonService';

class InnerSessionsService {
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

export const SessionsService = new Singleton(InnerSessionsService);
