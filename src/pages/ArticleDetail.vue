<template>
  <div class="articleDetail">
    <div class="top">
      <el-input placeholder="请输入标题" v-model="title">
        <template slot="prepend">标题</template>
      </el-input>
    </div>
    <div class="content">
      <div class="left">
        <v-md-editor v-model="article.value"
                     @change="getChange"
                    left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code emoji tip | customToolbar1 save"
                    :toolbar="toolbar"></v-md-editor>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArticleDetail',
    components: {},
    data: function () {
      return {
        title: '',
        article: {},
        toolbar: {
          customToolbar1: {
            title: "插入B站视频",
            icon: "v-md-icon-tip",
            action(editor) {
              editor.insert(function (selected) {
                console.log(selected);
                const prefix = "!";
                const suffix = "[blibli]";
                const placeholder = "请输入视频地址";
                const content = selected || placeholder;
                return {
                  text: `${prefix}${content}${suffix}`,
                  selected: content,
                };
              });
            },
          },
        },
      }
    },
    mounted() {
      this.getArticleDetail();
    },
    methods: {
      getArticleDetail(){
        this.$rq.get('/admin/articleDetail?id=30')
        .then((res) => {
          if(res.data && res.data.data && res.data.data[0]){
            this.article = res.data.data[0];
          }
          console.log('res', this.article);
        })
      },
      getChange(md, html) {
        this.content.value = md;
        this.content.content = html;
      },
    }
  }
</script>

<style scoped lang="scss">
  .articleDetail{
    flex-grow: 1;
    margin: 10px;
    background: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    .content{
      display: flex;
      margin-top: 20px;
      flex-grow: 1;
      .left{
        display: flex;
        flex-grow: 1;
        .v-md-editor{
          flex-grow: 1;
        }
      }
      .right{
        min-width: 300px;
      }
    }
  }
</style>
