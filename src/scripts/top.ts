import axios from "axios";
const railsHost = process.env.RAILS_HOST;

// 変数定義
class Todo {
  constructor(textField, sendButton, railsHost) {
    this.textField = textField;
    this.sendButton = sendButton;
    this.host = railsHost;
    this.fetchTodos();
    this.setEventListener();
  }
  
  // ボタンがクリックされた時の処理
  setEventListener() {
    var _this = this;
    this.sendButton.addEventListener("click", function(e) {
      var text = _this.textField.value;
      _this.postTodo(text);
    });
  }
  
  // クエリを投げるためのメソッド
  postTodo(text) {
    var _this = this;
    axios.post(this.host + "/index.html", { title: text }).then(function(res) {
      var todo = res.data;
      _this.appendTodo(todo);
      _this.removeTextFromInput();
    });
  }
  
  // 次のクエリを入力しやすいように、入力欄の入力された値(value)はPOSTされたと同時に空にする
  removeTextFromInput() {
    this.textField.value = "";
  }
  
  // 取ってきた全てのデータをforEachで出力
  fetchTodos() {
    var _this = this;
    axios.get(this.host + "/index.html").then(function(res) {
      var todos = res.data;
      todos.forEach(function(todo) {
        _this.appendTodo(todo);
      });
    });
  }

window.onload = function() {
  todo = new Todo(
    document.getElementById("field"),
    document.getElementById("btn")
  );
};
