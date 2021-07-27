<template>
<div class="board">
  <h1>/{{tag}}/ - {{name}}</h1>

  <hr>
  <center><b-button @click="formVisible = !formVisible">Создать новую тему</b-button></center>
  <b-modal v-model="formVisible"><Form v-bind:tag="tag" /></b-modal>
  <hr>

  <div class="board-topics">
    <Post v-for="post in topics" :key="post.id"
          :id="post.id"
          :poster="post.poster"
          :subject="post.subject"
          :message="post.message"
          :isThread="true"/>
  </div>
</div>
</template>

<script>
import service from '../service'
import { bus } from '../bus'
import Post from './Post.vue'
import Form from './Form.vue'

export default {
    name: 'Board',
    components: {
        Post, Form
    },
    data: function () {
        return {
            tag: null,
            name: '',
            topics: [],
            formVisible: false
        }
    },
    mounted: function () {
        var self = this

        bus.$on('form:success', function () {
            self.formVisible = false
            self.init()
        })
    },
    created: function () {
        this.tag = this.$route.params.tag;
        this.init();
    },
    methods: {
        init: function () {
            var self = this;

            service.getBoard(this.tag).then(
                (payload) => {
                    self.topics = payload.board_data.threads;
                    self.id = payload.board_data.id;
                    self.tag = payload.board_data.tag;
                    self.name = payload.board_data.name;
                },
                error => () => {
                    console.log(error);
                }
            );
        }
    },
    watch: {
        '$route': function (to, from) {
            if (to.path !== from.path) {
                this.tag = this.$route.params.tag;
                this.init();
            }
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 30px;
    text-align: center;
    margin-top: 15px;
}
</style>
