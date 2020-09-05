export class Singleton {
  _instance;
  InnerService;

  constructor(Service) {
    this.InnerService = Service;
  }

  getInstance() {
    if (!this._instance) this._instance = new this.InnerService();
    return this._instance;
  }
}
