<template>
<div class="board">
  <h1>{{name}}</h1>

  <hr>
  <center><b-button @click="formVisible = !formVisible">Создать новую тему</b-button></center>
  <b-modal v-model="formVisible"><Form v-bind:tag="tag" /></b-modal>
  <hr>

  <b-pagination
    :total="count"
    :current="current"
    :per-page="perPage"
    v-model="current"
    v-on:change="init"
    rangeBefore="1"
    rangeAfter="1"
    order="is-centered"
    size="is-small">
  </b-pagination>

  <div class="board-topics">
    <Post v-for="post in topics" :key="post.id"
          :id="post.id"
          :poster="post.poster"
          :subject="post.subject"
          :message="post.truncated_message"
          :repliesCount="post.replies_count"
          :images="post.media.images"
          :youtubes="post.media.youtubes"
          :isVerify="post.is_verify"
          :isThread="true"/>
  </div>

  <b-pagination
    :total="count"
    :current="current"
    :per-page="perPage"
    v-model="current"
    v-on:change="init"
    rangeBefore="1"
    rangeAfter="1"
    order="is-centered"
    size="is-small">
  </b-pagination>
</div>
</template>

<script>
import { bus } from '../bus'
import Post from './Post.vue'
import Form from './Form.vue'

const axios = require('axios')
const config = require('../../config')

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
            formVisible: false,
            count: 0,
            current: 1,
            perPage: 20
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
            var offset = (this.current - 1) * this.perPage;

            axios.get(config.chan_url + '/board/' + this.tag, {
                params: {
                    offset: offset,
                    limit: this.perPage
                }
            }).then((response) => {
                self.count = response.data.payload.board_data.threads_count;
                self.topics = response.data.payload.board_data.threads;
                self.id = response.data.payload.board_data.id;
                self.tag = response.data.payload.board_data.tag;
                self.name = response.data.payload.board_data.name;
            }).catch((error) => {
                self.$buefy.toast.open('Произошла ошибка при запросе данных с сервера');
                console.log(error);
            })
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
    font-size: 20px;
    text-align: center;
    margin-top: 10px;
}

hr {
    margin: 1rem;
}
</style>
