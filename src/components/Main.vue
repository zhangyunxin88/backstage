<template>
  <div class="main">
    <div class="left">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item class="menuTitle">
          <span slot="title">潇湘-飞魂的微博</span>
        </el-menu-item>
        <el-menu-item index="1">
          <i class="el-icon-document"></i>
          <span slot="title">动漫推荐</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-setting"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="top">
        <div class="navbar-left">
          <div class="collapse-action">
            <i class="el-icon-s-fold" v-if="!isCollapse" v-on:click="isCollapse = true"></i>
            <i class="el-icon-s-unfold" v-if="isCollapse" v-on:click="isCollapse = false"></i>
          </div>
          <div class="menu-title">
            动漫推荐
          </div>
        </div>
        <div class="navbar-right">
          <el-button type="danger" icon="el-icon-switch-button" circle></el-button>
        </div>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {
  },
  data: function () {
    return {
      isCollapse: false
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .main{
    height: 100%;
    display: flex;
    flex-grow: 1;
    background: #efefef;
    .left{
      height: 100%;
      .el-menu-vertical-demo{
        height: 100%;
        background: #333;
        border-right: 0px;
        .el-menu-item{
          color: white;
          i{
            color: white;
          }
          &:hover{
            background: #409eff;
          }
        }
        .is-active{
          background: #409eff;
        }
        .menuTitle{
          display: flex;
          justify-content: center;
          font-size: 18px;
          font-weight: bolder;
          font-style: italic;
          &:hover{
            background: #333;
          }
        }
      }
    }
    .right{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      .top{
        min-height: 56px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .navbar-left{
          display: flex;
          align-items: center;
          .collapse-action{
            margin-left: 20px;
            font-size: 26px;
            color: #878787;
            i{
              cursor: pointer;
            }
          }
          .menu-title{
            margin-left: 20px;
            color: #888;
          }
        }
        .navbar-right{
          margin-right: 20px;
        }
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
