 

const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var  VueLoaderPlugin = require('vue-loader/lib/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//清除输出目录，免得每次手动删除
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

npm_config_report=true



var outdir =  path.join(__dirname, './r_out');
//function resolve (dir) {
//    return path.join(__dirname, '..', dir);
//}

module.exports = {
    mode: 'production'
    ,entry: {
        main: './src/main.ts'
    }
    , output: {
        path: outdir,// path.join(__dirname, './r_out'),
        filename: '[name]-[hash:8].js', //对应主入口文件模块
        //filename: '[name].js', //对应主入口文件模块
        //chunkFilename: 'js/[name].chunk.js', //非主入口文件模块
    }
    ,externals :{                   //这样写的目的是不要把vue打包进来,打包时排除的库,要在页面上引入对应库的.js文件
        "vue":"Vue",
        'element-ui':"ELEMENT",       //左边的key是引入的库名,右边value为引入js库时创建的全局名,全局名一般会在引入js文件的自执行方法里定义. exports.XXX = "XX" 或  global.XXX = "XX"之类代码 
        'vuex':"Vuex",

        "echarts" : 'echarts',
        "axios" : 'axios' //
    }
    ,resolve: {
        extensions: ['.js', '.ts', '.vue', '.json'] //不加这个时,引入模块时要指定扩展名. import ttt from './ttt.ts';加了后不需要扩展名 import ttt from './ttt';
        ,alias: {
            'vue$': 'libs/dist/vue.esm.js'
            //,'@': resolve('src')
            ,'@': path.join(__dirname, './src') //处理 @ 相对路径
        }
    }
    ,module: {//当前没有处理 css文件,提升打包速度
    　　rules:[
            //{//模板html文件的处理
            //    test: /\.html$/,
            //    use: {   　
            //        loader: "text-loader"
            //    }
            //}
            {
                test: /\.vue$/,
                exclude:/node_modules/,   //编译时排除  node_modules中的内容
                //use: {   　
                //    loader: "vue-loader",
                //}
                use: [   　
                    "vue-loader",
                ]


            }
            ,{
                test: /(\.jsx|\.js$)/,  //表示匹配规则，是一个正则表达式
                exclude:/node_modules/,   //编译时排除  node_modules中的内容
                use: {   　　　　 //表示针对匹配文件将使用处理的loader
                    loader: "babel-loader",
                    //options: {
                    //　　presets: ["es2015", "react"]
                    //}
                }
            }
            ,{
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options:{
                    appendTsSuffixTo:[/\.vue$/] //没有这个,在 vue里import的文件识别不了.  https://www.cnblogs.com/eret9616/p/11817277.html
                }
            }
            ,{
                exclude:/node_modules/,   //编译时排除  node_modules中的内容
                 test: /\.(ttf|eot|svg|woff|woff2)$/, 
                 use: 'url-loader' // 处理 字体文件的 loader
              } 
        ]
    }
    ,plugins: [
        new VueLoaderPlugin()
        ,new CleanWebpackPlugin()
        //,new BundleAnalyzerPlugin()// 打包分析
        ,new MiniCssExtractPlugin()
        ,new HtmlWebpackPlugin({
            title:'trade',
            template: 'public/index.html', // 源模板文件
            filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
            showErrors: true,
            inject: 'body',
            chunks: ["main"]
        })
    ]
}

 