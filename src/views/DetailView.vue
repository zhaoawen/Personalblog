<template>
  <div class="beijing">
    <div class="box1">
      <div class="detail">本篇博客的详细内容</div>
      <div id="title">{{ currentPassage.name }}</div>
      <div id="content">{{ currentPassage.content }}</div>
      <input id="zan" type="button" value="点赞" @click="great()" />
      <input type="button" value="编辑" id="edit" @click="edit()"/>
      <input type="button" name="" id="del" value="删除" @click="del()" />
    </div>
    <div class="box2">
      <div class="box21">
        <div style="font-size: 18px; font-weight: bold">昵称：</div>
        <div id="yonghu">{{ this.uname }}</div>
      </div>
      <div class="box22">
        <input
          id="Login"
          type="button"
          value="Login"
          @click="this.$router.push('/user/login')"
        />
        <br />
        <input
          type="button"
          id="Register"
          value="Register "
          @click="this.$router.push('/user/register')"
        />
      </div>
    </div>
    <div class="box3">
      <textarea
        name=""
        id="text"
        cols="80"
        rows="7"
        placeholder="请输入你的评论"
      ></textarea>
      <input
        type="submit"
        name="提交"
        id="submit"
        value="提交"
        @click="creat()"
      />
      <div id="comm">
        <div class="quto" v-for="(item, index) in this.comments" :key="index">
          <span
            class="xian"
            :style="{ backgroundColor: this.randomColor() }"
          ></span>
          <span class="name">{{ item.split(",")[0] }}</span
          >:
          <span class="comment">{{
            item.split(",")[1].replace(/^\'+|\'+$/g, "")
          }}</span>
        </div>
      </div>
      <div class="blank"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  reqGetIsGreat,
  reqDetailGreat,
  reqDetailDel,
  reqDetailPinglun,
} from "@/request/api/detail.js";
export default {
  data() {
    return {
      uname: "",
      txt: "",
      comments: [],
      //是否点过赞
      isGreat: 0,
    };
  },
  computed: {
    ...mapState(["currentPassage", "userMessage"]),
  },
  mounted() {
    this.txtAname();
    var data = { name: this.txt, uname: this.uname };
    this.$store.dispatch("getPassageDetail", data);
    setTimeout(() => {
      this.comment();
      this.IsGreat();
    }, 500);
  },
  methods: {
    //接收到来自个人博客页面的名字
    txtAname() {
      var loc = location.href;
      var n1 = loc.length;
      var n2 = loc.lastIndexOf("/");
      this.txt = decodeURI(loc.substr(n2 + 1, n1 - n2));
      loc = loc.substr(0, n2);
      var n3 = loc.lastIndexOf("/");
      this.uname = decodeURI(loc.substr(n3 + 1, n2 - n3));
    },
    // 渲染评论
    comment() {
      this.comments = Array.from(
        this.currentPassage.com.replace(/^\[+|\]+$/g, "").split("],[")
      );
    },
    // 随机生成颜色
    randomColor() {
      var r = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    // 查看是否点过赞
    async IsGreat() {
      let data = { utxt: this.txt, uname: this.uname };
      let res = await reqGetIsGreat(data);
      for (let i = 0; i < res.data.message.length; i++) {
        if (res.data.message[i]["name='" + this.txt + "'"] == 1) {
          this.isGreat = 1;
          break;
        }
      }
    },
    // 详情页点赞
    async great() {
      if (this.isGreat == 1) {
        alert("重复点赞");
      } else {
        let data = { utxt: this.txt, uname: this.uname };
        let res = await reqDetailGreat(data);
        if (res) {
          alert("点赞成功！");
          this.isGreat = 1;
        }
      }
    },
    // 判断是否为管理员
    manager() {
      let edit = document.getElementById("edit");
      let del = document.getElementById("del");
      if (this.userMessage.uquanxian != "1") {
        edit.className += "  xiaoshi";
        del.className += "  xiaoshi";
      }
    },
    // 删除文章
    async del() {
      let flag = confirm("确定要删除当前博客吗？");
      if (flag) {
        let data = { utxt: this.txt, uname: this.uname };
        let res = await reqDetailDel(data);
        setTimeout(()=>{this.$router.go(0);},500); 
        if (res) {
          alert("删除成功！");
        }
      }
    },
    // 创建评论
    async creat() {
      if (this.uname == "游客") {
        alert("您需要先登录再评论哦！");
        document.getElementById("text").value = "";
      } else {
        var text = document.getElementById("text").value;
        var quto = document.getElementsByClassName("quto")[0];
        if (text.trim() == "") {
          alert("你的评论为空啊！~");
        } else {
          var div = document.createElement("div");
          div.className += "  quto";
          div.innerHTML =
            `<span class="xian"></span>
                                     <span class="name">` +
            this.uname +
            `</span>:
                                     <span class="comment">` +
            text +
            `</span>`;
          div.firstElementChild.style.backgroundColor = this.randomColor();
          // 插入到首评论前面
          comm.insertBefore(div, quto);
        }

        let data = {
          utxt: this.txt,
          uname: this.uname,
          insert: "[" + this.uname + ",'" + text + "']",
        };
        let res = await reqDetailPinglun(data);
        document.getElementById("text").value = null;
      }
    },
    // 进入编辑页面
    edit(){
      let edit = '/zw/add/' + encodeURI(this.txt);
      this.$router.push(edit);
    }
  },
};
</script>

    <style scoped>
.beijing {
  background: url(@/assets/images/fj5.webp) center center / cover no-repeat #222;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  box-shadow: 0 1px 2px rgba(150, 150, 150, 0.7);
  text-align: center;
  display: table;
}
.box1 {
  width: 700px;
  height: 230px;
  margin: 30px;
  padding-left: 30px;
  margin-left: 140px;
  background-color: #fff;
  line-height: 40px;
  opacity: 0.9;
  text-align: left;
}
.box1 input {
  font-size: 10px;
  line-height: 20px;
  text-indent: 8px;
  outline: none;
  width: 180px;
}
.detail {
  font-size: 13px;
}
#title {
  font-size: 19px;
  font-weight: bold;
}
#content {
  height: 90px;
  /* background-color: #bfa; */
}
#zan {
  width: 350px;
  height: 30px;
  margin-left: 40px;
}
.box21 {
  opacity: 0.9;
  background-color: #fff;
  width: 200px;
  height: 100px;
  position: absolute;
  top: 30px;
  left: 920px;
  padding: 20px;
  text-align: left;
}
#yonghu {
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
}
.name {
  display: inline-block;
  background-color: rgba(78, 135, 161, 0.493);
  width: 50px;
  text-align: center;
  margin: 5px;
}
.box22 {
  position: absolute;
  top: 170px;
  left: 920px;
}
#Login,
#Register {
  width: 240px;
  height: 30px;
  margin-top: 15px;
}
.box3 {
  padding-top: 20px;
  width: 730px;
  background-color: #fff;
  opacity: 0.85;
  margin: auto 140px;
}
.quto {
  width: 90%;
  background-color: #d2d2d2;
  line-height: 40px;
  margin: 20px 30px;
  text-align: left;
}
/* .xian{
            display: inline-block;
            width: 5px;
            height: 30px;
            position: relative;
            left: 8px;
            top: 8px;
            background-color: black;
            margin-right: 10px;
        } */
.blank {
  height: 10px;
}
.box3 {
  text-align: left;
}
#text {
  margin-left: 70px;
  outline: none;
  text-indent: 10px;
}
#submit {
  margin-left: 10px;
  width: 70px;
  height: 30px;
  position: relative;
  top: -10px;
}
.xian {
  border-radius: 50%;
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  left: 8px;
  top: 6px;
  margin-right: 10px;
}
#edit,
#del {
  width: 55px;
  text-align: center;
  padding-left: 0px;
  height: 35px;
  position: relative;
  left: 100px;
}
#del {
  margin-left: 20px;
}
.xiaoshi {
  display: none;
}
@media (max-width: 640px) {
  .box1 {
    width: 200px;
    height: 250px;
    margin: 50px;
    padding: 10px;
  }
  #zan {
    margin-top: 110px;
    width: 200px;
    height: 30px;
    margin-left: 0px;
  }
  #edit,
  #del {
    width: 55px;
    text-align: center;
    padding-left: 0px;
    height: 35px;
    position: relative;
    left: 35px;
  }
  .box21 {
    opacity: 0.9;
    background-color: #fff;
    width: 200px;
    height: 150px;
    position: absolute;
    top: 450px;
    left: 10%;
    padding: 20px;
    text-align: left;
    overflow: hidden;
  }
  .box22 {
    position: absolute;
    top: 520px;
    left: 10%;
  }
  html {
    height: 1200px;
    background: url(@/assets/images/fj5.webp) center center / cover no-repeat
      #222;
  }
  .box3 {
    width: 300px;
    margin-left: 10px;
    position: absolute;
    top: 650px;
  }
  .quto {
    width: 80%;
  }
  #text {
    margin-left: 10px;
    outline: none;
    text-indent: 10px;
    width: 85%;
  }
  #submit {
    margin-left: 200px;
    width: 70px;
    height: 30px;
    position: relative;
    top: 0px;
  }
  #content {
    height: 40%;
    font-size: 8px;
    /* background-color: #bfa; */
  }
}
</style>