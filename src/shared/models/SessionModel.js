export class SessionModel {
  constructor(description, user, date) {
    this.description = description;
    this.user = user;
    this.date = date;
  }

  setDescription(description) {
    this.description = description;
  }

  setUser(user) {
    this.user = user;
  }

  setDate(date) {
    this.date = date;
  }
}
