<template>
<div class="thread">
  <div class="toggle-form" @click="isFormVisible = !isFormVisible">Ответить в тред</div>
  <Form v-if="isFormVisible" v-bind:parent_id="opPost.id" />

  <Post :id="opPost.id"
        :poster="opPost.poster"
        :subject="opPost.subject"
        :message="opPost.message"
        :parentId="opPost.parent_id"
        :isThread="true"/>

  <Post class="post-reply"
        v-for="post in replies" :key="post.id"
        :id="post.id"
        :poster="post.poster"
        :subject="post.subject"
        :message="post.message"
        :parentId="post.parent_id"/>
</div>
</template>

<script>
import Form from './Form.vue'
import Post from './Post.vue'
import service from '../service'

export default {
    name: 'Thread',
    components: {
        Post, Form
    },
    methods: {
        replyPost: function (id) {
            console.log(id);
        },
        init: function () {
            var self = this;

            service.getThread(this.id).then(
                (payload) => {
                    if (payload.thread_data.parent_id !== null) {
                        self.id = payload.thread_data.parent_id;
                        self.init();
                    }

                    self.opPost = {
                        id: payload.thread_data.id,
                        poster: payload.thread_data.poster,
                        subject: payload.thread_data.subject,
                        message: payload.thread_data.message
                    };

                    self.replies = payload.thread_data.replies;
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        scrollToPost: function () {
            var section = this.$router.currentRoute.hash.replace('#', '')

            if (section) {
                var el = window.document.getElementById(section);
                this.$nextTick(() => el.scrollIntoView())
                el.classList.add('post-active');
            }
        }
    },
    created: function () {
        this.id = this.$route.params.id;
        this.init();
    },
    mounted: function () {
        setTimeout(() => {
            this.scrollToPost();
        }, 1000)
    },
    watch:  {
        '$route': function (to, from) {
            if (to !== from) this.scrollToPost();
        }
    },
    data: function () {
        return {
            id: false,
            opPost: false,
            replies: [],
            isFormVisible: false
        }
    }
}
</script>

<style scoped>
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
