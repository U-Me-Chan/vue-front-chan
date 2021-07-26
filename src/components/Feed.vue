<template>
<div class="feed" v-if="posts.length">
  <h3>Последние посты:</h3>
  <Post v-for="post in posts" :key="post.id"
        :id="post.id"
        :poster="post.poster"
        :subject="post.subject"
        :message="post.message"
        :parentId="post.parent_id"
        :isThread="true"/>
</div>
</template>

<script>
import Post from './Post.vue'

export default {
    name: 'Feed',
    components: {
        Post
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
h3 {
    font-size: 27px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
