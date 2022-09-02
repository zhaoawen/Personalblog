<template>
  <div class="beijing" style="overflow: -Scroll; overflow-x: hidden">
    <div class="box1">
      <div class="picture">
        <img src="@/assets/images/4.jpg" alt="" />
      </div>
      <br /><br /><br /><br /><br />
      <div style="font-weight: bold; margin-top: 10px">
        管理员：{{ this.uname }}<span></span>
      </div>
      <div class="return">
        <input
          type="button"
          value="点我返回主页面"
          id="return"
          @click="back()"
        />
      </div>
      <div class="add">
        <input type="button" name="" id="add" value="点我增加博客" @click="add()"/>
      </div>
      <div class="fenlei">
        <input type="button" value="分类" id="fenlei" @click="fenlei()" />
        <ul id="display" style="display: none">
          <br />
          <li>
            <a id="Java" href="javascript:;" @click="select('Java')">Java</a>
          </li>
          <li>
            <a id="Web" href="javascript:;" @click="select('Web')">Web</a>
          </li>
          <li>
            <a id="Golang" href="javascript:;" @click="select('Golang')"
              >Golang</a
            >
          </li>
          <li><a id="C" href="javascript:;" @click="select('C')">C</a></li>
        </ul>
      </div>
    </div>
    <div class="box2">
      <br /><br />
      <div>默认展示三篇博客的内容，想删除其余的请搜索</div>
      <br /><br />
      <input
        type="text"
        name=""
        placeholder="search"
        id="search"
        v-model="searchcontent"
      />
      <input
        type="button"
        name=""
        id="submit"
        value="Submit"
        @click="search()"
      />
      <div id="neirong">
        <div
          class="passage"
          v-for="(item, index) in this.showList"
          :key="index"
        >
          <div class="pass-title">{{ item.name }}</div>
          <div class="pass-content">{{ item.content }}</div>
          <div>
            点赞量：<span>{{ this.greatt(item) }}</span
            >收藏量：<span>{{ this.colletionn(item) }}</span
            >评论量：<span>{{ this.como(item) }}</span>
          </div>
          <input
            type="button"
            name=""
            class="del"
            value="delete"
            @click="this.delete (item, index)"
          />
          <input
            type="button"
            name=""
            class="edit"
            value="edit"
            @click="this.edit(item, index)"
          />
          <div style="height: 15px"></div>
        </div>
      </div>
      <div class="box3"></div>
    </div>
  </div>
</template>

<script>
import { reqDetailDel } from "@/request/api/detail.js";
import { reqGetMan } from "@/request/api/man.js";
export default {
  data() {
    return {
      uname: "",
      List: [],
      //   展示列表
      showList: [],
      //   搜索
      searchcontent: "",
      //  分类
      selectName: "",
    };
  },
  computed: {},
  mounted() {
    this.tx();
    this.req();
    this.keyDown();
  },
  methods: {
    add(){
        let str = '/'+this.uname+'/add/new';
        this.$router.push(str);
    },
    // 删除文章
    async delete(item, index) {
      let flag = confirm("确定要删除这篇博客吗？");
      if (flag) {
        let data = { 'utxt': item.name, 'uname': this.uname };
        setTimeout(()=>{this.$router.go(0);},500); 
        let res = await reqDetailDel(data);
      }
    },
    // 编辑文章
    edit(item, index) {
      let str = "/" + this.uname + "/add/" + item.name;
      this.$router.push(str);
    },
    // 筛选
    select(target) {
      this.showList = this.List.filter(function (item) {
        return item.type == target;
      });
      this.selectName = target;
    },
    // 点击分类时显示display
    fenlei() {
      if (display.style.display == "none") {
        display.style.display = "block";
      } else {
        display.style.display = "none";
      }
    },
    tx() {
      var loc = location.href;
      var n1 = loc.length;
      var n2 = loc.lastIndexOf("/");
      loc = loc.substr(0, n2);
      var n3 = loc.lastIndexOf("/");
      this.uname = decodeURI(loc.substr(n3 + 1, n2 - n3));
    },
    async req() {
      let data = { uname: this.uname };
      let res = await reqGetMan(data);
      this.List = res.data.message;
      this.showList = this.List.slice(0, 3);
    },
    greatt(item) {
      let count = 0;
      if (item.great != null) {
        count = item.great.replace(/^\[+|\]+$/g, "").split(",").length;
      }
      return count;
    },
    colletionn(item) {
      let count = 0;
      if (item.colletion != null) {
        count = item.colletion.replace(/^\[+|\]+$/g, "").split(",").length;
      }
      return count;
    },
    como(item) {
      let count = 0;
      if (item.com != null) {
        count = Array.from(
          item.com.replace(/^\[+|\]+$/g, "").split("],[")
        ).length;
      }
      return count;
    },
    // 返回主页面
    back() {
      let str = "/" + this.uname;
      this.$router.push(str);
    },
    // 搜索
    search() {
      if (this.searchcontent.trim() == "") {
        alert("输入为空哦！");
      } else {
        var reg = new RegExp(this.searchcontent);
        let regFenlei = new RegExp(this.selectName);
        if (this.selectName == "") {
          this.showList = this.List.filter(function (item) {
            return reg.test(item.name) || reg.test(item.content);
          });
        } else {
          this.showList = this.List.filter(function (item) {
            return (
              regFenlei.test(item.type) &&
              (reg.test(item.name) || reg.test(item.content))
            );
          });
        }
        // 什么也没有搜到
        if (this.showList == "") {
          alert("什么也没有搜到哦~");
        }
        this.searchcontent = "";
      }
    },
    // 键盘监控
    keyDown() {
      // document.body.addEventListener('keyup', function (e) {}
      document.onkeydown = (e) => {
        //事件对象兼容
        let e1 =
          e || event || window.event || arguments.callee.caller.arguments[0];
        //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
        if (e1 && e1.keyCode == 13) {
          this.search();
        }
      };
    },
  },
};
</script>

<style scoped>
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
.beijing {
  background: url(@/assets/images/2.jpg);
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: 100% 100%;
  box-shadow: 0 1px 2px rgba(150, 150, 150, 0.7);
  text-align: center;
  display: table;
  /* overflow: hidden; */
  overflow: auto;
}
.box1 {
  float: left;
  margin-right: 0px;
  margin-left: 150px;
  margin-top: 30px;
  width: 200px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.596);
  opacity: 1;
}
img {
  width: 50px;
  height: 50px;
  background-size: cover;
  background-image: url(@/assets/images/1.jpg);
  border-radius: 50%;
  position: absolute;
  left: 230px;
  top: 50px;
}
.return input,
.add input,
.fenlei input {
  width: 150px;
  height: 35px;
  outline: none;
  cursor: pointer;
}
.return input,
.add input,
.fenlei input {
  margin: 12px 0px;
}
.box2 {
  width: 800px;
  background-color: rgba(255, 255, 255, 0.575);
  float: left;
  margin-left: 20px;
  margin-top: 30px;
}
#search {
  width: 300px;
  height: 25px;
  text-indent: 10px;
  outline: none;
}
#submit {
  width: 100px;
  height: 30px;
  cursor: pointer;
}
.passage {
  padding-top: 10px;
  margin: 20px 0px;
  background-color: rgba(255, 255, 255, 0.616);
  margin-left: 20px;
  width: 95%;
}
.passage div {
  margin: 30px 0px;
}
.del,
.edit {
  width: 100px;
  height: 30px;
  margin: 0px 10px;
  cursor: pointer;
}
.box3 {
  width: 100%;
  height: 20px;
}
#return,
#add,
#classify {
  cursor: pointer;
}
#display {
  margin-top: 30px;
  width: 200px;
  height: 180px;
  background-color: rgba(255, 255, 255, 0.596);
}
a {
  text-decoration: none;
  color: #000;
}
#display li {
  margin: 20px 0px;
}
@media (max-width: 640px) {
  .box1 {
    margin-left: 60px;
  }
  img {
    left: 130px;
  }
  .box2 {
    width: 280px;
  }
  #search {
    width: 200px;
  }
  #submit {
    margin-top: 20px;
  }
  .passage {
    padding-top: 10px;
    margin: 20px 0px;
    background-color: rgba(255, 255, 255, 0.616);
    margin-left: 20px;
    width: 85%;
  }
  .del,
  .edit {
    margin: 10px 10px;
  }
}
</style>