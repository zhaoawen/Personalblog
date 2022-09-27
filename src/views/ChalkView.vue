<template>
  <div class="beijing" style="">
    <br />聊天室
    <ul id="list">
         <!-- <li class="ll1">
              <p>
      <span>${user}</span>
        <i>${new Date(dateTime)}</i>
        </p>
      <p>消息：${message}</p>
        </li>
         <li class="ll2">
              <p>
      <span>${user}</span>
        <i>${new Date(dateTime)}</i>
        </p>
      <p>消息：${message}</p>
        </li>
         <li class="ll1">
              <p>
      <span>${user}</span>
        <i>${new Date(dateTime)}</i>
        </p>
      <p>消息：${message}</p>
        </li>
         <li class="ll2">
              <p>
      <span>${user}</span>
        <i>${new Date(dateTime)}</i>
        </p>
      <p>消息：${message}</p>
        </li>
         <li class="ll1">
              <p>
      <span>${user}</span>
        <i>${new Date(dateTime)}</i>
        </p>
      <p>消息：${message}</p>
        </li>
         <li class="ll1">
              <p>
      <span>${user}</span>
        <i>${new Date(dateTime)}</i>
        </p>
      <p>消息：${message}</p>
        </li>
          <li class="ll1">
              <p>
      <span>${user}</span>
        <i>${new Date(dateTime)}</i>
        </p>
      <p>消息：${message}</p>
        </li>
          <li class="ll1">
              <p>
      <span>${user}</span>
        <i>${new Date(dateTime)}</i>
        </p>
      <p>消息：${message}</p>
        </li>
          <li class="ll1">
              <p>
      <span>${user}</span>
        <i>${new Date(dateTime)}</i>
        </p>
      <p>消息：${message}</p>
        </li> -->
    </ul>
    <!-- 这个ul标签是为了后面放置发送的消息列表的 -->
    <textarea type="text" id="message" placeholder="请输入消息" />
    <button id="send">发送</button>
  </div>
</template>

<script>
export default {
  mounted() {
    this.ws();
  },
  methods: {
    ws() {
      ((document, WebSocket) => {
        const oList = document.querySelector("#list");
        const oMessage = document.querySelector("#message");
        const oSendBtn = document.querySelector("#send");

        // 协议是ws，不是http
        const ws = new WebSocket("ws:localhost:8000");
        // 新建WebSocket实例 因为我用nodejs写的服务器的地址是localhost:8000，如果大家开发的话，问后端要这个websocket地址即可。

        let username = "";

        const init = () => {
          bindEvent();
        };

        function bindEvent() {
          oSendBtn.addEventListener("click", handleSendBtnClick, false); // 给发送按钮绑定点击事件

          // 实例对象的onopen属性，用于指定连接成功后的回调函数。也就是open事件，也可以写作 ws.onopen = function () {}
          ws.addEventListener("open", handleOpen, false);
          ws.addEventListener("close", handleClose, false); // 同上
          ws.addEventListener("error", handleError, false); // 同上
          // 实例对象的onmessage属性，用于指定收到服务器数据后的回调函数。
          ws.addEventListener("message", handleMessage, false);
        }

        // 发送按钮的点击事件
        function handleSendBtnClick() {
          console.log("send message");

          const msg = oMessage.value; // 发送的内容（input框的value值）
          if (!msg.trim().length) {
            return;
          }

          // 实例对象的send()方法用于向服务器发送数据。
          ws.send(
            // 应该发送字符串
            JSON.stringify({
              user: username,
              dateTime: new Date().getTime(),
              message: msg,
            })
          );
          localStorage.setItem(
            "chalk",
            JSON.stringify({
              user: username,
              dateTime: new Date().getTime(),
              message: msg,
            })
          );
          // 发送完以后清空输入框
          oMessage.value = "";
        }

        function handleOpen(e) {
          console.log("Websocket open", e);
          // 获取登录时存放在localStorage的登录名
          username = localStorage.getItem("username");

          // 如果没找到登录名，则跳转到登录页面重新登录
          if (!username) {
            this.$router.push("/user/register");
          }
        }
        function handleClose(e) {
          console.log("Websocket close", e);
        }
        function handleError(e) {
          console.log("Websocket error", e);
        }
        function handleMessage(e) {
          console.log("Websocket message--收到消息了", e);
          const msgData = JSON.parse(e.data);
          // 向页面里的ul标签添加子节点
          oList.appendChild(createMsg(msgData));
        }

        // 消息的格式
        function createMsg(data) {
          const { user, dateTime, message } = data;
          let end = String(new Date(dateTime)).indexOf('GMT');

          const oItem = document.createElement("li");
          oItem.innerHTML = `
      <p>
      <span class="uname">${user}:</span>
        <i>${String(new Date(dateTime)).slice(0,end)}</i>
        </p>
      <p>${message}</p>
      `;
      if(user!=username){
        oItem.className+=' ll1';
      }else{
        oItem.className+=' ll2';
      }
          
          return oItem;
        }

        init();
      })(document, WebSocket); // WebSocket是window身上本身就有的
    },
  },
};
</script>

<style lang="less">
#list{
    height:76%;
    overflow:auto;
    /* overflow: hidden; */
}
.beijing {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  /* max-height: 100vh; */
  box-shadow: 0 1px 2px rgba(150, 150, 150, 0.7);
  text-align: center;
  display: table;
}
.beijing::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  background: url(@/assets/images/4.jpg) center center / cover no-repeat #222;
  filter: blur(3px);
  z-index: -1;
}
#send {
  width: 4rem;
  height: 2rem;
  position: absolute;
  bottom: 2rem;
  left: 80%;
}
#message {
  line-height: 2rem;
  text-indent: 1rem;
  outline: none;
  left: 10%;
  width: 70%;
  position: absolute;
  bottom: 2rem;
}
.ll1{
    position: relative;
    width: 40%;
    text-align: left;
    left: 3%;
    border-radius: 5px;
    // height: 3.5rem;
    padding: 10px ;
    line-height: 1.5rem;
    margin: 1rem;
    color: black;
    background-color: rgb(210, 216, 219);
}
.ll2{
    position: relative;
    width: 40%;
    text-align: right;
    left: 52%;
    color: whitesmoke;
    border-radius: 5px;
    // height: 3.5rem;
    padding: 10px ;
    margin: 1rem;
    background-color:#1E6EFF;

}
@media (max-width: 640px) {
  .ll1{
    position: relative;
    width: 50%;
    text-align: left;
    left: 3%;
    border-radius: 5px;
    // height: 3.5rem;
    padding: 10px ;
    line-height: 1.5rem;
    margin: 1rem;
    color: black;
    background-color: rgb(210, 216, 219);
}
.ll2{
    position: relative;
    width: 50%;
    text-align: right;
    left: 35%;
    color: whitesmoke;
    border-radius: 5px;
    // height: 3.5rem;
    padding: 10px ;
    margin: 1rem;
    background-color:#1E6EFF;

}
}
</style>