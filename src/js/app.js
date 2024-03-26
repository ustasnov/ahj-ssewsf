import TicketListModel from "./model/ticketlistmodel";
import TicketListController from "./controller/ticketlistcontroller";
import TicketList from "./view/ticketlist";

const serverUrl = "http://localhost:7070";
const model = new TicketListModel(serverUrl);
const controller = new TicketListController(model);
new TicketList(controller);
