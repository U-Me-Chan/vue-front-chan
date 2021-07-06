<template>
<ul class="menu">
  <li v-for="board in boards" class="menu-item" @click="selectBoard(board.tag)" :key="board.id" v-bind:class="{ active : tag === board.tag }">
    /{{board.tag}}/ - {{board.name}}
  </li>
</ul>
</template>

<script>
import service from '../service'

export default {
    name: 'Menu',
    data: function () {
        return {
            boards: [],
            tag: ''
        }
    },
    created: function () {
        var self = this;

        service.getAllBoards().then(
            (payload) => {
                self.boards = payload.boards;
            },
            (error) => console.log(error)
        );
    },
    methods: {
        selectBoard: function (tag) {
            this.tag = tag;
            this.$router.push('/board/' + tag);
        }
    }
}
</script>

<style scoped>
ul > li {
    list-style: none;
}

ul > li:hover {
    color: #333;
}

.active {
    color: red;
}
</style>
