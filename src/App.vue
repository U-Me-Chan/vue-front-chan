<template>
<div id="app">
  <div class="columns is-3">
    <div class="column is-one-fifth">
      <b-menu class="menu">
        <b-menu-list label="Ссылки">
          <a href="/">Главная</a>
          <a href="http://pissychan.scheoble.ml">Упрощённая версия</a>
          <a href="https://discord.gg/DhhjsVgXBG">Discord-сервер</a>
        </b-menu-list>
        <b-menu-list label="Разделы">
          <b-menu-item :label="board.name" class="menu-item" v-for="board in boards" @click="selectBoard(board.tag)" :key="board.id" v-bind:class="{ active: tag === board.tag }"></b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>
    <div class="column is-half">
      <router-view/>
    </div>
    <div class="column is-one-quarter">
      <Feed :posts="posts"/>
    </div>
  </div>
</div>
</template>

<script>
import service from './service'
import Feed from './components/Feed.vue'

export default {
    components: {
        Feed
    },
    data: function () {
        return {
            boards: [],
            tag: '',
            posts: [],
        }
    },
    created: function () {
        var self = this;

        service.getAllBoards().then(
            (payload) => {
                self.posts = payload.posts;
                self.boards = payload.boards;
            },
            (error) => console.log(error)
        );
    },
    methods: {
        selectBoard: function (tag) {
            this.tag = tag;
            this.$router.push('/board/' + tag);
            this.$buefy.toast.open(`Открываю раздел /${tag}`);
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
    background-color: #eee;
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
    position: fixed;
}

.menu-item {
    margin: 1px;
}

.menu-item {
    list-style: none;
}

.menu-hide-button {
    position: fixed;
}
</style>
