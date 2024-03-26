import TicketDialog from "./ticketdialog";
import MessageDialog from "./messagedialog";

export default class Ticket {
  constructor(controller) {
    this.controller = controller;
    this.ticketForm = new TicketDialog(controller);

    this.statusListener = function (ev) {
      ev.preventDefault();
      const ticketEl = ev.currentTarget.closest(".ticket");
      this.controller.toggleTicketStatus(ticketEl.id);
      ev.stopPropagation();
    };

    this.editListener = function (ev) {
      ev.preventDefault();
      const ticketEl = ev.currentTarget.closest(".ticket");
      const statusEl = ticketEl.querySelector(".ticket-status");
      const nameEl = ticketEl.querySelector(".ticket-name");
      const descEl = ticketEl.querySelector(".ticket-desc");
      const createdEl = ticketEl.querySelector(".ticket-created");
      const ticketData = {
        id: ticketEl.id,
        name: nameEl.textContent,
        description: descEl.textContent,
        status: statusEl.textContent.charAt(0) == "\u2714" ? 1 : 0,
        created: createdEl.textContent,
      };
      this.ticketForm.show(ticketData);
      ev.stopPropagation();
    };

    this.deleteListener = function (ev) {
      ev.preventDefault();

      new MessageDialog(
        "question",
        "Вы уверены, что хотите удалить тикет? Это действие необратимо.",
        "Удалить тикет",
        (ev) => {
          const ticketEl = ev.target.closest(".ticket");
          this.controller.deleteTicket(ticketEl.id);
        },
        ev
      ).show();

      ev.stopPropagation();
    };
  }

  addEventListeners(element) {
    const statusButton = element.querySelector(".ticket-status");
    statusButton.addEventListener("click", this.statusListener.bind(this));

    const editButton = element.querySelector(".ticket-edit");
    editButton.addEventListener("click", this.editListener.bind(this));

    const deleteButton = element.querySelector(".ticket-delete");
    deleteButton.addEventListener("click", this.deleteListener.bind(this));
  }

  removeEventListeners(element) {
    const statusButton = element.querySelector(".ticket-status");
    if (statusButton) {
      statusButton.removeEventListener("click", this.statusListener.bind(this));
    }

    const editButton = element.querySelector(".ticket-edit");
    if (editButton) {
      editButton.removeEventListener("click", this.editListener.bind(this));
    }

    const deleteButton = element.querySelector(".ticket-delete");
    if (deleteButton) {
      deleteButton.removeEventListener("click", this.deleteListener.bind(this));
    }
  }

  addToContainer(container, data) {
    const el = document.createElement("div");
    el.classList.add("ticket");
    el.id = data.id;
    const element = container.appendChild(el);

    element.addEventListener("click", (ev) => {
      ev.preventDefault();
      this.controller.getTicket(ev.currentTarget.id);
    });

    this.render(element, data);
  }

  removeFromContainer(container, el) {
    this.removeEventListeners(el);
    container.removeChild(el);
  }

  render(el, data) {
    this.removeEventListeners(el);

    el.innerHTML = `<button class="row-btn ticket-status">${
      data.status == "1" ? "&#10004" : ""
    }</button>
      <div class="desc-container">
        <div class="ticket-name ticket-text">${data.name}</div>
        <div class="ticket-desc ticket-text hidden">${data.description}</div>
      </div>
      <div class="ticket-created">${data.created}</div>
      <button class="row-btn ticket-edit">&#9998</button>
      <button class="row-btn ticket-delete">&#10005</button>`;

    this.addEventListeners(el);
  }
}
