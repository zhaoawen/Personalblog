<template>
  <div class="beijing" style="overflow: -Scroll; overflow-x: hidden">
    <div class="box1">
      <div>请编辑文章题目</div>
      <input type="text" name="" id="title" v-model="this.txt" />
      <div>请编辑文章内容</div>
      <textarea name="" id="content" cols="30" rows="8">{{ content }}</textarea
      ><br />
      <div>请修改文章类型（单项选择）</div>
      <input type="radio" name="hello" value="Java" />Java
      <input type="radio" name="hello" value="Web" />Web
      <input type="radio" name="hello" value="Golang" />Golang
      <input type="radio" name="hello" value="C" />C
      <div>请修改封面图片</div>
      <input type="file" name="imgPath" id="fengmian-img" @change="upImage()" />
      <p><img id="imgPath" src="" alt="预览" style="width: 200px" /></p>
      <input
        type="button"
        name=""
        id="submit"
        value="编辑完成"
        @click="submit()"
      />
      <div class="box3"></div>
    </div>
    <div class="box2">
      <div class="picture">
        <img id="user-img" src="@/assets/images/4.jpg" alt="" />
      </div>
      <br /><br /><br /><br /><br />
      <div style="font-weight: bold; margin-top: 10px">
        管理员：{{ this.uname }}<span></span>
      </div>
      <div class="return">
        <input
          type="button"
          value="点我返回管理员页面"
          id="return"
          @click="back()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      txt: "",
      uname: "",
      // 上传图片时候的flag
      flag: 0,
      // 文章类型
      type: "",
      // 编辑还是修改
      message: "",
    };
  },
  computed: {
    ...mapState(["editPassage"]),
    content() {
      if (this.message == "new") {
        return "";
      } else {
        return this.editPassage.content;
      }
    },
    id() {
      if (this.message == "new") {
        return "";
      } else {
        return this.editPassage.id;
      }
    },
    imgPath() {
      if (this.message == "new") {
        return "";
      } else {
        return this.editPassage.img;
      }
    },
  },
  mounted() {
    this.txtAndUname();
    if (this.message != "new") {
      var data = { name: this.txt, uname: this.uname };
      this.$store.dispatch("getPassageEdit", data);
      setTimeout(() => {
        this.upLeixing();
      }, 500);
    }
  },
  methods: {
    // 收到文章名字
    txtAndUname() {
      let loc = location.href;
      let n1 = loc.length;
      let n2 = loc.lastIndexOf("/");
      this.txt = decodeURI(loc.substr(n2 + 1, n1 - n2));
      this.message = this.txt;
      let n3 = loc.indexOf("/");
      let n4 = loc.indexOf("/add");
      let name = decodeURI(loc.substr(n3 + 2, n4 - n3 - 2)).split("/");
      this.uname = name[1];
    },
    // 上传封面照片
    upImage() {
      const imgNode = document.getElementById("fengmian-img");
      this.flag = 1;
      const file = imgNode.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        document.getElementById("imgPath").src = this.result;
      };
    },
    // 更新文章类型和图片
    upLeixing() {
      let checkElement = document.getElementsByName("hello");
      for (let i = 0; i < checkElement.length; i++) {
        if (checkElement[i].value == this.type) {
          checkElement[i].checked = "true";
        }
      }
      let imgp = "/images/" + this.editPassage.img + ".jpg";
      document.getElementById("imgPath").src = imgp;
    },
    // 修改完成
    submit() {
      const imgNode = document.getElementById("fengmian-img");
      let content = document.getElementById("content");
      let checkElement = document.getElementsByName("hello");
      for (let i = 0; i < checkElement.length; i++) {
        if (checkElement[i].checked == true) {
          this.type = checkElement[i].value;
        }
      }
      if (this.flag == 1) {
        let l1 = imgNode.files[0].name.length;
        let l2 = imgNode.files[0].name.indexOf(".");
        // let imgpath=decodeURI(imgNode.files[0].name.substr(l2+1,l1-l2));
        var imgpath = imgNode.files[0].name.substr(0, l2);
      }
      let dataXiuGai = {
        id: this.id,
        name: this.txt,
        type: this.type,
        content: content.value,
        img: imgpath ? imgpath : this.imgPath,
        uname: this.uname,
      };
      let dataEdit = {
        name: this.txt,
        type: this.type,
        content: content.value,
        img: imgpath ? imgpath : this.imgPath,
        uname: this.uname,
      };
      if (this.message == "new") {
        this.$store.dispatch("getEditPassage", dataEdit);
      } else {
        this.$store.dispatch("getEditPassageFinished", dataXiuGai);
      }
      this.back();
    },
    // 到管理员端
    back() {
      let str = "/" + this.uname + "/man";
      this.$router.push(str);
    },
  },
};
</script>

<style scoped>
.beijing {
  background: url(@/assets/images/4.jpg) center center / cover no-repeat #222;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  box-shadow: 0 1px 2px rgba(150, 150, 150, 0.7);
  text-align: center;
  display: table;
}
.box1 {
  margin-top: 33px;
  margin-left: 100px;
  float: left;
  padding-top: 10px;
  width: 800px;
  /* height: 500px; */
  background-color: rgba(255, 255, 255, 0.582);
}
.box1 div {
  margin: 10px 0px;
}
#title {
  width: 300px;
  height: 25px;
  outline: none;
}
#content {
  outline: none;
}
.box2 {
  float: left;
  margin-right: 0px;
  margin-left: 85px;
  margin-top: 30px;
  width: 200px;
  height: 230px;
  background-color: rgba(255, 255, 255, 0.596);
  opacity: 1;
}
#submit {
  width: 100px;
  height: 25px;
  margin: 20px 0px;
}
#user-img {
  width: 50px;
  height: 50px;
  background-size: cover;
  background-image: url(@/assets/images/1.jpg);
  border-radius: 50%;
  position: absolute;
  left: 1060px;
  top: 10%;
  cursor: pointer;
}
.return input,
.add input {
  width: 150px;
  height: 35px;
  outline: none;
}
.return input {
  margin: 25px 0px;
}
.box3 {
  height: 10px;
}
@media (max-width: 640px) {
  .box1 {
    margin-top: 33px;
    margin-left: 10px;
    width: 300px;
  }
  .box1 div {
    margin: 10px 0px;
  }
  #title {
    width: 200px;
    height: 25px;
    outline: none;
  }
  .beijing {
    background: url(@/assets/images/4.jpg) center center / cover no-repeat #222;
    overflow: hidden;
    width: 100%;
    /* height: 100%; */
    box-shadow: 0 1px 2px rgba(150, 150, 150, 0.7);
    text-align: center;
    display: table;
  }
  html {
    background: url(@/assets/images/4.jpg) center center / cover #222;
    /* height: 880px; */
  }
  .box2 {
    float: left;
    margin-right: 0px;
    margin-left: 55px;
    margin-top: 10px;
    width: 200px;
    height: 230px;
    background-color: rgba(255, 255, 255, 0.596);
    opacity: 1;
  }
  #user-img {
    width: 50px;
    height: 50px;
    background-size: cover;
    background-image: url(@/assets/images/1.jpg);
    border-radius: 50%;
    position: absolute;
    left: 40%;
    top: 145%;
    cursor: pointer;
  }
}
</style>