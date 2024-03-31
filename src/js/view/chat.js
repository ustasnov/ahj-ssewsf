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
        <textarea class="message-input" placeholder="Сообщение" required></textarea>
        <button class="send-button">&#9658</button>
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

      const messageField = document.querySelector(".message-input");
      messageField.focus();
      messageField.oninput = e => {
        messageField.style.height = "auto";
        messageField.style.height = messageField.scrollHeight + "px";
      }

      const sendButton = document.querySelector(".send-button");
      sendButton.addEventListener("click", (ev) => {
        const currentUser = this.controller.getCurrentUser();
        const postMessage = { user: currentUser, message: messageField.value };
        const post = { command: "post",  data: postMessage};
        this.controller.sendPost({command: "post", data: post});
        messageField.value = "";
        messageField.style.height = "auto";
        messageField.focus();
      });

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
    console.log(`reсieved users from server: ${data}`);
    const currentUser = this.controller.getCurrentUser();
    let htmlContent = "";
    Array.from(data).forEach((el) => {
      let classMe = "";
      let userName = el;

      if (el === currentUser) {
        classMe = " me";
        userName = `Я (${el})`;
      }

      htmlContent = htmlContent + `
        <li class="user${classMe}">${userName}</li>`;
    });
    const userList = this.formContainer.querySelector(".users-list");
    userList.innerHTML = htmlContent;
    userList.scrollTo(0, userList.scrollHeight);
  }

  refreshChat(data) {
    console.log(`reсieved chat messages from server`);
    let htmlContent = "";
    let id = 0;
    const currentUser = this.controller.getCurrentUser();
    Array.from(data).forEach((el) => {
      console.log(el);
      let classJustify = "";
      let classPostJustify = "";
      let classMe = "";
      let userName = `${el.user}, ${el.datetime}`;

      if (el.user === currentUser) {
        classJustify = " right";
        classPostJustify = " postright";
        classMe = " mypost";
        userName = `Я (${el.user}), ${el.datetime}`;
      }

      htmlContent = htmlContent + `
        <div class="post-container${classJustify}">
          <div class="post${classPostJustify}">
            <div class="post-user${classMe}">${userName}</div> 
            <div class="post-message">${el.message}</div>
          </div>
        </div>`;
    });
    const chatList = this.formContainer.querySelector(".chat-list");
    chatList.innerHTML = htmlContent;
    chatList.scrollTo(0, chatList.scrollHeight);
    return;
  }
}
