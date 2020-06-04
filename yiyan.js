// https://v1.hitokoto.cn

// 类型c
// 类型可选值

// a	动画
// b	漫画
// c	游戏
// d	文学
// e	原创
// f	来自网络
// g	其他
// h	影视
// i	诗词
// j	网易云
// k	哲学
// l	抖机灵

const axios = require("axios");

const fse = require("fs-extra");

const fs = require("fs");

const path = require("path");

const c_list = [
  { c_num: 0, c: "a", label: "动画" },
  { c_num: 1, c: "b", label: "漫画" },
  { c_num: 2, c: "c", label: "游戏" },
  { c_num: 3, c: "d", label: "文学" },
  { c_num: 4, c: "e", label: "原创" },
  { c_num: 5, c: "f", label: "来自网络" },
  { c_num: 6, c: "g", label: "其他" },
  { c_num: 7, c: "h", label: "影视" },
  { c_num: 8, c: "i", label: "诗词" },
  { c_num: 9, c: "j", label: "网易云" },
  { c_num: 10, c: "k", label: "哲学" },
  { c_num: 11, c: "l", label: "抖机灵" }
];

// 选择num的数值
// c_num可以填入 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, -1
// -1为随机爬取
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11的含义可以查看c_list变量 , 例如数字9为网易云音乐

let c_num = -1;



async function saveToJsonFile(c, obj) {
  if (fs.existsSync(path.join(__dirname, "yiyan_data.json")) === false) {
    let init_json = {};

    for (let i = 0, c_list_len = c_list.length; i < c_list_len; i++) {
      init_json[c_list[i]["label"]] = {};
    }

    fse.writeJsonSync(
      path.join(__dirname, "yiyan_data.json"),
      init_json,
      err => {
        if (err) throw err;
        console.log("The file was succesfully saved!");
      }
    );
  }

  //

  let current_json_data = fse.readJsonSync(
    path.join(__dirname, "yiyan_data.json")
  );

  let c_current_json = current_json_data[c];

  if (c_current_json.hasOwnProperty(obj["id"])) {
    console.log("数据重复:", obj);
  } else {
    current_json_data[c][obj["id"]] = obj;

    fse.writeJsonSync(
      path.join(__dirname, "yiyan_data.json"),
      current_json_data
    );

    console.log("写入数据:", obj);
  }
};

async function getData(c) {
  let data = await new Promise(async (resolve, reject) => {
    resolve(
      await axios({
        method: "get",
        url: "https://v1.hitokoto.cn?c=" + c
      })
    );
  }).then(result => {
    return result["data"];
  });

  return data;
}

// 生成随机数

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}

async function main() {
  while (true) {
    try {
      // 随机一个标签
      let c_index = 0;
      if(c_num === -1){
        c_index = randomNum(0, 11);
      }else{
        c_index = c_num;
      }
      

      await new Promise(async (resolve, reject) => {
        let result = await getData(c_list[c_index]["c"]);
        await saveToJsonFile(c_list[c_index]["label"], result);

        let time_num = randomNum(6000, 10000);
        console.log(
          "\n\n\n==>>" +
            c_list[c_index]["label"] +
            "自动延时" +
            time_num +
            "毫秒<<<=="
        );
        setTimeout(() => {
          resolve();
        }, time_num);
      });
    } catch (e) {
      console.log("=Err=>>", e);
    }
  }
}

main();
