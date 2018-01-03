//前台路由的配置--单页面应用
var router = new VueRouter({
    routes : [
        {path:'/',component:Index},
        {path:'/add',component:add},
        {path:'/edit/:id',component:edit},
    ]
});