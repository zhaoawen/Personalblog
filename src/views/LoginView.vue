<template>
  <div class="beijing">
    <div class="box1">
      <form action="">
        <div style="font-size: 16px; font-weight: bold">密码登录</div>
        <span class="iconfont icon-dianhua"></span>
        <input
          type="text"
          placeholder="请输入您的手机号"
          id="login-tel"
          v-model="userdel"
        />
        <span id="tel-warn"></span>
        <span class="iconfont icon-mima"></span>
        <input
          type="password"
          placeholder="请输入您的密码"
          id="login-key"
          v-model="userpwd"
        />
        <span class="iconfont icon-yanjing" style="display: inline-block" @click="zhengyan()"></span
        >
        <span class="iconfont icon-yanjing1" style="display: none" @click="biyan()"></span>
        <span id="key-warn"></span>

        <input type="text" id="yanzhengma" placeholder="请输入验证码" v-model="yzm"/>
        <canvas
          id="randomCode"
          width="120"
          height="50"
          style="border: 1px solid #bbbbbb; cursor: pointer"
          title="点击更换验证码"
        ></canvas>
        <input type="submit" value="登录" id="login-btn" @click="login" /><br />
        <input type="button" value="注册系统" id="zhuce" @click="$router.push('/users/register')"/>
        <!-- <input type="checkbox" name="" id="mianmi" value="" >
                <span class="wenzi" style="font-size: 14px;">七天免密登录</span> -->
      </form>
    </div>
  </div>
</template>

<script>
import { reqLoginUser } from "@/request/api/login";
export default {
  name: "login",
  data() {
    return {
      userdel: "",
      userpwd: "",
      yzm:"",
      randomCodes:"",
    };
  },
  mounted() {
    this.randomCodes = this.yanzhengma();
  },
  methods: {
    yanzhengma() {
      function randomStr(canvasId) {
        var c = document.getElementById(canvasId);
        var w = c.offsetWidth;
        var h = c.offsetHeight;
        var randomCodes = "";
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 120, 50); //先清除canvas画布
        //绘制矩形
        ctx.fillStyle = randColor(170, 250);
        ctx.fillRect(0, 0, 120, 50);
        // 绘制验证码
        var Letter = "ABCDEFGHIJKLMNOPQRSTUVWHYZ1234567890";
        for (var i = 0; i < 4; i++) {
          var char = Letter[Math.floor(Math.random() * Letter.length)];
          randomCodes += char;
          var fs = randNum(35, 60); //字体的大小
          var deg = randNum(-30, 30); //字体的旋转角度
          ctx.font = fs + "px Simhei";
          ctx.textBaseline = "top";
          ctx.fillStyle = randColor(60, 160);
          ctx.save();
          ctx.translate(30 * i + 15, 15);
          ctx.rotate((deg * Math.PI) / 180);
          ctx.fillText(char, -15 + 5, -15);
          ctx.restore();
        }
        // 绘制干扰线
        for (var q = 0; q < 6; q++) {
          ctx.beginPath();
          ctx.lineWidth = "1";
          ctx.strokeStyle = randColor(60, 160); // Green path
          ctx.moveTo(randNum(0, w), randNum(0, h));
          ctx.lineTo(randNum(0, w), randNum(0, h));
          ctx.stroke(); // Draw it
        }
        return randomCodes;
      }
      function randColor(min, max) {
        var r = Math.floor(Math.random() * (max - min + 1) + min);
        var g = Math.floor(Math.random() * (max - min + 1) + min);
        var b = Math.floor(Math.random() * (max - min + 1) + min);
        return "rgb(" + r + "," + g + "," + b + ")";
      }
      function randNum(min, max) {
        var num = Math.floor(Math.random() * (max - min + 1) + min);
        return num;
      }
      var randomCodes = randomStr("randomCode");
      console.log(randomCodes);
      document.getElementById("randomCode").onclick = function () {
        randomCodes = randomStr("randomCode");
      };
      return randomCodes;
    },
    async login() {
      //阻止默认行为
      var e = e || window.event;
      e.preventDefault();
      //获取表单数据
      var tel = this.userdel.trim();
      var password = this.userpwd.trim();

      //请求的参数
      var data = { userdel: tel, userpwd: password };
        if(yanzhengma.value!=this.randomCodes){
                alert("验证码错误！！！");
                yanzhengma.value="";
                return ;
        }else{
            let res = await reqLoginUser(data);
            console.log(res);
            if (res) {
                alert("登录成功！");
                res=res.data.data;
                let str = encodeURI(res);
                localStorage.setItem("username",str);
                this.$router.push("/"+str);
            } else {
                alert("密码错误！");
            }
        }
      
    },
    zhengyan() {
      var yanjing1 = document.getElementsByClassName("icon-yanjing")[0];
      var yanjing = document.getElementsByClassName("icon-yanjing1")[0];
      let oKey = document.getElementById("login-key");
      if (yanjing1.style.display == "inline-block") {
        yanjing1.style.display = "none";
        yanjing.style.display = "inline-block";
        oKey.type = "text";
      }
    },
    biyan() {
      var yanjing1 = document.getElementsByClassName("icon-yanjing")[0];
      var yanjing = document.getElementsByClassName("icon-yanjing1")[0];
      let oKey = document.getElementById("login-key");
      yanjing.addEventListener("click", function () {
        if (yanjing1.style.display == "none") {
          yanjing1.style.display = "inline-block";
          yanjing.style.display = "none";
          oKey.type = "password";
        }
      });
    },
  },
};
</script>

<style scoped>
.beijing {
  background: url(@/assets/images/fj4.jpg) center center / cover no-repeat #222;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  box-shadow: 0 1px 2px rgba(150, 150, 150, 0.7);
  text-align: center;
  display: table;
}
.box1 {
  width: 200px;
  /* height: 200px; */
  margin: 100px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.521);
  line-height: 40px;
  opacity: 0.9;
  border-radius: 5px;
  box-shadow: 10px 10px 5px #3d2e2e;
  position: relative;
}
.box1 input {
  text-indent: 8px;
  outline: none;
  width: 170px;
  border-radius: 5px;
  border: none;
}
#login-btn,
#zhuce {
  cursor: pointer;
  color: white;
  background-color: #305778;
  height: 25px;
}
#login-btn,
#zhuce {
  position: relative;
  top: -10px;
}
#mianmi {
  width: 20px;
  position: relative;
  top: -10px;
  cursor: pointer;
}
.icon-yanjing {
  position: absolute;
  left: 190px;
  cursor: pointer;
}
.icon-yanjing1 {
  position: absolute;
  left: 190px;
  cursor: pointer;
}
#randomCode {
  width: 61px;
  float: right;
  top: -32.5px;
  left: -12px;
  position: relative;
}
#yanzhengma {
  height: 24px;
  position: relative;
}
.wenzi {
  position: relative;
  top: -10px;
}
</style>