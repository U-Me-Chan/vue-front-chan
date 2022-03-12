<template>
<div id="app">
  <div class="board-list">
    <a class="board-link" v-for="board in boards" @click="selectBoard(board.tag)" :key="board.id" v-bind:class="{ active: tag === board.tag }">{{ board.name }} (+{{ board.new_posts_count }}) </a>
  </div>

  <div class="main-content">
    <router-view/>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { bus} from '../bus'

const config = require('../../config')

export default {
    data: function () {
        return {
            boards: [],
            tag: '',
            posts: []
        }
    },
    created: function () {
        this.updateData();

        setInterval(() => this.updateData(), 30000);
    },
    mounted: function () {
        var self = this

        bus.$on('boards.update', function (params) {
            self.tag = params[0]
        })
    },
    methods: {
        selectBoard: function (tag) {
            this.tag = tag;
            this.$router.push('/board/' + tag);
        },
        updateData: function () {
            var self = this;

            axios.get(config.chan_url + '/v2/board').then((response) => {
                self.$buefy.toast.open('Обновляю счётчики...');
                self.boards = response.data.payload.boards;
            }).catch((error) => {
                self.$buefy.toast.open('Произошла ошибка при запросе данных с сервера')
                console.log(error);
            })
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
    color: #fff;
}

a {
    color: #a00;
    padding: 5px;
}

a:visited {
    color: #a30;
}

.active {
    color: white;
    background-color: #7957d5;
    border: 1px solid;
}

.chan-name {
    font-size: 40px;
}

.board-list {
    display:flex;
    justify-content: space-around;
    background-color: #fff;
    flex-wrap: wrap;
}

.board-link {
    margin: 10px;
}

.main-content {
        margin: 10px 350px 10px 350px;
}

@media (max-width: 1200px) {
    .main-content {
	margin: 10px 5px 10px 5px;
    }
}
</style>
