<template>
<div class="feed" v-if="posts.length">
  <h3>Последние посты:</h3>
  <hr>
  <div class="card" v-for="post in posts" :key="post.id">
    <b-tag class="poster" type="is-success is-light">{{post.poster}}</b-tag>
    <b-tag v-if="!post.parent_id" type="is-info is-light">{{post.subject}}</b-tag>
    <b-tag class="number">{{post.id}}</b-tag>
    <b-button type="is-text" size="is-small" @click="selectPost(post.id, post.parent_id)">Открыть</b-button>
    <div class="message">{{filterMessage(post.message)}}</div>
  </div>
</div>
</template>

<script>
export default {
    name: 'Feed',
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    methods: {
        filterMessage: function (message) {
            return message.substring(0, 100) + '...'
        },
        selectPost: function (id, parentId) {
            if (parentId) {
                this.$router.push('/thread/' + parentId + '#' + id);
            } else {
                this.$router.push('/thread/' + id);
            }
        }
    }
}
</script>

<style scoped>
h3 {
    font-size: 27px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 25px;
}

.message {
    font-size: 10px;
}

.card {
    padding: 10px;
}

.message {
    background-color: #fff;
    margin: 10px;
}
</style>
