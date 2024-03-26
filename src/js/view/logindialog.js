import MessageDialog from "./messagedialog";

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

  show(data) {
    this.data = data;
    this.formContainer = document.querySelector(".login-form-container");
    if (!this.formContainer) {
      const body = document.querySelector("body");
      const formContainer = document.createElement("div");
      formContainer.classList.add("login-form-container");
      formContainer.innerHTML = this.getFormHTML();
      this.formContainer = body.appendChild(formContainer);
      const nameField = document.getElementById("description");
      nameField.focus();

      if (this.data) {
        nameField.value = this.data.name;
      }

      const continueButton = this.formContainer.querySelector(".btn-continue");
      continueButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (nameField.value.trim() !== "") {
          this.data.name = nameField.value;
          this.controller.login(this.data);
          body.removeChild(this.formContainer);
        } else {
          new MessageDialog(
            "message",
            "Не заполнен псевдоним!",
            "Надо исправить"
          ).show();
        }
        ev.stopPropagation();
      });
    }
  }
}
