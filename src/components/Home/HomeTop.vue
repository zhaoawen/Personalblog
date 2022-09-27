<template>
  <div id="blogTitle" class="head">
    <span id="list" class="iconfont icon-liebiao" @click="liebiao()"></span>
    <ul id="menu" class="menu">
      <li id="Admin_Login">
        <a href="http://127.0.0.1:3007/users/login">Admin_Login</a>
      </li>
      <li id="users"><a @click="Users_Login()">Users_Login</a></li>
      <li id="chalk"><a @click="Login_Chalk()">Login_Chalk</a></li>
      <li id="Register">
        <a href="http://127.0.0.1:3007/users/register">Register</a>
      </li>
      <li><a id="log_out" @click="log_out()">Log out</a></li>
    </ul>
    <div class="quto">既然选择了远方，便只顾风雨兼程</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HomeTop",
  mounted() {
    this.begin();
    this.littlesnow();
  },
  computed: {
    ...mapState(["userMessage"]),
    txt() {
      return this.userMessage.uname;
    },
    quanxian() {
      return this.userMessage.uquanxian;
    },
  },
  methods: {
    // 初始化判断用户权限
    begin() {
      setTimeout(() => {
        var users = document.getElementById("users");
        var Admin_Login = document.getElementById("Admin_Login");
        var Register = document.getElementById("Register");
        var log_out = document.getElementById("log_out");
        if (this.quanxian == "1") {
          users.style.display = "block";
          Admin_Login.style.display = "none";
          Register.style.display = "none";
        } else {
          users.style.display = "none";
          Admin_Login.style.display = "none";
          Register.style.display = "none";
        }
        var oname = document.getElementById("name");
        oname.innerText = this.txt;
      }, 500);
    },
    liebiao() {
      var list = document.getElementById("list");
      var menu = document.getElementById("menu");
      menu.style.visibility = "visible";
      list.style.display = "none";
      menu.style.transition = " max-height .5s ease";
    },
    log_out() {
      this.$router.push("/user/login");
      this.$store.state.userMessage = {};
    },
    Users_Login() {
      let str = "/" + this.txt + "/man";
      this.$router.push(str);
    },
    Login_Chalk() {
      this.$router.push('/chalk');
    },
    // 动画
    littlesnow() {
      // 小絮絮飞啊飞
      window.onload = function () {
        var scene,
          camera,
          renderer,
          container,
          aspect,
          fov,
          plane,
          far,
          mouseX,
          mouseY,
          windowHalfX,
          windowHalfY,
          geometry,
          starStuff,
          materialOptions,
          stars;
        init();
        animate();
        $("#showstar")
          .find("canvas")
          .attr(
            "style",
            "width:100%;height:105vh;position:absolute;top:0;left:0;z-index:1"
          );

        function animate() {
          requestAnimationFrame(animate);
          render();
        }

        function render() {
          camera.position.x += (mouseX - camera.position.x) * 0.005;
          camera.position.y += (-mouseY - camera.position.y) * 0.005;
          camera.lookAt(scene.position);
          renderer.render(scene, camera);
        }
        function starForge() {
          var amount = 45000;
          geometry = new THREE.SphereGeometry(1000, 100, 50);

          materialOptions = {
            color: new THREE.Color(0xffffff),
            size: 0.75, //絮絮的大小
            transparency: true,
            opacity: 0.8,
          };

          starStuff = new THREE.PointsMaterial(materialOptions);

          for (var i = 0; i < amount; i++) {
            var item = new THREE.Vector3();
            item.x = Math.random() * 2000 - 1000;
            item.y = Math.random() * 2000 - 1000;
            item.z = Math.random() * 2000 - 1000;

            geometry.vertices.push(item);
          }

          stars = new THREE.PointCloud(geometry, starStuff);
          scene.add(stars);
        }

        function onMouseMove(e) {
          mouseX = e.clientX - windowHalfX;
          mouseY = e.clientY - windowHalfY;
        }
        function init() {
          container = document.createElement(`div`);
          container.setAttribute("id", "showstar");
          document.body.appendChild(container);
          mouseX = 0;
          mouseY = 0;

          aspect = window.innerWidth / window.innerHeight;
          fov = 40;
          plane = 1;
          far = 800;

          windowHalfX = window.innerWidth / 2;
          windowHalfY = window.innerHeight / 2;

          camera = new THREE.PerspectiveCamera(fov, aspect, plane, far);

          camera.position.z = far / 2;

          scene = new THREE.Scene({ antialias: true });
          scene.fog = new THREE.FogExp2(0x1b1b1b, 0.0001);

          starForge();

          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setPixelRatio(
            window.devicePixelRatio ? window.devicePixelRatio : 1
          );
          renderer.setSize(
            window.innerWidth,
            parseFloat($("#blogTitle").css("height"))
          );
          renderer.autoClear = false;
          renderer.setClearColor(0x000000, 0.0);
          container.appendChild(renderer.domElement);

          document.addEventListener("mousemove", onMouseMove, false);
        }
      };
    },
  },
};
</script>

<style scoped>
a:hover {
  cursor: pointer;
}
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
.head {
  background: url(@/assets/images/好看.jpg) center center / cover no-repeat #222;
  overflow: hidden;
  width: 100%;
  height: 103vh;
  max-height: 103vh;
  box-shadow: 0 1px 2px rgba(150, 150, 150, 0.7);
  text-align: center;
  display: table;
}
.head .icon-liebiao {
  display: block;
  line-height: 100px;
  font-size: 30px;
  margin: 20px;
  margin-right: 80px;
  color: white;
  float: right;
  cursor: pointer;
  position: relative;
  z-index: 1000;
  /* display: none; */
  /* visibility: hidden; */
}
#menu {
  height: 100px;
  color: ghostwhite;
  margin-top: 50px;
  margin-left: 85%;
  /* display: none; */
  visibility: hidden;
}
#list {
  position: relative;
}
.quto {
  color: azure;
  font-size: 30px;
  font-family: cursive;
  font-weight: bolder;
  margin-top: 15%;
}
#menu {
  margin-top: 50px;
  margin-left: 70%;
}
.menu li {
  width: 120px;
  line-height: 35px;
  background-color: #a7a9ab;
  opacity: 0.9;
  border-radius: 15px;
  margin-bottom: 10px;
  position: relative;
  left: 190px;
  z-index: 1000;
}
</style>