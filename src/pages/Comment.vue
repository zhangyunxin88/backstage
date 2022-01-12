<template>
  <div class="comment">
    <div>
      <el-table
              :data="comment"
              stripe
              border>
        <el-table-column
                prop="name"
                label="昵称"
                width="100">
        </el-table-column>
        <el-table-column
                label="头像"
                width="150">
          <template slot-scope="scope">
            <img v-bind:src="scope.row.avartar" />
          </template>
        </el-table-column>
        <el-table-column
                prop="description"
                label="格言"
                width="400">
        </el-table-column>
        <el-table-column
                prop="message"
                label="评论">
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="100">
          <template slot-scope="scope">
            <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>-->
            <i class="el-icon-edit" @click="handleClick(scope.row)"></i>
            <i class="el-icon-delete" v-on:click="showDeleteCommentDialog(scope.row)" style="margin-left: 10px"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
            title="评论修改"
            :visible.sync="isShowDialog"
            width="70%"
            center>
      <div class="dialog-content">
        <div class="dialog-item">
          <div class="item-left">昵称：</div>
          <div class="item-right">
            {{ name }}
          </div>
        </div>
        <div class="dialog-item">
          <div class="item-left">头像：</div>
          <div class="item-right">
            <img v-bind:src="avartar"/>{{avartar}}
          </div>
        </div>
        <div class="dialog-item">
          <div class="item-left">评论：</div>
          <div class="item-right">
            <el-input v-model="message" placeholder="评论"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="modifyComment">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
            title="评论修改"
            :visible.sync="isShowDeleteDialog"
            width="30%"
            center>
      <div class="dialog-content">
        是否删除这条评论？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDeleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteComment">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Comment',
  components: {
  },
  data: function(){
    return {
      comment: [],
      isShowDialog: false,
      isShowDeleteDialog: false,
      avartar: '',
      name: '',
      message: '',
      id: '',
      deleteId: ''
    }
  },
  mounted() {
    this.getCommentList();
  },
  methods: {
    getCommentList(){
      this.$rq.get('/admin/commentList').then((res) => {
        if(res.data && res.data.data){
          this.comment = res.data.data;
        }
        this.comment.forEach((item) => {
          item.avartar = this.$imgUrl + item.avartar;
        })
        console.log('comment', this.comment);
      })
    },
    handleClick(rowData){
      this.isShowDialog = true;
      this.avartar = rowData.avartar;
      this.name = rowData.name;
      this.message = rowData.message;
      this.id = rowData.id;
    },

    showDeleteCommentDialog(rowData){
      this.deleteId = rowData.id;
      this.isShowDeleteDialog = true;
    },

    deleteComment(){
      this.$rq.post('/admin/deleteComment', {
        id: this.deleteId,
      }).then((res) => {
        console.log('res', res);
        if(res.data.res){
          this.$notify({
            title: '成功',
            message: '评论删除成功',
            type: 'success'
          });
          this.isShowDeleteDialog = false;
          this.getCommentList();
        }else {
          this.$notify.error({
            title: '错误',
            message: '评论删除失败，请重新提交'
          });
        }
      }).catch(()=> {
        this.$notify.error({
          title: '错误',
          message: '评论删除失败，请重新提交'
        });
      })
    },

    modifyComment(){
      this.$rq.post('/admin/modifyComment', {
        id: this.id,
        message: this.message
      }).then((res) => {
        console.log('res', res);
        this.$notify({
          title: '成功',
          message: '评论修改成功',
          type: 'success'
        });
        this.getCommentList();
        this.isShowDialog = false;
      }).catch(() => {
        this.$notify.error({
          title: '错误',
          message: '评论修改失败，请重新提交'
        });
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .comment{
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
                width: 100px;
                height: 100px;
                border-radius: 50%;
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
                img{
                  width: 150px;
                  height: 150px;
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
