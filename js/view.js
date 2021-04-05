"use strict";

Vue.component('main-view', {
    template: "#main-template",
    data: function() {
        return {
            boards: [],
            posts: []
        };
    },
    methods: {
        init: function() {
            var self = this;
            var ajax = new XMLHttpRequest();
            ajax.open('GET', 'http://pissykaka.scheoble.ml/board/all');
            ajax.addEventListener('loadend', function (data) {
                var json = JSON.parse(this.responseText);
                self.boards = json.payload.boards;
                self.posts = json.payload.posts;
            });
            ajax.send();
        }
    },
    created: function(to, from) {
        this.init();
    },
    watch: {
        '$route': function(to, from) {
            if(from !== to) this.init();
        }
    },
});
