/* eslint-disable prettier/prettier */
const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV; // 수동으로 받은 환경변수

// 불러올 파일의 위치
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");

// 불러온 파일을 저장할 위치
const OUTPUT_DIR = path.join(__dirname, "static");

// webpack.config.js 설정으로는 두가지의 설정을 가진다
// entry, output
// entry :  파일들이 어디서 왔는가?
// output : 그 파일들을 어디에 넣을 것인가?
const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE, // development 또는 production 선택
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(scss)$/, // (검사) scss 파일있으면 아래를 실행해라
                use: ExtractCSS.extract([
                    // 찾아낸 scss 파일을 어떻게 사용할지 설정
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins() {
                                return [autoprefixer({ browsers: "cover 99.5%" })];
                            }
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ])
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;