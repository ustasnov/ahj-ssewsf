import MessageDialog from "./messagedialog";
import TicketDialog from "./ticketdialog";
import Ticket from "./ticket";

export default class TicketList {
  constructor(controller) {
    this.controller = controller;
    this.ticket = new Ticket(controller);
    this.ticketForm = new TicketDialog(controller);

    this.container = document.querySelector(".ticket-list-container");
    this.render();

    this.ticketListEl = document.querySelector(".ticket-list");

    this.controller.subscribe(this.ticketListEl, "refresh");
    this.ticketListEl.addEventListener("refresh", (ev) => {
      this.ticketListEl.innerHTML = "";

      Array.from(ev.detail.data).forEach((ticketData) => {
        this.ticket.addToContainer(this.ticketListEl, ticketData);
      });
    });

    this.controller.subscribe(this.ticketListEl, "refreshTicket");
    this.ticketListEl.addEventListener("refreshTicket", (ev) => {
      const ticketData = ev.detail.data;
      const ticketEl = document.getElementById(ticketData.id);
      if (ticketEl) {
        let ticketDescEl = ticketEl.querySelector(".ticket-desc");
        const isHidden = ticketDescEl.classList.contains("hidden");
        this.ticket.render(ticketEl, ticketData);
        ticketDescEl = ticketEl.querySelector(".ticket-desc");
        if (isHidden) {
          ticketDescEl.classList.remove("hidden");
        } else {
          ticketDescEl.classList.add("hidden");
        }
      } else {
        this.ticket.addToContainer(this.ticketListEl, ticketData);
      }
    });

    this.controller.subscribe(this.ticketListEl, "updateTicket");
    this.ticketListEl.addEventListener("updateTicket", (ev) => {
      const ticketData = ev.detail.data;
      const ticketEl = document.getElementById(ticketData.id);
      if (ticketEl) {
        this.ticket.render(ticketEl, ticketData);
      }
    });

    this.controller.subscribe(this.ticketListEl, "deleteTicket");
    this.ticketListEl.addEventListener("deleteTicket", (ev) => {
      const ticketEl = document.getElementById(ev.detail.data);
      this.ticket.removeFromContainer(this.ticketListEl, ticketEl);
    });

    this.controller.subscribe(this.ticketListEl, "error");
    this.ticketListEl.addEventListener("error", (ev) => {
      new MessageDialog("question", ev.detail.data, "Сообщение сервера", () => {
        this.controller.getAllTickets();
      }).show();
    });

    this.addTicketButton = this.container.querySelector(".btn-add-ticket");
    this.addTicketButton.addEventListener("click", (ev) => {
      ev.preventDefault();
      this.ticketForm.show(null);
    });

    this.controller.getAllTickets();
  }

  render() {
    this.container.innerHTML = `<div class="ticket-buttons">
        <button class="btn btn-add-ticket">Добавить тикет</button>
      </div>
      <div class="ticket-list"></div>`;
  }
}
