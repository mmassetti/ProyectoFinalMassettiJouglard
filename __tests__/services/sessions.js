/**
 * @format
 */
// const {SessionsService} = require('../src/shared/services/sessions');
import {SessionsService} from '../../src/shared/services/sessions';

const session1 = {
  data: () => {
    return {
      date: {
        toDate: () => {
          return new Date();
        },
      },
    };
  },
};
const session2 = {
  data: () => {
    return {
      date: {
        toDate: () => {
          const now = new Date();
          now.setDate(now.getDate() - 1);
          return now;
        },
      },
    };
  },
};

describe('Sessions Service', () => {
  test('Sessions keep order', () => {
    const sessionsServiceInstance = SessionsService.getInstance();
    expect(
      sessionsServiceInstance.compareSessionsByDate(session1, session2),
    ).toBeGreaterThan(0);
  });

  test('Sessions change order', () => {
    const sessionsServiceInstance = SessionsService.getInstance();
    expect(
      sessionsServiceInstance.compareSessionsByDate(session2, session1),
    ).toBeLessThan(0);
  });
});
