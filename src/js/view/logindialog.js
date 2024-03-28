import MessageDialog from "./messagedialog";
import Chat from "./chat";

export default class LoginDialog {
  constructor(controller) {
    this.controller = controller;
    this.formContainer = null;
    this.data = null;
  }

  getFormHTML() {
    const text = `<form class="login-form">
        <div class="login-form-title">Выберите псевдоним</div>
        <textarea id="description" name="name" class="input" rows="2" required></textarea>
        <div class="login-buttons">
          <button type="button" class="btn btn-continue">Продолжить</button>
        </div>
      </form>`;

    return text;
  }

  show() {
    this.formContainer = document.querySelector(".login-form-container");
    if (!this.formContainer) {
      const body = document.querySelector("body");
      const formContainer = document.createElement("div");
      formContainer.classList.add("login-form-container");
      formContainer.innerHTML = this.getFormHTML();
      this.formContainer = body.appendChild(formContainer);
      const nameField = document.getElementById("description");
      nameField.focus();

      const continueButton = this.formContainer.querySelector(".btn-continue");
      continueButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (nameField.value.trim() !== "") {
          this.data = { command: "login", data: nameField.value };
          this.controller.login(this.data);
          //body.removeChild(this.formContainer);
        } else {
          new MessageDialog(
            "message",
            "Не заполнен псевдоним!",
            "Надо исправить"
          ).show();
        }
        ev.stopPropagation();
      });

      this.controller.subscribe(this.formContainer, "login");
      this.formContainer.addEventListener("login", (ev) => {
        if (ev.detail.data.result === 0) {
          body.removeChild(this.formContainer);
          const chat = new Chat(this.controller);
          chat.show();
        } else {
          new MessageDialog(
            "message",
            "Псевдоним занят, используйте другой!",
            "Надо исправить",
            () => {
              const nameField = document.getElementById("description");
              nameField.value = "";
              nameField.focus();
            }
          ).show();
        }
      });
    }
  }
}
