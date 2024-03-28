export default class ChatController {
  constructor(model) {
    this.model = model;
  }

  subscribe(el, ev) {
    this.model.subscribe(el, ev);
  }

  login(data) {
    this.model.login(data);
  }

  getUsers() {
    this.model.getUsers();
  }

  getChatMessages() {
    this.model.getChatMessages();
  }
}
