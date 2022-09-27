<template>
  <div class="content" style="display: block">
    <div class="title-con">Classification of works</div>
    <input
      class="circle-button checked"
      type="button"
      value="All"
      id="All"
      @click="All()"
    />
    <input
      class="circle-button"
      type="button"
      value="Web"
      id="Web"
      @click="Web()"
    />
    <input
      class="circle-button"
      type="button"
      value="Java"
      id="Java"
      @click="Java()"
    />
    <input
      class="circle-button"
      type="button"
      value="Golang"
      id="Golang"
      @click="Golang()"
    />
    <input class="circle-button" type="button" value="c" id="C" @click="C()" />
    <br />
    <input
      class="search-block"
      type="text"
      placeholder="search"
      id="search_block"
      v-model="searchcontent"
    />
    <input
      class="search-button"
      type="button"
      value="Submit"
      id="search_button"
      @click="search()"
    />
    <br />
    <div class="remen">
      <div style="font-weight: bold">用户：</div>
      <div id="name">{{name}}</div>
      <div style="font-weight: bold">热门文章</div>
      <div id="hot"></div>
    </div>
    <div class="neirong">
      <div
        class="passage"
        :getDate="getDate(item, index)"
        v-for="(item, index) in this.showList"
        :key="index"
      >
        <img :src="baseUrl + item.img + bottomUrl" alt="" />
        <!-- <img :src="baseUrl+item.img+bottomUrl" alt=""> -->
        <div class="pass-title">{{ item.name }}</div>
        <div class="pass-content">{{ item.content }}</div>
        <input
          class="details"
          type="submit"
          value="Details"
          :name="item.name"
          @click="detail(item, index)"
        />
        <input
          type="checkbox"
          name="great"
          class="checkbox1"
          @click="great(item, index)"
        />
        <span class="iconfont icon-dianzan_kuai great"></span>
        <input
          type="checkbox"
          name="great"
          class="checkbox2"
          @click="col(item, index)"
        />
        <span class="iconfont icon-shoucang1 colletion" id="colletion"></span>
      </div>
    </div>
    <div id="barcon" name="barcon" :page="page(1, 2)"></div>
    <div id="jsi-flying-fish-container" class="container"></div>
  </div>
</template>

<script>
import {
  reqGetPassage,
  reqGetPassageGreat,
  reqGetPassageDelGreat,
  reqGetPassageDelCol,
  reqGetPassageCol,
  reqGetPassageDetail,
} from "@/request/api/home.js";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      baseUrl: "/images/",
      bottomUrl: ".jpg",
      txt: "",
      getDate: this.begin,
      page: this.goPage,
      hotPassage: this.hot,
      searchcontent: "",
    };
  },
  name: "HomeClassify",
  computed: {
    ...mapState(["passageList"]),
    showList: {
      get() {
        return this.$store.state.showList;
      },
      set(newValue) {
        this.$store.state.showList = newValue;
      },
    },
    name(){
      return this.tx();
    }
  },
  mounted() {
    let data = {uname:this.tx()};
    this.$store.dispatch("getPassage",data);
    this.tx();
    this.hot();
    this.keyDown();
    this.littlefish();
  },
  methods: {
    // 收到用户名字
    tx() {
      let loc = location.href;
      let n1 = loc.length;
      let n2 = loc.lastIndexOf("/");
      this.txt = decodeURI(loc.substr(n2 + 1, n1 - n2));
      return this.txt;
    },
    // 初始化点赞和收藏
    begin(item, index) {
      setTimeout(() => {
        let div = document.getElementsByClassName("passage")[index];
        if (item.great == null) {
          greats = "";
        } else {
          var str1 = item.great.replace(/^\[+|\]+$/g, "");
          var greats = str1.split(",");
          for (let j = 0; j < greats.length; j++) {
            if (this.txt == greats[j]) {
              div.lastElementChild.previousElementSibling.previousElementSibling.previousElementSibling.checked =
                "true";
              div.lastElementChild.previousElementSibling.previousElementSibling.className +=
                " checkbox11";
            }
          }
        }
        if (item.colletion == null) {
          cols = "";
        } else {
          var str2 = item.colletion.replace(/^\[+|\]+$/g, "");
          var cols = str2.split(",");
          for (let j = 0; j < cols.length; j++) {
            if (this.txt == cols[j]) {
              div.lastElementChild.previousElementSibling.checked = "true";
              div.lastElementChild.className += " checkbox22";
            }
          }
        }
      }, 500);
    },
    // 进行点赞或者收藏
    async great(item, index) {
      if (this.txt == "游客") {
        alert("要进行点赞或者收藏操作请先登录哦~");
        return;
      }
      let mingzi = item.name;
      let flag = document.getElementsByClassName("checkbox1")[index].checked;
      let box = document.getElementsByClassName("great")[index];
      let data = { uname: this.txt, utxt: mingzi };
      if (flag == true) {
        let res = await reqGetPassageGreat(data);
        if (res) {
          alert("点赞成功！");
        } else {
          alert("错误！");
        }
        box.className += " checkbox11";
      } else {
        let res = await reqGetPassageDelGreat(data);
        if (res) {
          alert("取赞成功！");
        } else {
          alert("取赞失败，请仔细检查各项内容");
        }
        box.className = "iconfont icon-dianzan_kuai";
      }
    },
    async col(item, index) {
      if (this.txt == "游客") {
        alert("要进行点赞或者收藏操作请先登录哦~");
        return;
      }
      var mingzi = item.name;
      let flag = document.getElementsByClassName("checkbox2")[index].checked;
      let box = document.getElementsByClassName("colletion")[index];
      let data = { uname: this.txt, utxt: mingzi };
      if (flag == true) {
        let res = await reqGetPassageCol(data);
        if (res) {
          alert("收藏成功！");
        } else {
          alert("错误！");
        }
        box.className += " checkbox22";
      } else {
        let res = await reqGetPassageDelCol(data);
        if (res) {
          alert("取消收藏成功！");
        } else {
          alert("取藏失败，请仔细检查各项内容");
        }
        box.className = "iconfont icon-shoucang1";
      }
    },
    //点击Web
    Web() {
      Web.className += "  checked";
      All.className = "circle-button";
      Java.className = "circle-button";
      Golang.className = "circle-button";
      C.className = "circle-button";
      this.showList = this.passageList.filter(function (item) {
        return item.type == "Web";
      });
    },
    //点击Java
    Java() {
      Java.className += "  checked";
      All.className = "circle-button";
      Web.className = "circle-button";
      Golang.className = "circle-button";
      C.className = "circle-button";
      this.showList = this.passageList.filter(function (item) {
        return item.type == "Java";
      });
    },
    //点击Golang
    Golang() {
      Golang.className += "   checked";
      All.className = "circle-button";
      Java.className = "circle-button";
      Web.className = "circle-button";
      C.className = "circle-button";
      this.showList = this.passageList.filter(function (item) {
        return item.type == "Golang";
      });
    },
    //点击C
    C() {
      C.className += "   checked";
      All.className = "circle-button";
      Java.className = "circle-button";
      Golang.className = "circle-button";
      Web.className = "circle-button";
      this.showList = this.passageList.filter(function (item) {
        return item.type == "C";
      });
    },
    //点击All
    All() {
      All.className += "  checked";
      Web.className = "circle-button";
      Java.className = "circle-button";
      Golang.className = "circle-button";
      C.className = "circle-button";
      this.showList = this.passageList;
    },
    // 分页
    goPage(pno, psize) {
      setTimeout(() => {
        // 所有要展示的博客
        var itable = document.getElementsByClassName("passage");
        // 要展示的博客个数
        var num = itable.length;
        // 总页数
        var totalPage = 0;
        // 每页展示几个博客
        var pageSize = psize;
        document.getElementById("barcon").innerHTML = "";
        //总共分几页
        if (num / pageSize > parseInt(num / pageSize)) {
          totalPage = parseInt(num / pageSize) + 1;
        } else {
          totalPage = parseInt(num / pageSize);
        }
        var currentPage = pno; //当前页数
        var start = (currentPage - 1) * pageSize + 1; //开始显示的
        var end = currentPage * pageSize; //结束显示的
        end = end > num ? num : end;
        //遍历显示数据实现分页
        for (var i = 1; i < num + 1; i++) {
          var irow = itable[i - 1];
          if (i >= start && i <= end) {
            irow.style.display = "block";
          } else {
            irow.style.display = "none";
          }
        }
        var tempStr = "";
        if (currentPage > 1) {
          // tempStr += "<a href=\"#\" onClick=\"goPage("+(currentPage-1)+","+psize+")\"><上一页</a>"
          tempStr +=
            '<a href=javascript:; onClick="goPage(' +
            (currentPage - 1) +
            "," +
            psize +
            ')"><上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>';
          for (var j = 1; j <= totalPage; j++) {
            tempStr +=
              '<a href=javascript:; onClick="goPage(' +
              j +
              "," +
              psize +
              ')">' +
              j +
              "&nbsp;&nbsp;&nbsp;</a>";
          }
        } else {
          tempStr += "<上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
          for (var j = 1; j <= totalPage; j++) {
            tempStr +=
              '<a href=javascript:; onClick="goPage(' +
              j +
              "," +
              psize +
              ')">' +
              j +
              "&nbsp;&nbsp;&nbsp;</a>";
          }
        }
        if (currentPage < totalPage) {
          tempStr +=
            '<a href=javascript:; onClick="goPage(' +
            (currentPage + 1) +
            "," +
            psize +
            ')">下一页>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>';
        } else {
          tempStr += "  下一页>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        document.getElementById("barcon").innerHTML = tempStr;
      }, 50);
    },
    // 热门文章
    hot() {
      setTimeout(() => {
        var hot = document.getElementById("hot");
        for (let i = 0; i < this.passageList.length; i++) {
          if (this.passageList[i].great == null) {
            break;
          }
          if (this.passageList[i].great.split(",").length > 3) {
            var div = document.createElement("div");
            div.className = "wen";
            div.innerHTML =
              `<span  class="iconfont icon-remen " ></span>` +
              this.passageList[i].name;
            hot.appendChild(div);
          }
        }
      }, 500);
      setTimeout(() => {
        var wen = document.getElementsByClassName("wen");
        for (let i = 0; i < wen.length; i++) {
          wen[i].onclick = function () {
            location.href = location.href + "/" + encodeURI(wen[i].innerText);
          };
        }
      }, 600);
    },
    // 搜索
    search() {
      let fenlei = document.getElementsByClassName("checked")[0].value;
      if (this.searchcontent.trim() == "") {
        alert("输入为空哦！");
      } else {
        var reg = new RegExp(this.searchcontent);
        let regFenlei = new RegExp(fenlei);
        if (fenlei == "All") {
          this.showList = this.passageList.filter(function (item) {
            return reg.test(item.name) || reg.test(item.content);
          });
        } else {
          this.showList = this.passageList.filter(function (item) {
            return (
              regFenlei.test(item.type) &&
              (reg.test(item.name) || reg.test(item.content))
            );
          });
        }
        // 什么也没有搜到
        if (this.showList == "") {
          let neirong = document.getElementsByClassName("neirong")[0];
          var div = document.createElement("div");
          div.className += " kongpassage";
          div.innerHTML = `<div style="position: absolute; top: 40px;left:45%">什么也没有搜到哦~</div>`;
          document.getElementById("barcon").innerHTML = "";
          neirong.appendChild(div);
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
    // 到详情页
    detail(item, index) {
      let detail = "/" + this.txt + "/" + item.name;
      this.$router.push(String(detail));
    },
    // 动画小鱼
    littlefish() {
      var RENDERER = {
        POINT_INTERVAL: 5,
        FISH_COUNT: 3,
        MAX_INTERVAL_COUNT: 50,
        INIT_HEIGHT_RATE: 0.5,
        THRESHOLD: 50,

        init: function () {
          this.setParameters();
          this.reconstructMethods();
          this.setup();
          this.bindEvent();
          this.render();
        },
        setParameters: function () {
          this.$window = $(window);
          this.$container = $("#jsi-flying-fish-container");
          this.$canvas = $("<canvas />");
          this.context = this.$canvas
            .appendTo(this.$container)
            .get(0)
            .getContext("2d");
          this.points = [];
          this.fishes = [];
          this.watchIds = [];
        },
        createSurfacePoints: function () {
          var count = Math.round(this.width / this.POINT_INTERVAL);
          this.pointInterval = this.width / (count - 1);
          this.points.push(new SURFACE_POINT(this, 0));

          for (var i = 1; i < count; i++) {
            var point = new SURFACE_POINT(this, i * this.pointInterval),
              previous = this.points[i - 1];

            point.setPreviousPoint(previous);
            previous.setNextPoint(point);
            this.points.push(point);
          }
        },
        reconstructMethods: function () {
          this.watchWindowSize = this.watchWindowSize.bind(this);
          this.jdugeToStopResize = this.jdugeToStopResize.bind(this);
          this.startEpicenter = this.startEpicenter.bind(this);
          this.moveEpicenter = this.moveEpicenter.bind(this);
          this.reverseVertical = this.reverseVertical.bind(this);
          this.render = this.render.bind(this);
        },
        setup: function () {
          this.points.length = 0;
          this.fishes.length = 0;
          this.watchIds.length = 0;
          this.intervalCount = this.MAX_INTERVAL_COUNT;
          this.width = this.$container.width();
          this.height = this.$container.height();
          this.fishCount =
            (((this.FISH_COUNT * this.width) / 500) * this.height) / 500;
          this.$canvas.attr({ width: this.width, height: this.height });
          this.reverse = false;

          this.fishes.push(new FISH(this));
          this.createSurfacePoints();
        },
        watchWindowSize: function () {
          this.clearTimer();
          this.tmpWidth = this.$window.width();
          this.tmpHeight = this.$window.height();
          this.watchIds.push(
            setTimeout(this.jdugeToStopResize, this.WATCH_INTERVAL)
          );
        },
        clearTimer: function () {
          while (this.watchIds.length > 0) {
            clearTimeout(this.watchIds.pop());
          }
        },
        jdugeToStopResize: function () {
          var width = this.$window.width(),
            height = this.$window.height(),
            stopped = width == this.tmpWidth && height == this.tmpHeight;

          this.tmpWidth = width;
          this.tmpHeight = height;

          if (stopped) {
            this.setup();
          }
        },
        bindEvent: function () {
          this.$window.on("resize", this.watchWindowSize);
          this.$container.on("mouseenter", this.startEpicenter);
          this.$container.on("mousemove", this.moveEpicenter);
          this.$container.on("click", this.reverseVertical);
        },
        getAxis: function (event) {
          var offset = this.$container.offset();

          return {
            x: event.clientX - offset.left + this.$window.scrollLeft(),
            y: event.clientY - offset.top + this.$window.scrollTop(),
          };
        },
        startEpicenter: function (event) {
          this.axis = this.getAxis(event);
        },
        moveEpicenter: function (event) {
          var axis = this.getAxis(event);

          if (!this.axis) {
            this.axis = axis;
          }
          this.generateEpicenter(axis.x, axis.y, axis.y - this.axis.y);
          this.axis = axis;
        },
        generateEpicenter: function (x, y, velocity) {
          if (
            y < this.height / 2 - this.THRESHOLD ||
            y > this.height / 2 + this.THRESHOLD
          ) {
            return;
          }
          var index = Math.round(x / this.pointInterval);

          if (index < 0 || index >= this.points.length) {
            return;
          }
          this.points[index].interfere(y, velocity);
        },
        reverseVertical: function () {
          this.reverse = !this.reverse;

          for (var i = 0, count = this.fishes.length; i < count; i++) {
            this.fishes[i].reverseVertical();
          }
        },
        controlStatus: function () {
          for (var i = 0, count = this.points.length; i < count; i++) {
            this.points[i].updateSelf();
          }
          for (var i = 0, count = this.points.length; i < count; i++) {
            this.points[i].updateNeighbors();
          }
          if (this.fishes.length < this.fishCount) {
            if (--this.intervalCount == 0) {
              this.intervalCount = this.MAX_INTERVAL_COUNT;
              this.fishes.push(new FISH(this));
            }
          }
        },
        render: function () {
          requestAnimationFrame(this.render);
          this.controlStatus();
          this.context.clearRect(0, 0, this.width, this.height);
          this.context.fillStyle = "hsl(0, 5%, 95%)"; //颜色

          for (var i = 0, count = this.fishes.length; i < count; i++) {
            this.fishes[i].render(this.context);
          }
          this.context.save();
          this.context.globalCompositeOperation = "xor";
          this.context.beginPath();
          this.context.moveTo(0, this.reverse ? 0 : this.height);

          for (var i = 0, count = this.points.length; i < count; i++) {
            this.points[i].render(this.context);
          }
          this.context.lineTo(this.width, this.reverse ? 0 : this.height);
          this.context.closePath();
          this.context.fill();
          this.context.restore();
        },
      };
      var SURFACE_POINT = function (renderer, x) {
        this.renderer = renderer;
        this.x = x;
        this.init();
      };
      SURFACE_POINT.prototype = {
        SPRING_CONSTANT: 0.03,
        SPRING_FRICTION: 0.9,
        WAVE_SPREAD: 0.3,
        ACCELARATION_RATE: 0.01,

        init: function () {
          this.initHeight =
            this.renderer.height * this.renderer.INIT_HEIGHT_RATE;
          this.height = this.initHeight;
          this.fy = 0;
          this.force = { previous: 0, next: 0 };
        },
        setPreviousPoint: function (previous) {
          this.previous = previous;
        },
        setNextPoint: function (next) {
          this.next = next;
        },
        interfere: function (y, velocity) {
          this.fy =
            this.renderer.height *
            this.ACCELARATION_RATE *
            (this.renderer.height - this.height - y >= 0 ? -1 : 1) *
            Math.abs(velocity);
        },
        updateSelf: function () {
          this.fy += this.SPRING_CONSTANT * (this.initHeight - this.height);
          this.fy *= this.SPRING_FRICTION;
          this.height += this.fy;
        },
        updateNeighbors: function () {
          if (this.previous) {
            this.force.previous =
              this.WAVE_SPREAD * (this.height - this.previous.height);
          }
          if (this.next) {
            this.force.next =
              this.WAVE_SPREAD * (this.height - this.next.height);
          }
        },
        render: function (context) {
          if (this.previous) {
            this.previous.height += this.force.previous;
            this.previous.fy += this.force.previous;
          }
          if (this.next) {
            this.next.height += this.force.next;
            this.next.fy += this.force.next;
          }
          context.lineTo(this.x, this.renderer.height - this.height);
        },
      };
      var FISH = function (renderer) {
        this.renderer = renderer;
        this.init();
      };
      FISH.prototype = {
        GRAVITY: 0.4,

        init: function () {
          this.direction = Math.random() < 0.5;
          this.x = this.direction
            ? this.renderer.width + this.renderer.THRESHOLD
            : -this.renderer.THRESHOLD;
          this.previousY = this.y;
          this.vx = this.getRandomValue(4, 10) * (this.direction ? -1 : 1);

          if (this.renderer.reverse) {
            this.y = this.getRandomValue(
              (this.renderer.height * 1) / 10,
              (this.renderer.height * 4) / 10
            );
            this.vy = this.getRandomValue(2, 5);
            this.ay = this.getRandomValue(0.05, 0.2);
          } else {
            this.y = this.getRandomValue(
              (this.renderer.height * 6) / 10,
              (this.renderer.height * 9) / 10
            );
            this.vy = this.getRandomValue(-5, -2);
            this.ay = this.getRandomValue(-0.2, -0.05);
          }
          this.isOut = false;
          this.theta = 0;
          this.phi = 0;
        },
        getRandomValue: function (min, max) {
          return min + (max - min) * Math.random();
        },
        reverseVertical: function () {
          this.isOut = !this.isOut;
          this.ay *= -1;
        },
        controlStatus: function (context) {
          this.previousY = this.y;
          this.x += this.vx;
          this.y += this.vy;
          this.vy += this.ay;

          if (this.renderer.reverse) {
            if (
              this.y >
              this.renderer.height * this.renderer.INIT_HEIGHT_RATE
            ) {
              this.vy -= this.GRAVITY;
              this.isOut = true;
            } else {
              if (this.isOut) {
                this.ay = this.getRandomValue(0.05, 0.2);
              }
              this.isOut = false;
            }
          } else {
            if (
              this.y <
              this.renderer.height * this.renderer.INIT_HEIGHT_RATE
            ) {
              this.vy += this.GRAVITY;
              this.isOut = true;
            } else {
              if (this.isOut) {
                this.ay = this.getRandomValue(-0.2, -0.05);
              }
              this.isOut = false;
            }
          }
          if (!this.isOut) {
            this.theta += Math.PI / 20;
            this.theta %= Math.PI * 2;
            this.phi += Math.PI / 30;
            this.phi %= Math.PI * 2;
          }
          this.renderer.generateEpicenter(
            this.x + (this.direction ? -1 : 1) * this.renderer.THRESHOLD,
            this.y,
            this.y - this.previousY
          );

          if (
            (this.vx > 0 &&
              this.x > this.renderer.width + this.renderer.THRESHOLD) ||
            (this.vx < 0 && this.x < -this.renderer.THRESHOLD)
          ) {
            this.init();
          }
        },
        render: function (context) {
          context.save();
          context.translate(this.x, this.y);
          context.rotate(Math.PI + Math.atan2(this.vy, this.vx));
          context.scale(1, this.direction ? 1 : -1);
          context.beginPath();
          context.moveTo(-30, 0);
          context.bezierCurveTo(-20, 15, 15, 10, 40, 0);
          context.bezierCurveTo(15, -10, -20, -15, -30, 0);
          context.fill();

          context.save();
          context.translate(40, 0);
          context.scale(0.9 + 0.2 * Math.sin(this.theta), 1);
          context.beginPath();
          context.moveTo(0, 0);
          context.quadraticCurveTo(5, 10, 20, 8);
          context.quadraticCurveTo(12, 5, 10, 0);
          context.quadraticCurveTo(12, -5, 20, -8);
          context.quadraticCurveTo(5, -10, 0, 0);
          context.fill();
          context.restore();

          context.save();
          context.translate(-3, 0);
          context.rotate(
            (Math.PI / 3 + (Math.PI / 10) * Math.sin(this.phi)) *
              (this.renderer.reverse ? -1 : 1)
          );

          context.beginPath();

          if (this.renderer.reverse) {
            context.moveTo(5, 0);
            context.bezierCurveTo(10, 10, 10, 30, 0, 40);
            context.bezierCurveTo(-12, 25, -8, 10, 0, 0);
          } else {
            context.moveTo(-5, 0);
            context.bezierCurveTo(-10, -10, -10, -30, 0, -40);
            context.bezierCurveTo(12, -25, 8, -10, 0, 0);
          }
          context.closePath();
          context.fill();
          context.restore();
          context.restore();
          this.controlStatus(context);
        },
      };
      $(function () {
        RENDERER.init();
      });
    },
  },
  created() {
    // onclick 执行的是 window 环境中的方法，所以：将 this 中的方法关联到 window 上即可。
    window.goPage = this.goPage;
    window.Detail = this.Detail;
  },
};
</script>

<style scoped>
#jsi-flying-fish-container{
  height: 154px;
  width: 100%;
}
.content {
  width: 100%;
  height: 100px;
  text-align: center;
  display: table;
}
.title-con {
  margin-top: 70px;
  font-size: 20px;
  font-weight: bold;
}
.circle-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #bfa;
  margin: 50px;
  border: none;
  font-size: 18px;
}
.search-block {
  width: 300px;
  text-indent: 10px;
  height: 25px;
  outline: none;
}
.search-button {
  width: 100px;
  height: 30px;
  margin-left: 20px;
  margin-bottom: 50px;
}
.passage {
  margin-top: 30px;
  width: 70%;
  height: 500px;
  background-color: #f2f2f2;
  margin-left: 80px;
}
.kongpassage {
  margin-top: 30px;
  width: 70%;
  height: 100px;
  background-color: #f2f2f2;
  margin-left: 80px;
  position: relative;
}
.passage img {
  width: 400px;
  height: 200px;
  margin: 70px 0px auto;
}
.pass-title {
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
}
.pass-content {
  font-size: 16px;
  margin-top: 32px;
}
.details {
  margin-top: 60px;
  margin-left: -10px;
  height: 25px;
}
.passage .icon-dianzan_kuai {
  margin-left: 450px;
  margin-right: 10px;
}
.passage .iconfont {
  font-size: 20px;
}
.remen {
  float: right;
  width: 20%;
  /* height: 400px; */
  margin-top: 30px;
  line-height: 30px;
  text-align: left;
}
#name {
  text-indent: 20px;
  color: #949a9c;
}
.menu li {
  width: 120px;
  line-height: 35px;
  background-color: #a7a9ab;
  opacity: 0.9;
  border-radius: 15px;
  margin-bottom: 10px;
  position: relative;
  z-index: 1000;
}
.checked {
  background-color: rgb(69, 179, 199);
}
.passage {
  position: relative;
}
.checkbox1 {
  width: 25px;
  height: 25px;
  position: absolute;
  left: 660px;
  /* left: 50%; */
  top: 437px;
  opacity: 0;
  z-index: 2;
}
.checkbox2 {
  width: 25px;
  height: 25px;
  position: absolute;
  left: 690px;
  /* left: 85%; */
  top: 437px;
  opacity: 0;
  z-index: 2;
}
.checkbox1:hover,
.icon-dianzan_kuai:hover {
  cursor: pointer;
}
.checkbox2:hover,
.icon-shoucang1:hover {
  cursor: pointer;
}
.checkbox11 {
  color: red;
}
.checkbox22 {
  color: rgb(47, 255, 141);
}
.icon-dianzan_kuai {
  opacity: 0.35;
}
.icon-shoucang1 {
  opacity: 0.35;
}
a {
  text-decoration: none;
  color: #000;
}
#barcon {
  margin: 30px 400px;
  text-align: left;
}
.icon-remen {
  color: rgb(201, 30, 30) !important;
}
.wen {
  cursor: pointer;
}
</style>