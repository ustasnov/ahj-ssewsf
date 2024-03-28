import MessageDialog from "./messagedialog";

export default class Chat {
  constructor(controller) {
    this.controller = controller;
    this.formContainer = null;
    this.data = null;
  }

  getFormHTML() {
    const text = `<div class="users-container">
      <ul class="users-list">
      <ul>
    </div>
    <div class="chat-container">
      <div class="chat-list">
      </div>
      <div class="message">
        <input type="text" class="message-input" placeholder="Сообщение" required></input>
      </div>   
    </div>`;

    return text;
  }

  show() {
    this.formContainer = document.querySelector(".main-container");
    if (!this.formContainer) {
      const body = document.querySelector("body");
      const formContainer = document.createElement("div");
      formContainer.classList.add("main-container");
      formContainer.innerHTML = this.getFormHTML();
      this.formContainer = body.appendChild(formContainer);

      const messageField = document.querySelector("message-input");
      messageField.focus();

      this.controller.subscribe(this.formContainer, "users");
      this.formContainer.addEventListener("users", (ev) => {
        this.refreshUsers(ev.detail.data);
      });

      this.controller.subscribe(this.formContainer, "chat");
      this.formContainer.addEventListener("chat", (ev) => {
        this.refreshChat(ev.detail.data);
      });

      this.controller.getUsers();
      this.controller.getChatMessages();
    }
  }

  refreshUsers(data) {
    const res = JSON.parse(data);
    let htmlContent = "";
    Array.from(res).forEach((el) => {
      htmlContent = htmlContent + `\n<li class="user">${el}</li>`;
    });
    const userList = this.formContainer.querySelector(".users-list");
    userList.innerHTML = htmlContent;
  }

  refreshChat(data) {
    return;
  }
}
