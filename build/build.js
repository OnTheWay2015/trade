const crypto= require("crypto");
const md5 = require('md5-node');
const path = require("path");
const fs = require('fs')
const EFS = require('fs-extra');

// 导入webpack模块
const webpack = require('webpack');
// 可以使用ES6语法导入
// import webpack from "webpack";

// print process.argv
//process.argv.forEach(function (val, index, array) {
//    console.log(index + ': ' + val);
//  });

let arr = process.argv.splice(2);
let argc = arr.length;
let cfg = arr[0];

const ccc= require(cfg);

const DEV_FLAG=ccc.mode=="development";

console.log("webpack config:"+ cfg);
console.log("webpack output:"+ ccc.output.path);
const PROJ_DIR = __dirname +"/../" //__dirname, js 文件所在目录. 

console.log("PROJ_DIR =>" +PROJ_DIR );

let d_flag = true;
let html_op = (marks)=>{
    if (DEV_FLAG)
    {
        return;
    }
    var htmlfile = ccc.output.path + "/index.html";
    if (d_flag) console.log("htmlfile["+htmlfile+"]");
    let ct = fs.readFileSync(htmlfile, 'utf-8');
    for (var j=0;j<marks.length;j++)
    {
        var reg = marks[j][0];
        var md5 = marks[j][1];
        var from = marks[j][2];
        var file = marks[j][3];
        
        if (d_flag) console.log(ct);
        
        var str = ct.match(reg).toString();
        var arr = str.split(".");
        if (d_flag) console.log(arr);
        var ts = arr[0] + "-"+ md5.substr(0,8) + "." + arr[1];
        if (d_flag) console.log("["+str+"] trans to=> ["+ts+"]");
        ct= ct.replace(reg, ts);
        if (d_flag) console.log(ct);
        
        let oldPath= path.join(from, file);
        let newPath= path.join(from, ts);
        fs.rename(oldPath, newPath, (err)=>{
            if (d_flag) console.log("file rename, ["+oldPath+"] => ["+newPath+"]  ");
            if (err)
            {
                console.log("file rename, ["+oldPath+"] => ["+newPath+"]  error");
            }
        })
    }
    fs.writeFileSync(htmlfile,ct);
//fs.rename(oldPath, newPath, [callback(err)])
    //markMd5.push([reg, md5key]);
}



let func_copy = () => {
    if (d_flag) console.log("func_copy act");
    var copycount = 0;
    var copyfiles = [
        [
            PROJ_DIR + "src/assets",
            ccc.output.path + "/assets",
            /style\.css/
        ],
    ];
    var markMd5 = [];
    for (var j=0;j<copyfiles.length;j++)
    {
        var val = copyfiles[j];
        var from = val[0];
        var to = val[1];
        var reg = val[2];
        if (d_flag) console.log("each=>"+j);
        if (d_flag) console.log(val);
        
        fs.readdir(from, (err, files) => {
            if (d_flag) console.log("readdir["+from+"] files=>");
            if (d_flag) console.log(files);
            if (err) {
                console.log(err);
                return;
            }
            for (var i=0;i<files.length;i++)
            {
                var file = files[i];

                //拼接获取绝对路径，fs.stat(绝对路径,回调函数)
                //let fPath = path.join(MyUrl, file);
                if (d_flag) console.log("file:" + file);
                if (!reg.test(file)) {
                    if (d_flag) console.log("reg test false");
                    continue;
                }

                let fPath = path.join(from, file);
                let tPath = path.join(to, file);


                let ct= fs.readFileSync(fPath,'utf-8');
                let md5key = md5(ct);           
                if (d_flag) console.log("md5=>" + md5key);                    
                markMd5.push([reg,md5key,to,file]);

                EFS.copy(fPath, tPath)    
                .then(() => {
                        if (d_flag) console.log("copy [" + fPath + "] => [" + tPath + "] success!");
                        copycount++;
                        if (copycount == copyfiles.length) {
                            if (d_flag) console.log("copy end");
                            if (d_flag) console.log(markMd5);
                            html_op(markMd5);
                            copylibs(); 
                        }
                    })
                    .catch(err => {
                        console.error(err)

                    })
            }

            //fs.stat(fPath, (err, stat) => {
            //    if (stat.isFile()) {
            //        //stat 状态中有两个函数一个是stat中有isFile ,isisDirectory等函数进行判断是文件还是文件夹
            //        if (d_flag) console.log(file)
            //    }
            //    else {
            //        myReadfile(fPath)
            //    }
            //})
        })
    }
}
//func_copy();

let pack = () => {
    if (d_flag) console.log("pack act");
    //if (d_flag) console.log(ccc);
    const compiler = webpack(ccc);
    compiler.run( (err, stats) => {
       if(err || stats.hasErrors()) {
        // 构建过程出错
            console.log("---------------------------- err:");
            console.log(err);
            console.log("---------------------------- stats:");
            console.log(stats.toString());
        } else {
            console.log(stats.toString());
            func_copy();
            console.log("cost_time["+(stats.endTime-stats.startTime)/1000+"]");
        };
    });
}
pack();


var copylibs = () => {
    if (d_flag) console.log("copylibs act");
    const { exec, execFile } = require('child_process');
    execFile(
        "c.bat",
        [ccc.output.path], //传入 bat参数, bat 里 %0 代表bat文件名, %1 代表第一个参数
        { cwd: './build' }, //相对nodejs运行路径 
        function (error, stdout, stderr) {
            if (error) {
                console.log(error);
                console.log(stdout);
                return;
            }
        });

}


let a = () => {
    // 读取webpack.config.js文件中的配置
    //const config = require('./webpack.config.js');

    // webpack中不传入第二个参数，就会返回一个Compiler实例，用于控制启动，而不是像上面那样立即启动
    const compiler = webpack(config);

    // 调用compiler.watch并以监听模式启动，返回的watching用来关闭监听
    const watching = compiler.watch({
        // watchOptions
        aggregateTimeout: 300,
    }, (err, stats) => {
        // 每次因文件发生变化而重新执行完构建之后
        if(err || stats.hasErrors()) {
            // 构建过程出错
        }
    });

    // 调用watching.close关闭监听
    // watching.close(() =>{
    //     // 监听关闭之后
    // });

}