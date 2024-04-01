import ChatModel from "./model/chatmodel";
import ChatController from "./controller/chatcontroller";
import LoginDialog from "./view/logindialog";

//const serverUrl = "ws://localhost:7070";
const serverUrl = "wss://ahj-ssewsb.onrender.com";
const model = new ChatModel(serverUrl);
const controller = new ChatController(model);
new LoginDialog(controller).show();
