<template>
<div id="app">
  <div class="columns is-3">
    <div class="column is-one-fifth">
      <b-menu class="menu">
        <b-menu-list>
          <a href="/"><span class="chan-name">I̶I̴I̶N̵3̵0̸Ч̵A̵H̴</span></a>
        </b-menu-list>
        <b-menu-list label="Разделы">
          <b-menu-item :label="board.name" class="menu-item" v-for="board in boards" @click="selectBoard(board.tag)" :key="board.id" v-bind:class="{ active: tag === board.tag }"></b-menu-item>
        </b-menu-list>
        <b-menu-list label="Ссылки">
          <a class="menu-item" href="http://pissychan.oxore.net">Упрощённая версия</a>
          <a class="menu-item" href="https://discord.gg/DhhjsVgXBG">Discord-сервер</a>
          <a class="menu-item" href="https://miaolz123.github.io/vue-markdown/">Пример разметки</a>
        </b-menu-list>
      </b-menu>
    </div>
    <div class="column is-half main-content">
      <router-view/>
    </div>
    <div class="column is-one-quarter">
      <Feed :posts="posts"/>
    </div>
  </div>
</div>
</template>

<script>
import service from '../service'
import Feed from './Feed.vue'

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
        this.updateData();

        setInterval(() => this.updateData(), 30000);
    },
    methods: {
        selectBoard: function (tag) {
            this.tag = tag;
            this.$router.push('/board/' + tag);
        },
        updateData: function () {
            var self = this;

            service.getAllBoards().then(
                (payload) => {
                    self.$buefy.toast.open('Обновляю ленту последних постов...');
                    self.posts = payload.posts;
                    self.boards = payload.boards;
                },
                (error) => console.log(error)
            )
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
    font-size: 12px;
}

.menu-item {
    list-style: none;
}

.chan-name {
    font-size: 40px;
}
</style>
