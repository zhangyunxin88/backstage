<template>
  <div class="home">
    <div>
      <el-table
              :data="cartoon"
              stripe
              border>
        <el-table-column
                prop="order"
                label="排名"
                width="60">
        </el-table-column>
        <el-table-column
                label="图片"
                width="150">
          <template slot-scope="scope">
            <img v-bind:src="scope.row.pic" />
          </template>
        </el-table-column>
        <el-table-column
                prop="title"
                label="名称"
                width="400">
        </el-table-column>
        <el-table-column
                prop="url"
                label="地址">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="100">
          <template slot-scope="scope">
            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>-->
            <i class="el-icon-edit" @click="handleClick(scope.row)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
            v-bind:title="title + '修改'"
            :visible.sync="isShowDialog"
            width="70%"
            center>
      <div class="dialog-content">
        <div class="dialog-item">
          <div class="item-left">动漫标题：</div>
          <div class="item-right">
            <el-input v-model="title" placeholder="动漫标题"></el-input>
          </div>
        </div>
        <div class="dialog-item">
          <div class="item-left">图片：</div>
          <div class="item-right">
            <img v-bind:src="pic" id="pic"/>
            <input type="file" name="image" v-on:change="fileUpload" id="file" ref="fileBtn"/>
            <el-button type="primary" v-on:click="doUploadFile">图片上传</el-button>
          </div>
        </div>
        <div class="dialog-item">
          <div class="item-left">地址：</div>
          <div class="item-right">
            <el-input v-model="url" placeholder="动漫标题"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="doConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import $ from 'jquery'

export default {
  name: 'Home',
  components: {
  },
  data: function(){
    return {
      cartoon: [],
      isShowDialog: false,
      pic: '',
      title: '',
      url: '',
      id: ''
    }
  },
  mounted() {
    this.getCartoon();
  },
  methods: {
    getCartoon(){
      this.$rq.get('/admin/cartoon').then((res) => {
        if(res.data && res.data.data){
          this.cartoon = res.data.data;
        }
        this.cartoon.forEach((item, index) => {
          item.order = index + 1;
        })
        console.log('cartoon', this.cartoon);
      })
    },

    handleClick(rowData){
      this.isShowDialog = true;
      console.log(rowData);
      this.pic = rowData.pic;
      this.title = rowData.title;
      this.url = rowData.url;
      this.id = rowData.id;
    },

    doConfirm(){
      this.$rq.post('admin/modifyCartoon',{
        id: this.id,
        pic: this.pic,
        title: this.title,
        url: this.url
      }).then((res) => {
        console.log('res', res);
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        });
        this.isShowDialog = false;
        this.getCartoon();
      })
      .catch(() => {
        this.$notify({
          title: '错误',
          message: '修改失败，请重新提交',
          type: 'success'
        });
      })
    },

    doUploadFile(){
      $('#file').click();
    },

    fileUpload(){
      let name = $($('#file')).val();
      let files = $($('#file'))[0].files[0];
      let formData = new FormData();
      formData.append("file", files);
      formData.append("name", name);
      if(!files.name || !/(.png|.jpg|.gif)$/.test(files.name)){
        //alert('文件格式不对');
        this.$notify.error({
          title: '错误',
          message: '文件格式不对，请传png，jpg或gif格式的图片'
        });
        this.$refs['fileBtn'].value = '';
        return false;
      }
      let that = this;
      $.ajax({
        url: that.$baseUrl + 'admin/uploadFile',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        beforeSend: function(request){
          request.setRequestHeader("Authorization", that.$store.state.token);
        },
        success:function (res) {
          console.log('zyx', res);
          if(res.res){
            that.pic = that.$imgUrl + res.file_name;
            document.getElementById('pic').src = that.pic;
            that.$refs['fileBtn'].value = '';
            that.$notify({
              title: '成功',
              message: '图片上传成功',
              type: 'success'
            });
          }else {
            that.$notify.error({
              title: '错误',
              message: '图片上传失败'
            });
            that.$refs['fileBtn'].value = '';
          }
        }
        ,error:function () {
          that.$notify.error({
            title: '错误',
            message: '图片上传失败'
          });
          that.$refs['fileBtn'].value = '';
        }
      });
      console.log(name, files);
    }
  }
}
</script>

<style scoped lang="scss">
  .home{
    flex-grow: 1;
    background: white;
    margin: 10px;
    overflow: scroll;
    >div{
      margin: 10px;
      ::v-deep .el-table__header-wrapper{
        table{
          tr{
            th{
              text-align: center;
            }
          }
        }
      }
      ::v-deep .el-table{
        table{
          tr{
            td{
              text-align: center;
              img{
                width: 120px;
              }
              i{
                font-size: 22px;
                cursor: pointer;
              }
            }
          }
        }
      }
      ::v-deep .el-table__fixed-right{
        tr{
          th{
            text-align: center;
          }
        }
      }
      ::v-deep .el-dialog{
        .el-dialog__header{
          .el-dialog__title{
            /*overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            width: 380px;
            display: block;*/
          }
        }
        .el-dialog__body{
          .dialog-content{
            .dialog-item{
              display: flex;
              align-items: center;
              width: 100%;
              margin-top: 20px;
              .item-left{
                font-size: 16px;
                margin-right: 10px;
                width: 100px;
              }
              .item-right{
                flex-grow: 1;
                display: flex;
                align-items: center;
                img{
                  width: 300px;
                }
                #file{
                  display: none;
                }
                button{
                  margin-left: 30px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
