"use strict";

/*
var app = new Vue({
    el: '#app',
    data: {
        showHome: true
    },
    watch:{
        $route (to, from){
            console.log(to, from);
            alert('hola');
        }
    },
    methods: {
        hideHome: function() {
            this.showHome = false;
        },
        initializeDiagnostic: function() {
            window.location.hash = '#diagnostic';
        },
        startGeneralDiagnostic: function() {
            this.initializeDiagnostic();
        },
        startSpecificDiagnostic: function() {
            this.initializeDiagnostic();
        }
    },
}); 
*/

// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
const Foo = { template: `
<div>foo</div>
` 
};
const Bar = { template: '<div>bar</div>' };

const routes = [
    { path: '/', component: Foo },
    { path: '/bar', component: Bar }
];
  
// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
});
  
// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
    router: router,
    data: {
        hola: 'mundo',
    }
}).$mount('#app');