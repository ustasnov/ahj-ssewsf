export default class MessageDialog {
  constructor(type, message, title, callback = null, param = null) {
    this.type = type;
    this.message = message;
    this.title = title;
    this.formContainer = null;
    this.callback = callback;
    this.param = param;
  }

  getDialogHTML() {
    const text = `<form class="dialog-form">
          <div class="dialog-title">${this.title}</div>
          <div class="dialog-message">${this.message}</div>
          <div class="dialog-buttons">
            <button type="button" class="btn btn-ok">ОК</button>
            <button type="button" class="btn btn-cancel${
              this.type === "message" ? " hidden" : ""
            }">Отмена</button>
          </div>
        </form>`;

    return text;
  }

  show() {
    this.formContainer = document.querySelector(".dialog-form-container");
    if (!this.formContainer) {
      const body = document.querySelector("body");
      const formContainer = document.createElement("div");
      formContainer.classList.add("dialog-form-container");
      formContainer.innerHTML = this.getDialogHTML();
      this.formContainer = body.appendChild(formContainer);

      const okButton = this.formContainer.querySelector(".btn-ok");
      okButton.addEventListener("click", (ev) => {
        ev.preventDefault();

        body.removeChild(this.formContainer);
        if (this.callback) {
          this.callback(this.param);
        }

        ev.stopPropagation();
      });

      const cancelButton = this.formContainer.querySelector(".btn-cancel");
      cancelButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        body.removeChild(this.formContainer);
        ev.stopPropagation();
      });
    }
  }
}
