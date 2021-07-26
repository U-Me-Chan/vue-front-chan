<template>
<div class="main">
  <Feed :posts="posts" />
</div>
</template>

<script>
import Feed from './Feed.vue'
import service from '../service';

export default {
    name: 'Main',
    components: {
        Feed
    },
    data: function () {
        return {
            posts: []
        }
    },
    created: function () {
        var self = this;

        service.getAllBoards().then(
            (payload) => {
                self.posts = payload.posts;
            },
            (error) => console.log(error)
        );
    }
}
</script>

<style scoped>
</style>
