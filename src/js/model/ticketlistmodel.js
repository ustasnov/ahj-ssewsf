export default class TicketListModel {
  constructor(serverUrl) {
    this.subscribers = new Map();
    this.host = serverUrl;
  }

  subscribe(el, ev) {
    if (this.subscribers.has(ev)) {
      const arr = this.subscribers.get(ev);
      if (arr.indexOf(el) === -1) {
        arr.push(el);
      }
    } else {
      const arr = [el];
      this.subscribers.set(ev, arr);
    }
  }

  notify(ev, evData) {
    if (this.subscribers.has(ev)) {
      Array.from(this.subscribers.get(ev)).forEach((el) => {
        el.dispatchEvent(new CustomEvent(ev, { detail: { data: evData } }));
      });
    }
  }

  async sendQuery(method, params, event, data = null) {
    const notifyFunc = this.notify.bind(this);

    const request = fetch(`${this.host}/${params}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });

    const result = await request;
    const respondData = await result.json();

    switch (respondData.result) {
      case 0:
        notifyFunc(event, respondData.data);
        break;
      case 1:
        notifyFunc(
          "error",
          `Тикет не найден на сервере. 
            Возможно он удален другим пользователем. Обновить список тикетов?`
        );
        break;
      default:
        break;
    }
  }

  getTicket(id) {
    this.sendQuery("GET", `ticketById/${id}`, "refreshTicket");
  }

  getAllTickets() {
    this.sendQuery("GET", "allTickets", "refresh");
  }

  createTicket(data) {
    this.sendQuery("POST", "createTicket", "refreshTicket", data);
  }

  toggleTicketStatus(id) {
    this.sendQuery("POST", "toggleTicketStatus", "updateTicket", { id: id });
  }

  updateTicket(data) {
    this.sendQuery("POST", "updateTicket", "updateTicket", data);
  }

  deleteTicket(id) {
    this.sendQuery("DELETE", `deleteTicket/${id}`, "deleteTicket");
  }
}
