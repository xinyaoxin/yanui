<template>
  <div>
    <div class="login-container">
      <el-card class="login-card">
        <el-form
          ref="ruleFormRef"
          :model="formContent"
          status-icon
          :rules="rules"
          class="login-form"
        >
          <div class="login-title">
            <h3 class="title">Login Form</h3>
          </div>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-aichong02"></use>
              </svg>
            </span>
            <el-input
              v-model="formContent.username"
              placeholder="Username"
              type="text"
              autocomplete="off"
              prefix-icon="icon-aichong02"
            />
          </el-form-item>

          <el-form-item prop="pass">
            <span class="svg-container">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-aichong24"></use>
              </svg>
            </span>
            <el-input
              v-model="formContent.pass"
              type="password"
              autocomplete="off"
              prefix-icon="icon-aichong09"
              placeholder="Password"
            />
          </el-form-item>
          <el-form-item prop="verification">
            <el-input
              class="verification-left"
              v-model="formContent.verification"
              type="text"
              autocomplete="off"
              placeholder="请输入验证码"
            />
            <el-button class="verification-middle" @click="getVerification"
              >获取验证码</el-button
            >
            <el-button type="info" plain class="verification-right"
              >忘记密码？</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login-button"
              type="primary"
              @click="handleLogin(ruleFormRef)"
            >
              {{ $t("common.login") }}</el-button
            >
            <el-button class="login-reset" @click="resetForm(ruleFormRef)">{{
              $t("common.reset")
            }}</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, computed, getCurrentInstance, onMounted } from "vue";
import type { FormInstance } from "element-plus";
import { useStore } from "vuex";
import { login, logout, getInfo } from "@/api/user";

export default {
  setup() {
    let instance: any;
    let _this: any;
    const store = useStore();
    let loading = ref(false);
    //   const username = ref("");
    //   const getVerification = ref("获取验证码");
    //   const reSend = ref("重新发送");
    const ruleFormRef = ref<FormInstance>();
    //   //表单内容
    const formContent = reactive({
      username: "",
      pass: "",
      verification: "",
    });

    //   //验证规则
    const usenameReg = /^[a-zA-Z]{3,6}$/;
    const passReg = /^[0-9]{6,9}$/;

    //获取全局this
    const initThis = () => {
      instance = getCurrentInstance();
    };
    onMounted(() => {
      initThis();
      if (instance !== null) {
        _this = instance.appContext.config.globalProperties; //vue3获取当前this
      }
    });

    const validateUsername = (rule: any, value: any, callback: any) => {
      const regTest = usenameReg.test(value);
      console.log("validateUsername", regTest);
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!regTest) {
        callback(new Error("请输入正确的用户名"));
      } else {
        // 关联验证verification，当username触发blur的时候会再次验证verification
        //此处不需要
        // if (formContent.verification !== "") {
        //   if (!ruleFormRef.value) return;
        //   ruleFormRef.value.validateField("verification", () => null);
        // }
        callback();
      }
    };

    const validatePass = (rule: any, value: any, callback: any) => {
      const regTest = passReg.test(value);
      console.log("Passreg", regTest);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!regTest) {
        callback(new Error("用户名和密码不匹配"));
      } else {
        if (formContent.verification !== "") {
          if (!ruleFormRef.value) return;
          ruleFormRef.value.validateField("verification", () => null);
        }
        callback();
      }
    };

    const validateVerification = (rule: any, value: any, callback: any) => {
      console.log("validateVerification");
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== "1111") {
        //这里应该是不等于后端返回的验证码
        callback(new Error("验证码错误"));
      } else {
        callback();
      }
    };

    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      pass: [{ validator: validatePass, trigger: "blur" }],
      verification: [{ validator: validateVerification, trigger: "blur" }],
    });

    //登录
    const handleLogin = (formEl: FormInstance) => {
      console.log("this is formContent", formContent);
      if (!formEl) return;
      formEl.validate((valid) => {
        loading.value = true;
        login(formContent).then((res) => {
          const usrInfo = res.data.data;
          console.log("*****************1", usrInfo);
          store.dispatch("user/storeLogin", usrInfo);
          loading.value = false;
          store.dispatch("permission/storePermission", store.state.user.token)
          _this.$router.push("/")
        });
        if (valid) {
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    const resetForm = (formEl: FormInstance) => {
      store.commit("user/SET_NAME", "yxx");
      console.log(store.getters["user/token"]);
      if (!formEl) return;
      formEl.resetFields();
    };

    const getVerification = () => {
      console.log("token:", store.state.user.token);
      console.log("name:", store.state.user.name);
    };

    return {
      loading,
      formContent,
      ruleFormRef,
      resetForm,
      rules,
      handleLogin,
      getVerification,
    };
  },
};
</script>

<style lang='scss'>
.login-container {
  position: relative;
  top: 30px;
  width: 100%;
  height: 500px;

  .login-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
  }

  .login-title {
    .title {
      font-size: 26px;
      margin: 0px auto 30px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .svg-container {
    display: inline-block;
    .svg-icon {
      position: absolute;
      top: 12px;
      left: 6px;
      font-size: 25px;
      z-index: 10;
    }
  }

  .login-form {
    width: 55%;
    margin: 0 auto;
    .el-input {
      height: 50px;
    }
    .verification-left {
      width: 160px;
    }
    .verification-middle {
      height: 50px;
      width: 90px;
      margin-left: 30px;
    }
    .verification-right {
      height: 50px;
    }
    .login-button {
      width: 71%;
      height: 50px;
    }
    .login-reset {
      width: 25.5%;
      height: 50px;
    }
  }
}
</style>
