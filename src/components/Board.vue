<template>
<div class="board">
  <div class="toggle-form" @click="formVisible = !formVisible">Создать новую тему</div>
  <Form v-if="formVisible" v-bind:tag="tag" />

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
import service from '../service';
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
h3 {
    color: #a50;
}

.toggle-form {
    cursor: pointer;
    font-weight: bold;
    padding: 5px;
    background-color: #333;
    text-align: center;
    width: 95%;
    border: 1px #444 solid;
}

.toggle-form:hover {
    color: #aaa;
}
</style>
