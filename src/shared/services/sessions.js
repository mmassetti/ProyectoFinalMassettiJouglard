export class SessionsService {
  _instance;

  static getInstance() {
    if (!this._instance) this._instance = new SessionsService();
    return this._instance;
  }

  compareSessionsByDate(session1, session2) {
    return (
      session2
        .data()
        .date.toDate()
        .getTime() -
      session1
        .data()
        .date.toDate()
        .getTime()
    );
  }
}
