<template>
  <div>
    <div class="login-container">
      <el-card class="login-card">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
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
              v-model="ruleForm.username"
              placeholder="Username"
              type="text"
              autocomplete="off"
              prefix-icon="icon-aichong02"
            />
          </el-form-item>

          <el-form-item prop="pass">
            <span class="svg-container">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-aichong09"></use>
              </svg>
            </span>
            <el-input
              v-model="ruleForm.pass"
              type="password"
              autocomplete="off"
              prefix-icon="icon-aichong09"
              placeholder="Password"
            />
          </el-form-item>
          <el-form-item prop="verification">
            <el-input
              class="verification-left"
              v-model="ruleForm.verification"
              type="text"
              autocomplete="off"
              placeholder="请输入验证码"
            />
            <el-button class="verification-middle">获取验证码</el-button>
            <el-button type="info" plain class="verification-right"
              >忘记密码？</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login-button"
              type="primary"
              @click="submitForm(ruleFormRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
export default {
  setup() {
    let loading = ref(false)
    const username = ref("");
    const getVerification = ref("获取验证码");
    const reSend = ref("重新发送");
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive({
      pass: "",
      verification: "",
      username: "",
    });

    const checkAge = (rule: any, value: any, callback: any) => {
      if (!value) {
        return callback(new Error("Please input the age"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please input digits"));
        } else {
          if (value < 18) {
            callback(new Error("Age must be greater than 18"));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (ruleForm.verification !== "") {
          if (!ruleFormRef.value) return;
          ruleFormRef.value.validateField("verification", () => null);
        }
        callback();
      }
    };
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== ruleForm.pass) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };

    const rules = reactive({
      pass: [{ validator: validatePass, trigger: "blur" }],
      verification: [{ validator: validatePass2, trigger: "blur" }],
      age: [{ validator: checkAge, trigger: "blur" }],
    });

    const submitForm = (formEl: FormInstance | undefined) => {
      loading.value = true
      setTimeout(() => {
        loading.value=false
      }, 1000);
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };
    return {
      loading,
      username,
      ruleForm,
      submitForm,
      resetForm,
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
      width: 100%;
      height: 50px;
    }
  }
}
</style>
