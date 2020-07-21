<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../../assets/logo.png" />
      </div>
      <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item label-width="0px" prop="username">
          <el-input v-model="loginForm.username" class="login_input1"  prefix-icon="el-icon-user" minlength="5"></el-input>
        </el-form-item>
       <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" class="login_input"  prefix-icon="el-icon-lock" ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      //验证账号
      var validateusername = (rule, value, callback) => {
         let reg = /^[a-zA-Z0-9_-]{5,10}$/;
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(!reg.test(value)){
            callback(new Error('用户名格式有误'));
        } else{
            callback();
        }
      };
      //验证密码
      var validatepassword = (rule, value, callback) => {
         let reg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(!reg.test(value)){
            callback(new Error('密码格式有误'));
        } else{
            callback();
        }
      };
      return{
        //登陆表单的数据绑定对象
        loginForm:{
          username:'',
          password:''
        },
        //表单验证规则
        loginFormRules:{
          username:[
            {  trigger: 'blur' ,validator: validateusername,},
            { min: 5, max: 5, message: '账号必须大于或等于5位！', trigger: 'blur' }
            ],
          password:[
            {  trigger: 'blur' ,validator: validatepassword,},
            { min: 6, max: 15, message: '长度在 6 到 15 个字符！', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //点击注册按钮
      register:function(){
        this.$router.replace('/')
        //跳转至任意位置
      },
      login:function(){
        console.log(this.loginForm.password)
        this.$refs.loginFormRef.validate( valid => {
          if(!valid) return;
           //请求
           setTimeout( ()=> {//延时3秒
            var params = {
              username:this.loginFormRules.username,
              password:this.loginFormRules.password
            }
            var admin = 'admin';
            var password = 'admin123'
            if(this.loginFormRules.username != 'admin' && this.loginFormRules.password != password){
              this.$message.error('账号密码错误！')
            }
            login(params).then( res => {
                this.$message.success('登录成功')
                this.$router.replace('/') //跳转至任意界面
            })
          },3000)
          
        }) 
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login_container{
    background-color: #2b4b6b;
    height: 100vh;
  }

  .login_box{
    width: 480px;
    height: 400px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

  .avatar_box{
    width: 130px;
    height: 130px;
    border: 1px solid white;
    border-radius: 50%;
    box-shadow: 0px 0px 10px gray;
    position: absolute;
    left: 34%;
    margin-top: 10px;
    margin-bottom: 20px;
    /* transform: translate(-50%,-50%); */
  }
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: white;
  }
  .login_form{
    position: absolute;
    bottom: 40px;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
  .login_input{
    margin-top: 30px;
  }
</style>