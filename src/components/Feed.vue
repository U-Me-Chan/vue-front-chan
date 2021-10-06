<template>
<div class="feed" v-if="posts.length">
  <div class="feed-header">
    <h3>Последние посты</h3>
    <hr>
  </div>
  <div class="feed-content">
    <div class="card" v-for="post in posts" :key="post.id">
      <b-tag class="poster" type="is-success is-light">{{post.poster}}</b-tag>
      <b-tag v-if="!post.parent_id" type="is-info is-light">{{post.subject}}</b-tag>
      <b-tag v-if="!post.parent_id" class="number">#{{post.id}}</b-tag>
      <b-tag v-if="post.parent_id" class="number">#{{post.parent_id}} > #{{post.id}}</b-tag>
      <b-button type="is-text" size="is-small" @click="selectPost(post.id, post.parent_id)">Открыть</b-button>
      <div class="message">{{filterMessage(post.message)}}</div>
    </div>
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
            message = message.replace(/<.+>/gmi, () => { return '' });
            return message.length > 100 ? message.substring(0, 100) + '...' : message;
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
    font-size: 20px;
    margin-top: 10px;
    padding-left: 100px;
}

.message {
    font-size: 12px;
}

.card {
    padding: 10px;
    margin: 1px;
}

.message {
    background-color: #fff;
    margin: 10px;
}

.feed-header {
    position: fixed;
}

.feed-content {
    position: fixed;
    bottom: 0;
    top: 0;
    margin-top: 95px;
    margin-bottom: 20px;
    overflow-y: scroll;
}
</style>
