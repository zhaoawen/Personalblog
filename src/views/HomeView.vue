<template>
    <HomeTop />
    <HomeClassify />
</template>

<script>
import * as THREE from 'three'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import $ from 'jquery';
import HomeTop from '@/components/Home/HomeTop.vue'
import HomeClassify from '@/components/Home/HomeClassify.vue'
window.jQuery = $;
window.$ = $;
// import $ from 'jquery'
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    HomeTop,
    HomeClassify
  },
  mounted() {
    
  },
  methods: {

  },
}
</script>
<style lang="css" >
.icon-remen {
  color: rgb(201, 30, 30) !important;
}
.wen {
  cursor: pointer;
}
  /* body {
  padding: 50px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

a {
  color: #00B7FF;
} */
*{
  margin: 0;
  padding: 0;
}
li{
list-style: none;  
}
.clearfix::before,.clearfix::after{
  content: '';
  display: table;
  clear: both;
} 


#jsi-flying-fish-container{
  height: 154px;
  width: 1280px;
}
.content{
  /* overflow: hidden; */
}
.addd{
  animation: change 1s 1;
  animation-fill-mode: forwards;
}
.add1{
  animation: change1 3s  1 ;
  animation-fill-mode: forwards;
}
/* @keyframes change{
  0%{
      height: 0px;
  }
  50%{
      height: 150px;
  }
  100%{
      height: 300px;
  }
} */

/* @keyframes change1{
  0%{
      height: 300px;
  }
  10%{
      height: 10%;
  }
  30%{
      height: 30%;
  }
  50%{
      height:50%;
  }
  80%{
      height: 80%;
  }
  100%{
      height:100%;
  }
} */

@media (max-width: 640px){
  .head{
    height: 50vh;
  }
  .head .icon-liebiao{
    font-size: 20px;
    margin: 0px;
    margin-right: 15px;
  }
  .quto{
    font-size: 18px;
    margin-top: 0%;
  }
  .title-con{
    margin-top: 15px;
    font-size: 10px;
  }
  .circle-button{
    width: 60px;
    height: 50px;
    margin: 10px;
    font-size: 10px;
  }
  #showstar{
    display: none;
  }
  .search-button{
    width: 50px;
    margin-left: 5px;
    margin-bottom: 20px;
  }
  .search-block{
    width: 200px;
  }
  .passage{
    margin-top: 30px;
    width: 60%;
    /* height: 250px; */
    height: 100%;
    margin-left: 10px;
  }
  .passage img{
    width: 100px;
    height: 50px;
    margin: 10px 0px auto;
  }
  .pass-title{
    font-size: 15px;
    margin-top: 15px;
  }
  .pass-content{
    font-size: 10px;
    margin-top: 16px;
    width: 170px;
    padding: 10px;
  }
  .details{
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: -0px;
    height: 25px;
  }
  .passage .icon-dianzan_kuai{
    margin-left: 70px;
    margin-right: 10px;
  }
  .passage .iconfont{
    font-size: 20px;
  }
  .remen{
    width: 30%;
  }
  .wen{
    font-size: 8px;
  }
  #barcon{
    margin: 20px 40px;
    text-align: left;
  }
  #menu{
    margin-top:50px;
    margin-left: 70% ;
  }
  .menu li{
    width: 70px;
    line-height: 35px;
    background-color: #A7A9AB;
    opacity: .9;
    border-radius:15px ;
    margin-bottom: 10px;
    position: relative;
    z-index: 1000;
  }
  .checkbox1{
    width: 25px;
    height: 25px;
    position: absolute;
    left: 125px;
    /* left: 50%; */
    top: 215px;
    opacity: 0;
    z-index: 2;
  }
  .checkbox2{
    width: 25px;
    height: 25px;
    position: absolute;
    left: 160px;
    /* left: 85%; */
    top: 215px;
    opacity: 0;
    z-index: 2;
  }
}
/* @keyframes change1{
  0%{
      height: 300px;
  }
  10%{
      height: 400px;
  }
  20%{
      height:674px ;
  }
  30%{
      height: 861px;
  }
  40%{
      height: 1048px;
  }
  50%{
      height: 1235px;
  }
  60%{
      height: 1422px;
  }
  70%{
      height: 1609px;
  }
  80%{
      height: 1796px;
  }
  90%{
      height: 1983px;
  }
  100%{
      height:2170px;
  }
} */
/* 适配 */
/* @media (min-width:0px )and (max-width:1210px) {
  .content{
      width: 1170px!important;
  }
} */
</style>