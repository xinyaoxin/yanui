<template>
  <div class="home">
    <div @click="createDB">创建数据库</div>
    <div @click="add">新增</div>
    <div @click="read">获取</div>
    <div @click="readAll">获取全部</div>
    <div @click="deleteData">删除</div>
    <div @click="deleteDb('testDatabaes')">删除数据库</div>
    <div @click="putData">更新</div>
  </div>
</template>
<script>
export default {
  name: "IndexDB",
  data() {
    let db = "this is vue db";
    return {
      db,
      indexedDB:
        window.indexedDB ||
        window.webkitindexedDB ||
        window.msIndexedDB ||
        window.mozIndexedDB, //兼容
    };
  },
  created() {},
  methods: {
    async createInit() {
      window.db = await this.dbInit();
    },

    dbInit() {
      return new Promise((resolve, reject) => {
        //打开数据库，如果没有就新建一个
        //dbname库的名称，2为版本号，切记，版本号不能为小数，会自动四舍五入
        const connection = window.indexedDB.open("testDatabaes", 3);
        connection.onblocked = function (event) {
          // 如果其他的一些页签加载了该数据库，在我们继续之前需要关闭它们
          alert("请关闭其他由该站点打开的页签！");
        };
        // connection.addEventListener("success", (event) => {
        //   this.db = event.target.result;
        //   this.db.addEventListener("versionchange", (event) => {
        //     console.log("The version of this database has changed");
        //   });
        // });
        //成功回调
        connection.onsuccess = function (event) {
          this.db = event.target.result;
          resolve(event.target.result);
        };
        //
        connection.onupgradeneeded = function (event) {
          this.db = event.target.result;
          if (!this.db.objectStoreNames.contains("aa")) {
            //为该数据库创建一个对象仓库，person,主键为id，下面使用调用的时候主要对应主键
            //autoIncrement 标记会为该仓库开启键生成器。默认该设置是不开启的
            //使用键生成器，当你向对象仓库新增记录时键会自动生成。对象仓库生成的键往往从 1 开始，然后自动生成的新的键会在之前的键的基础上加 1。生成的键的值从来不会减小，除非数据库操作结果被回滚
            this.db.createObjectStore(
              "aa",
              { keyPath: "oid" }
              // { autoIncrement: true }
            );
          }
        };
        //失败回调
        connection.onerror = function (err) {
          reject(err);
        };
      });
    },
    //type 方法类型  data第几条
    async dbOperation(type, data) {
      let typeList = ["add", "get", "getAll", "delete", "put"];
      if (!typeList.includes(type)) {
        throw new Error(`操作类型错误, 仅支持: ${typeList.toString()} 方法`);
      }
      const readType =
        type === "add" || "delete" || "put" ? "readwrite" : "readonly";
      const res = await this.dbInit();
      const objectStore = res.transaction("aa", readType).objectStore("aa");
      const response = new Promise((resolve, reject) => {
        const request = objectStore[type](data);
        request.onsuccess = (res) => {
          console.log(res.target.result);
          resolve(res.target.result);
        };
        request.onerror = (err) => {
          reject(err);
        };
        // res.transaction("person", readType).oncomplete = (event) => {
        //   // res.close();
        //   console.log("事务已完成", res.close);
        //   let closeFn = res.close;
        //   closeFn();
        // };
      });
      console.log("this is response****", response);
      return response;
    },

    async createDB() {
      // let request = window.indexedDB.open("noPromiseDB");
      // request.onsuccess = (e) => {
      //   window.db = e.target.result;
      // };
      // request.onupgradeneeded = (e) => {
      //   let dataBase = e.target.result;
      //   let objectStore = dataBase.createObjectStore("noPromiseDB", {
      //     keyPath: "oid",
      //   });
      // };
      window.db = await this.dbInit();
    },

    async add() {
      const dataArr = [
        {
          oid: 63535,
          ADDRESS: "",
          NAME: "查玉才",
          geometry: {
            type: "Point",
            coordinates: [120.0882215988, 31.818928689128],
          },
        },
        {
          oid: 63536,
          ADDRESS: "",
          NAME: "尤静珍",
          geometry: {
            type: "Point",
            coordinates: [120.29305992597, 31.560125405216],
          },
        },
      ];

      for (let ch of dataArr) {
        //   console.log("windowADD：", window);
        //   var transaction = window.db
        //     .transaction("noPromiseDB", "readwrite")
        //     .objectStore("noPromiseDB")
        //     .add(ch);
        //   console.log(transaction);

        const res = await this.dbOperation("add", ch);
        console.log("添加结果：", res);
      }
      // const res = await this.dbOperation("add", data);
        // console.log("添加结果：", res);
    },
    async read() {
      const res = await this.dbOperation("get", 63535);
      console.log("获取", res);
    },
    async readAll() {
      const res = await this.dbOperation("getAll");
      console.log("readAll:", res);
    },
    async deleteData() {
      await this.dbOperation("delete", 63535);
    },
    async putData() {
      const res = await this.dbOperation("get", 63535);
      const ress = await this.dbOperation("put", res);
      console.log("putdata", ress);
    },
    //删除数据库之前要先关闭数据库
    deleteDb(dbname) {
      // debugger;
      console.log(dbname);
      window.db.close();
      var delReq = window.indexedDB.deleteDatabase("testDatabaes");

      delReq.onerror = function (event) {
        console.log("删除数据库时出错.", event);
      };

      delReq.onblocked = function (event) {
        console.log("阻止删除数据库.", event);
      };

      delReq.onsuccess = function (event) {
        console.log("数据库删除成功", event);
      };
    },
  },
};
</script>