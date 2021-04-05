"use strict";

var router = new VueRouter({
    routes: [
        { path: "/", component: Vue.component('main-view') },
    ]
});

Vue.use(VueMarkdown);

var app = new Vue({
    router: router,
    data: {
        title: "Писсичан",
    },
}).$mount("#app");
