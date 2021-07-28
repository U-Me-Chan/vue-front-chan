<template>
<div class="thread" ref="thread-top" id="thread-top">
  <h3>{{opPost.subject ? opPost.subject : '...'}}</h3>
  <hr>

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
import Post from './Post.vue'
import service from '../service'
import { bus } from '../bus'

export default {
    name: 'Thread',
    components: {
        Post
    },
    methods: {
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
        scrollTo: function (section, type) {
            var el = window.document.getElementById(section);

            this.$nextTick(() => el.scrollIntoView())

            if (type == 'post') {
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
            var section = this.$router.currentRoute.hash.replace('#', '');

            if (section) {
                this.scrollTo(section, 'post');
            } else {
                this.scrollTo('thread-top');
            }
        }, 1500);

        // TODO: подобные вещи необходимо отменять после ухода со страницы, и обновлять данные в стор
        // setInterval(() => {
        //     this.$buefy.toast.open('Обновляю тред...');
        //     this.init();
        // }, 30000);

        var self = this;

        // FIXME: use vues, Luke
        bus.$on('form:success', () => self.init());
    },
    watch:  {
        '$route': function (to, from) {
            if (to !== from) {
                this.id = this.$route.params.id;
                this.init();

                var section = this.$router.currentRoute.hash.replace('#', '');

                if (section) {
                    setTimeout(() => {
                        this.scrollTo(section, 'post');
                    }, 1500);
                }
            }
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

h3 {
    font-size: 20px;
    text-align: center;
    margin-top: 10px;
}
</style>
