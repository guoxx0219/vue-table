//后台路由的配置---服务器
var light=require("ueklight");
var mysql=require("./mysql");
var router=light.Router();

router.get("/",function(req,res){
   res.sendFile('views/index.html');
});
router.get("/index",function(req,res){
    setTimeout(()=> {
        mysql.query('select * from demo', function (err, result) {
            if (err) {
                res.end(err);
            } else {
                result = JSON.stringify(result);
                res.send(result)
            }
        })
    },2000)
});
router.get("/addCon",function(req,res){
    var name = req.query.name;
    var age = req.query.age;
    var sex = req.query.sex;
    mysql.query("insert into demo (name,age,sex) values ('"+name+"','"+age+"','"+sex+"')",function (err,result) {
        if(err){
            res.end('err');
        }else{
            if(result.affectedRows>0){
                res.send('ok');
            }else{
                res.send('err');
            }
        }
    })
});
router.get("/editQuery:id",function(req,res){
    var id = req.params.id;
    mysql.query("select * from demo where id="+id,function (err,result) {
        if(err){
            res.end('err');
        }else{
            res.send(JSON.stringify(result));
        }
    })
});
router.get("/editCon:id",function(req,res){
    var name = req.query.name;
    var age = req.query.age;
    var sex = req.query.sex;
    var id = req.query.id;
    mysql.query(`update demo set name='${name}',age='${age}',sex='${sex}' where id=${id}`,function (err,result) {
        if(err){
            res.end('err');
        }else{
            if(result.affectedRows>0){
                res.send('ok');
            }else{
                res.send('err');
            }
        }
    })
});
router.get("/del:id",function(req,res){
    var id = req.params.id;
    mysql.query("delete from demo where id = "+id,function (err,result) {
        if(err){
            res.end('err');
        }else{
            if(result.affectedRows>0){
                res.send('ok');
            }else{
                res.send('err');
            }
        }
    })
});