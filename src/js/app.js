/*
import TicketListModel from "./model/ticketlistmodel";
import TicketListController from "./controller/ticketlistcontroller";
import TicketList from "./view/ticketlist";

const serverUrl = "http://localhost:7070";
const model = new TicketListModel(serverUrl);
const controller = new TicketListController(model);
new TicketList(controller);
*/

import ChatModel from "./model/chatmodel";
import ChatController from "./controller/chatcontroller";
import LoginDialog from "./view/logindialog";

const serverUrl = "ws://localhost:7070";
const model = new ChatModel(serverUrl);
const controller = new ChatController(model);
new LoginDialog(controller).show();
