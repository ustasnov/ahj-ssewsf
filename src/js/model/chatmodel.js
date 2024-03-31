export default class ChatModel {
  constructor(serverUrl) {
    this.subscribers = new Map();
    this.host = serverUrl;
    this.ws = new WebSocket(this.host + "/ws");
    this.currentUser = null;

    this.ws.addEventListener("open", (e) => {
      console.log(e);

      console.log("ws open");
    });

    this.ws.addEventListener("close", (e) => {
      console.log(e);

      console.log("ws close");
    });

    this.ws.addEventListener("error", (e) => {
      console.log(e);

      console.log("ws error");
    });

    this.ws.addEventListener("message", (e) => {
      //console.log(e);
      const data = JSON.parse(e.data);
      switch (data.command) {
        case "login": {
          if (data.result === 0) {
            this.currentUser = data.data;
          }
          this.notify("login", data);
          break;
        }
        case "chat": {
          this.notify("chat", data.data);
          break;
        }
        case "users": {
          this.notify("users", data.data);
          break;
        }
        default:
          break;
      }
    });
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

  login(data) {
    this.ws.send(JSON.stringify(data));
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getUsers() {
    this.ws.send(JSON.stringify({ command: "getusers" }));
  }

  getChatMessages() {
    this.ws.send(JSON.stringify({ command: "getchat" }));
  }

  sendPost(data) {
    this.ws.send(JSON.stringify(data));
  }
}
