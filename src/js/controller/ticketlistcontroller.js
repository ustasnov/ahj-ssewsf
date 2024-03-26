export default class TicketListController {
  constructor(model) {
    this.model = model;
  }

  subscribe(el, ev) {
    this.model.subscribe(el, ev);
  }

  getTicket(id) {
    return this.model.getTicket(id);
  }

  getAllTickets() {
    return this.model.getAllTickets();
  }

  createTicket(data) {
    this.model.createTicket(data);
  }

  toggleTicketStatus(id) {
    this.model.toggleTicketStatus(id);
  }

  updateTicket(data) {
    this.model.updateTicket(data);
  }

  deleteTicket(id) {
    this.model.deleteTicket(id);
  }

  login(data) {
    this.model.login(data);
  }
}
