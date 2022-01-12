<template>
  <div class="login">
    <div class="form">
      <div class="title">潇湘-飞魂后台登入</div>
      <div class="item">
        <el-input
                placeholder="请输入用户名"
                v-model="user"
                prefix-icon="el-icon-user"
                clearable>
        </el-input>
      </div>
      <div class="item">
        <el-input
                placeholder="请输入密码"
                v-model="password"
                prefix-icon="el-icon-lock"
                show-password>
        </el-input>
      </div>
      <div class="item">
        <el-button type="primary" v-on:click="doSubmit">登入</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    components: {
    },
    data: function () {
      return {
        user: 'admin',
        password: '123456'
      }
    },
    methods: {
      doSubmit(){
        console.log('zyx', this.user, this.password);
        if(this.user.trim() == ''){
          this.$notify({
            title: '警告',
            message: '用户名不能为空',
            type: 'warning'
          });
          return false;
        }
        if(this.password.trim() == ''){
          this.$notify({
            title: '警告',
            message: '密码不能为空',
            type: 'warning'
          });
          return false;
        }
        this.$rq.post('/login',{
          user: this.user,
          password: this.password
        }).then((res) => {
          console.log('res', res.data);
          if(res.data && res.data.res){
            this.$store.dispatch('setToken', res.data.token);
            this.$router.push('/');
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../assets/login.png");
    background-size: cover;
    .form{
      height: 400px;
      width: 600px;
      background: rgba(0,0,0,.5);
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      flex-direction: column;
      .title{
        font-size: 22px;
        font-weight: bolder;
      }
      .item{
        margin-top: 30px;
        width: 55%;
        button{
          width: 100%;
          font-weight: bolder;
          height: 50px;
          font-size: 18px;
          letter-spacing: 10px;
        }
      }
    }
  }
</style>
