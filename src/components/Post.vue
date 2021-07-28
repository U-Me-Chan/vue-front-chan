<template>
<div class="box" :id="id" :ref="id">
  <b-tag size="is-medium" type="is-success is-light">{{ poster }}</b-tag>
  <b-tag size="is-medium" type="is-info is-light" v-if="subject">{{subject}}</b-tag>
  <b-tag size="is-medium" type="is-light">#{{ !parentId ? id : parentId + '/' + id }}</b-tag>
  <b-button type="is-text" size="is-small" @click="selectThread(id)">Открыть</b-button>
  <b-button type="is-text" size="is-small" @click="isFormVisible = !isFormVisible">Ответить</b-button>
  <b-modal v-model="isFormVisible">
    <Form v-if="isFormVisible"
          v-bind:parent_id="!parentId ? id : parentId"
          v-bind:message="`>>${id}\n`"/>
  </b-modal>
  <vue-markdown class="post-message"
                :typographer=true
                :html=true
                :toc=false
                :source=filterMessage
                :prerender="prerender"></vue-markdown>
</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Form from './Form.vue'
import { bus } from '../bus'

export default {
    components: {
        VueMarkdown, Form
    },
    name: 'Post',
    data: function () {
        return {
            isFormVisible: false
        }
    },
    props: {
        id: [String,Number],
        poster: String,
        subject: {
            type: String,
            default: '...'
        },
        message: {
            type: String,
            default: ''
        },
        parentId: String,
        isThread: {
            type: Boolean,
            default: false,
        },
        isFeedParent: {
            type: Boolean,
            default: false
        }
    },
    mounted: function () {
        bus.$on('form:success', () => this.isFormVisible = false);
    },
    computed: {
        filterMessage: function () {
            return this.message.replace(/<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>/gmi, '')
                .replace(/ш/gmi, 'ì̷͕̠͗͌i̴̘̎į̸̬͎̀̈́̈́');
                
        }
    },
    methods: {
        selectThread: function (id) {
            if (this.parentId) {
                this.$router.push('/thread/' + this.parentId + '#' + id);
            } else {
                this.$router.push('/thread/' + id);
            }
        },
        prerender: function (message) {
            const reply = />>\d{1,10}/g;
            const image = /(?!\\!\[[a-z]+\]\()(?<!['|"])((?<twilink>https:\/\/pbs\.twimg\.com\/media\/[a-z0-9?=&]+)|(?<link>https?:\/\/[a-z.\0-9-_]+\.(?<ext>jpg|jpeg?|gif|png)(?<params>\?[a-z=&0-9]+)?))(?<!['|"])$(?!\))/gmi;
            const audio = /(https?):\/\/[a-z./0-9-_]+(\.(ogg|mp3)$)/gmi;
            const youtube = /(https:\/\/www\.youtube\.com\/watch\?v=([0-9a-z_-]+)|https:\/\/youtu\.be\/([0-9a-z_-]+))/mi;

            return message.replace(reply, match => {
                return `<a href='#${match.slice('>>'.length)}'>${match}</a>`;
            }).replace(youtube, (match, p1, p2, p3) => {
                var id = p2 == null ? p3 : p2;

                return `<br>${match}<br><br><img class= 'yt-preview' src='http://i1.ytimg.com/vi/${id}/hqdefault.jpg' alt='preview'><br>`;
            }).replace(image, match => {
                return `<br><a href='${match}' target='_blank'><img src='${match}' alt='[image]' class='image is-128-128'></a><br>`;
            }).replace(audio, match => {
                return `<br><audio controls=true src='${match}'><br>`;
            });
        }
    }
}
</script>

<style>
.post-message {
    margin: 30px;
}

.post-active {
    border: 2px solid #888;
}

img {
    margin-right: 30%;
}

blockquote {
    margin-left: 0px;
    border-left: 8px solid #ddd;
    padding-left: 16px;
    color: #083;
}

code {
    background-color: #777;
    color: #000;
    font-size: 15px;
}

img {
    max-width: 100%;
    height: 360px;
    width: auto;
}

.yt-preview {
    height: 360px;
}

.tag {
    margin-right: 10px;
}
</style>
