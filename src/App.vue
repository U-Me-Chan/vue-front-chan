<template>
<div id="app">
  <nav class="menu">
    <a href="/">Главная</a>
    <li class="menu-item" v-for="board in boards" @click="selectBoard(board.tag)" :key="board.id" v-bind:class="{ active: tag === board.tag }">/{{board.tag}}/ - {{board.name}} </li>
  </nav>
  <router-view/>
</div>
</template>

<script>
import service from './service'

export default {
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

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body {
    background-color: #000;
    color: #888;
}

a {
    color: #a00;
}

a:visited {
    color: #a30;
}

.active {
    color: red;
}

.menu {
    margin: 20px;
}

.menu-item {
    margin: 1px;
}

li {
    list-style: none;
}
</style>
