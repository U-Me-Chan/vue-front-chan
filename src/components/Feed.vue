<template>
<div class="feed" v-if="posts.length">
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

</style>
