import faker from 'faker';

export class FirebaseService {
  getInstance() {
    return new FirebaseService();
  }

  getAllSessions() {
    const sessions = [];
    for (var i = 0; i < 10; i++) {
      sessions.push({
        user: faker.name.findName(),
      });
    }
    return sessions;
  }

  getSessionById() {
    return null;
  }
}
