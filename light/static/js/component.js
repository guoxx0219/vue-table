//等待信息组件
var wait = Vue.component('wait',{
    props:['show'],
    template:`
        <div class="wait" v-show="show"></div>
    `,
});
//提示信息组件
var info = Vue.component('info',{
    props:['message','showInfo'],
    template:`
        <div class="info" v-show="showInfo">{{message}}</div>
    `,
});
//函数式编程，将table表格封装，通过传递不同的值，显示不同的内容以及操作
var Table = Vue.component('Table',{
    props:['header'],
    template: `
    <div>
        <div class="box">
            <div class="container">
                <table class="table table-bordered">
                    <tr>
                        <th v-for="item in header">{{item}}</th>
                        <th>编辑</th>
                    </tr>
                    <tr v-for="item in datas" :key="item.id">
                        <td>{{item.name}}</td>
                        <td>{{item.age}}</td>
                        <td>{{item.sex}}</td>
                        <td>
                            <a class="btn btn-default" role="button" :href="'#/edit/'+item.id">修改</a>
                            <a class="del btn btn-default" role="button" @click="del(item.id)">删除</a>
                        </td>
                    </tr>
                </table>
                <a href="#/add" class="glyphicon glyphicon-plus" title="添加"></a>
            </div>
        </div>
        <wait :show="show"></wait>
        <info :showInfo="showInfo" message="删除成功!"></info>
    </div>
    `,
    data(){
        return{
            datas:[],
            show:true,
            showInfo:false
        }
    },
    mounted(){
        fetch('/index').then(function (e) {
            return e.text();
        }).then(data=>{
                this.datas = JSON.parse(data);
                this.show = false;
        })
    },
    methods:{
        del(id){
            fetch('/del'+id).then(function (e) {
                return e.text();
            }).then(res=>{
                if (res == 'ok'){
                   this.showInfo = true;
                }
            })
            this.datas = this.datas.filter(ele=>ele.id != id);
        }
    }
})
var Index = Vue.component('Index',{
    //此处的header为父组件向子组件传参的一个名字，以数组形式传送，所以用：
    template:`
        <Table :header="['姓名','年龄','性别']"></Table>
    `,
});
var add =Vue.component('add',{
    template:`
    <div>
        <div class="container">
            <form>
                <div class="form-group">
                    <label for="name">姓名</label>
                    <input type="text" class="form-control" id="name" placeholder="输入要添加的姓名" v-model="name"">
                </div>
                <div class="form-group">
                    <label for="age">年龄</label>
                    <input type="text" class="form-control" id="age" placeholder="输入要添加的年龄" v-model="age">
                </div>
                <div class="form-group">
                    <label for="sex">性别</label>
                    <input type="text" class="form-control" id="sex" placeholder="输入要添加的性别" v-model="sex">
                </div>
                <button class="btn btn-default" @click="submit">Submit</button>
            </form>
        </div>
        <info :showInfo="showInfo" message="添加成功!"></info>
    </div>
    `,
    data(){
        return{
            name:'',
            age:'',
            sex:'',
            showInfo:false
        }
    },
    methods:{
        submit(e){
            e.preventDefault();
            fetch('/addCon?name='+this.name+'&age='+this.age+'&sex='+this.sex).then(function (e) {
                return e.text();
            }).then(res=>{
                if(res == 'ok'){
                    this.showInfo = true;
                    this.name = '';
                    this.age = '';
                    this.sex = '';
                }
            })
        }
    }
});
var edit =Vue.component('edit',{
    template:`
    <div>
        <div class="container">
            <form>
                <div class="form-group">
                    <label for="name">姓名</label>
                    <input type="text" class="form-control" id="name" placeholder="输入要添加的姓名" v-model="name"">
                </div>
                <div class="form-group">
                    <label for="age">年龄</label>
                    <input type="text" class="form-control" id="age" placeholder="输入要添加的年龄" v-model="age">
                </div>
                <div class="form-group">
                    <label for="sex">性别</label>
                    <input type="text" class="form-control" id="sex" placeholder="输入要添加的性别" v-model="sex">
                </div>
                <button class="btn btn-default" @click="submit">Submit</button>
            </form>
        </div>
        <info :showInfo="showInfo" message="修改成功!"></info>
    </div>
    `,
    data(){
        return{
            id:'',
            name:'',
            age:'',
            sex:'',
            showInfo:false
        }
    },
    methods:{
        submit(e){
            //通过地址栏给服务器发送数据--查询字符集
            fetch('/editCon?id='+this.id+'&name='+this.name+'&age='+this.age+'&sex='+this.sex).then(function (e) {
                return e.text();
            }).then(res=>{
                if(res == 'ok'){
                    this.showInfo = true;
                    setTimeout(()=>{
                        this.$router.push('/');
                    },1000);
                }
            })
        }
    },
    mounted(){
        var id = this.$route.params.id;
        this.id = id;
        fetch('/editQuery'+id).then(function (e) {
            //规定返回的数据是text格式
            return e.text();
        }).then(datas=>{
            datas = JSON.parse(datas);
            this.name = datas[0].name;
            this.age = datas[0].age;
            this.sex = datas[0].sex;
        })
    }
});