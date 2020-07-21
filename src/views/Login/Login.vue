<template>
    <div id="Login">
        <div class="Login_wrap">
            <ul class="menu_tab">
                <li :class="{'current' : item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>
            <!--表单开始-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="LoginForm" class="Login_form">
                <el-form-item  prop="username" class="item_form">
                    <label for="username">邮箱</label>
                  <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password"  class="item_form">
                    <label for="password">密码</label>
                  <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item prop="passwords"  class="item_form" v-show="model === 'register'"> 
                    <label for="passwords">重复密码</label>
                  <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item  prop="code"  class="item_form">
                    <label for="code">验证码</label>
                    <el-row :gutter="9">
                        <el-col :span="15">
                            <el-input id="code" v-model ="ruleForm.code"  minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="get_btn" @click="GetSms" :disabled="codeButtonStatus">{{codeButtontext}}</el-button>
                        </el-col>
                      
                      </el-row>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="submitForm('LoginForm')" class="block" :disabled="LoginButtonStatus">{{model === 'Login' ? "登录" : "注册"}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  import {GetSms,Register,Login} from '@/api/Login.js';
  import { mapMutations } from 'vuex';
export default{
    name:'Login',
    data(){
      //验证用户名
      var validateusername = (rule, value, callback) => {
         let reg = /^[A-Za-z\d]+[A-Za-z\d\-_\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/;
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
          let reg = /^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/i;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('密码为6-20位数字+字母'));
        } else {
          callback();
        }
      };
     //验证重复密码
        var validatepasswords = (rule, value, callback) => {
            if(this.model === 'Login'){ callback();}
          let reg = /^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/i;
          value = this.ruleForm.passwords
        if (value === '') {
          callback(new Error('请再次输入重复密码'));
        } else if (value != this.ruleForm.password) {
          callback(new Error('与密码不符，请再次输入'));
        } else {
          callback();
        }
      };
      //验证码
      var validatecode = (rule, value, callback) => {
          let reg = /^[0-9A-Za-z]+$/;
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else if (!reg.test(value)) {
          callback(new Error('验证码格式有误'));
        } else {
          callback();
        }
      };
        return{
           menuTab:[
               {txt:'登录',current:true,type:'Login'},
               {txt:'注册',current:false,type:'register'}
           ],
           //登录按钮状态
           LoginButtonStatus:true,
           //验证码按钮状态
          codeButtonStatus:false,
          //验证码提示文字
          codeButtontext:'获取验证码',
          //倒计时
          timer:null,
           //表单数据
           ruleForm: {
                username: '',
                password: '',
                passwords: '',
                code: ''
            },
            //模式
            model:'Login',
            rules: {
                username: [
                { validator: validateusername, trigger: 'blur' }
                ],
                password: [
                { validator: validatepassword, trigger: 'blur' }
                ],
                passwords: [
                { validator: validatepasswords, trigger: 'blur' }
                ],
                code: [
                { validator: validatecode, trigger: 'blur' }
                ]
            }
           
        }
    },
    methods:{
        toggleMenu(data){
            console.log(data)
            this.menuTab.forEach(element => {
                element.current = false     // 循环一遍，预先清除样式
            });
            data.current = true
            // //修改模式
            this.model = data.type
            if(this.model === 'register'){
                this.ruleForm.value = '';
            }
            //重置表单
            this.$refs.LoginForm.resetFields();
            this.clearCountDown()
            
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.model === 'Login'){
                this.Login()
              }else{
                this.Register()
              }
            } else {
              console.log('error submit!!');
              return false;
            }
        });
      },
      GetSms(){
        //进行验证提示
        if(this.ruleForm.username == ''){
          this.$message.error('邮箱不能为空！！');
          return false
        }
        debugger
        let params = {
         username:this.ruleForm.username,
         module:this.model
        }
        GetSms(params).then( res => {
            this.LoginButtonStatus = false;
            this.codeButtonStatus = true;
            this.codeButtontext = '发送中'
            this.countDown(60)
            console.log(res)
        })
      },
      countDown(number){
        //setInterval条件满足即可停止
        let time = number
        //判断定时器是否存在 存在则清除
        if(this.timer){
          clearInterval(this.timer);
        }
        this.timer = setInterval( ()=> {
          time-- //倒计时开始
          if(time === 0){
            //清除定时器
            clearInterval(this.timer);
            this.codeButtonStatus = false;
            this.codeButtontext = '再次获取';
          }else{
            this.codeButtontext = '倒计时' + time + '秒';
          }
        },1000)
      },
      clearCountDown(){ //清除按钮倒计时
        this.codeButtonStatus = false;//还原按钮状态
        this.codeButtontext = '获取验证码';
        clearInterval(this.timer);
      },
      ...mapMutations(['SET_TOKEN']),
      ...mapMutations(['SET_USERNAME']),
      Login(){
        let params = {
          username:this.ruleForm.username,
          password:this.ruleForm.password,
          code:this.ruleForm.code
        }
        //登录接口
        Login(params).then( res=> {
          console.log(res)
          debugger
          this.$message.success('登录成功！')
          let token = JSON.stringify(res.data.token);
          let username = JSON.stringify(res.data.username);
          this.SET_TOKEN(token,JSON.parse(token));
          this.SET_USERNAME(username,JSON.parse(username))
          // this.$store.commit("SET_TOKEN", res.data.token);
          // this.$store.commit("SET_USERNAME",res.data.username);
          console.log(this.$store.state.token)
          //跳转Home
          this.$router.push('/Home')
        })
      },
      Register(){
        let params = {
          username:this.ruleForm.username,
          module:this.model,
          password:this.ruleForm.password,
          code:this.ruleForm.code
        }
        //注册接口
        Register(params).then( res=> {
          let data = res.data
          //this.$message.success(data.message)
          console.log(data)
          //跳转至登录，并清除倒计时
          this.toggleMenu(this.menuTab[0]);
          this.clearCountDown()
        })
      },
      mounted(){
            // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
            window.onbeforeunload = function (e) {
                var storage = window.localStorage;
                storage.clear()
            }
      }
    }
}
</script>

<style lang="scss" scoped>
body{
    margin: 0px;
    padding: 0px;
}
#Login{
    background-color: #334a5f;
    height: 100vh;
}
.Login_wrap{
    width: 330px;
    margin:  auto;
}
.menu_tab{
    text-align: center;
}
li {
    width: 88px;
    display: inline-block;
    line-height: 36px;
    font-size: 14px;
    color: white;
    border-radius: 2px;
    cursor: pointer;                  
    /* <!--鼠标指定变成手势--> */
}
.current{
    background-color: rgba(0,0,0,.1);
}
.Login_form{
    margin-top: 29px;
}
label{
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: white;
}
.item_form{
    margin-bottom: 13px;

}
.block{
    display: block;
    width: 100%;
    margin-top: 19px;
}
.get_btn{
    display: block;
    width: 100%;
}
</style>