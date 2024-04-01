import ChatModel from "./model/chatmodel";
import ChatController from "./controller/chatcontroller";
import LoginDialog from "./view/logindialog";

//const serverUrl = "ws://localhost:7070";
const serverUrl = "wss://https://ahj-ssewsb.onrender.com:10000";
const model = new ChatModel(serverUrl);
const controller = new ChatController(model);
new LoginDialog(controller).show();
