<template>
    <div class="beijing">
        <div class="box1">
            <form action="">
                <div style="font-size: 16px; font-weight: bold;">用户注册</div>
                <span class="iconfont icon-dianhua"></span>
                <input type="text" name="" id="tel" placeholder="请输入您的电话(7-11位)">
                <span id="tel-warn"></span>
                <br>
                <span class="iconfont icon-yonghu"></span>
                <input type="text" placeholder="请输入您的昵称(1-10位)" id="name">
                <span id="name-warn"></span>
                <br>
                <span class="iconfont icon-mima"></span>
                <input type="password" placeholder="请输入您的密码(1-10位)" id="key">
                <span id="key-warn"></span>
                <br>
                <span class="iconfont icon-mima"></span>
                <input type="password" placeholder="请确认您的密码(1-10位)" id="key2">
                <span id="key2-warn"></span>
                <!-- <div id="myDiv">原数据</div> -->
                <input type="submit" value="注册" id="btn" >
                <input type="button" value="登录" id="login">
            </form>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

    <style scoped>
        .beijing{
            background: url(@/assets/images/fj1.jpg) center center / cover no-repeat #222;
			overflow: hidden;
			width: 100%;
			height: 100vh;
			max-height: 100vh;
			box-shadow: 0 1px 2px rgba(150, 150, 150, .7);
			text-align: center;
			display: table;
        }
        .box1{
            width: 250px;
            margin: 10% auto;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.445);
            line-height: 40px;
            opacity: .9;
            text-align: left;
            text-indent: 90px;
            box-shadow: 10px 10px 5px #3d2e2e;
            border-radius: 5px;
        }
        .box1 input{
            font-size: 10px;
            line-height: 20px;
            text-indent: 8px;
            outline: none;
            width: 200px;
            text-align: left;
            margin-left: 10px;
            border-radius: 5px;
            border: none;
        }
        #btn,#login{
            width: 80px;
            margin-left: 30px;
            text-indent: 20px;
            background-color: #DCE1E4;
            background-color: #607BAA;
            cursor: pointer;
            color:aliceblue;
        }
        #btn{
            background-color: #607BAA;
        }
        #login{
            background-color: #eccbbf;
            color: #000;
        }
        .iconfont{
            width: 20px;
        }
        @media (max-width: 640px){
            .box1{
            width: 250px;
            margin: 30% auto;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.445);
            line-height: 40px;
            opacity: .9;
            text-align: left;
            text-indent: 90px;
            box-shadow: 10px 10px 5px #3d2e2e;
            border-radius: 5px;
        }
        }
    </style>