<template>
<table class="post" @click="selectThread(id)" :id="id" :ref="id">
  <tr class="post-header">
    <label class="post-data">
      <span class="post-number">#{{ !parentId ? id : parentId + '/' + id }}</span>
      <span class="post-author">{{ poster }}</span>
      <span class="post-subject">{{ !subject ? '...' : subject }}</span>
    </label>
  </tr>
  <tr>
    <vue-markdown class="post-message"
                  :typographer=true
                  :html=true
                  :toc=false
                  :source=filterMessage
                  :prerender="prerender"></vue-markdown>
  </tr>
</table>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
    components: {
        VueMarkdown
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
        }
    },
    computed: {
        filterMessage: function () {
            return this.message.replace(/<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>/gmi, '');
        }
    },
    methods: {
        selectThread: function (id) {
            if (!this.isThread) {
                return;
            }

            if (this.parentId) {
                this.$router.push('/thread/' + this.parentId + '#' + id);
            } else {
                this.$router.push('/thread/' + id);
            }
        },
        prerender: function (message) {
            const reply = />>\d{1,10}/g;
            const image = /(?!\\!\[[a-z]+\]\()(?<!['|"])https?:\/\/[a-z.0-9-_]+\.(jpg|jpeg?|gif|png)(?<!['|"])(?!\))/gmi;
            const audio = /(https?):\/\/[a-z./0-9-_]+(\.(ogg|mp3)$)/gmi;
            const youtube = /(https:\/\/www\.youtube\.com\/watch\?v=([0-9a-z_-]+)|https:\/\/youtu\.be\/([0-9a-z_-]+))/mi;

            return message.replace(reply, match => {
                return `<a href='#${match.slice('>>'.length)}'>${match}</a>`;
            }).replace(youtube, (match, p1, p2, p3) => {
                var id = p2 == null ? p3 : p2;

                return `<br>${match}<br><br><img class= 'yt-preview' src='http://i1.ytimg.com/vi/${id}/hqdefault.jpg' alt='preview'><br>`;
            }).replace(image, match => {
                return `<br><a href='${match}' target='_blank'><img src='${match}' alt='[image]'></a><br>`;
            }).replace(audio, match => {
                return `<br><audio controls=true src='${match}'><br>`;
            });
        }
    }
}
</script>

<style>
.post {
    margin-right: 25%;
    background-color: #111;
    margin-bottom: 7px;
    margin-top: 7px;
    border-radius: 5px;
    width: 100%;
}

.post-reply {
    border-left: 20px solid #555;
}

.post-bottom {
    widht: 100%;
}

.post:hover {
    background-color: #161616
}

.post-active {
    border: 10px solid #777;
}

.post-author {
    margin-right: 10px;
    color: #a04;
}
.post-subject {
    color: #990;
    font-weight: bold;
}
.post-header {
    backgroun-color: #222;
}
.post-message {
    margin: 30px;
}
.post-number {
    margin-right: 10px;
    color: #a5a;
}

.post > img {
    margin-right: 30%;
}

.post-data {
    padding: 10px;
}

blockquote {
    margin-left: 0px;
    border-left: 4px solid #555;
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

.clickable-elem {
    margin: 20px;
}
</style>
