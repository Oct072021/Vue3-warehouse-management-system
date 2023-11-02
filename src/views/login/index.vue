<template>
  <div class="login-container">
    <video
      poster="@/assets/login/video-cover.jpeg"
      loop
      autoplay
      muted
    >
      <source src="@/assets/login/night.mp4" />
    </video>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ t(`login.name`) }}</h3>
        <h3
          class="title"
          style="margin-bottom: 10px"
        >
          {{ t(`login.loginForm`) }}
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-tooltip
        v-model:visible="capsTooltip"
        content="Caps lock is On"
        placement="right"
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <SvgIcon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="passwordRef"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter="handleLogin(loginFormRef)"
          />
          <span
            class="show-pwd"
            @click="showPwd"
          >
            <SvgIcon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin(loginFormRef)"
        >{{ t(`login.login`) }}</el-button
      >

      <div style="position: relative">
        <div class="tips">
          <span style="margin-right: 63px">{{ t(`login.username`) }} : admin</span>
          <span>{{ t(`login.password`) }} : {{ t(`login.any`) }}</span>
        </div>
        <div class="tips">
          <span style="margin-right: 18px">{{ t(`login.username`) }} : dataOperator</span>
          <span>{{ t(`login.password`) }} : {{ t(`login.any`) }}</span>
        </div>
        <div class="tips">
          <span style="margin-right: 32px">{{ t(`login.username`) }} : accountant</span>
          <span>{{ t(`login.password`) }} : {{ t(`login.any`) }}</span>
        </div>
        <el-button
          class="thirdparty-button"
          type="primary"
          @click="showDialog = true"
          >{{ t(`login.thirdparty`) }}</el-button
        >
      </div>
    </el-form>

    <el-dialog
      :title="t(`login.thirdparty`)"
      :visible.sync="showDialog"
    >
      {{ t(`login.thirdpartyTips`) }}
      <br />
      <br />
      <br />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { validUsername } from '@/utils/validate'

import { LoginForm } from './data.d'

import { useUserStore } from '@/store/user'

import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { LocationQueryRaw, LocationQueryValue, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { FormInstance, FormRules } from 'element-plus'

emit: ['keyup', 'keyup.enter']

const { t } = useI18n()
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const redirect = ref<LocationQueryValue | LocationQueryValue[]>()
const otherQuery = ref<LocationQueryRaw>({})

const xx = ref<string>('admin')
// login related
const loginForm = reactive<LoginForm>({
  username: 'admin',
  password: '111111',
})
const loginFormRef = ref()
const usernameRef = ref()
const passwordRef = ref()
const loading = ref<boolean>(false)
const validateUsername = (rule: FormRules, value: string, callback: Function) => {
  if (!validUsername(value)) {
    callback(new Error('Please enter the correct user name'))
  } else {
    callback()
  }
}
const validatePassword = (rule: FormRules, value: string, callback: Function) => {
  if (value.length < 6) {
    callback(new Error('The password can not be less than 6 digits'))
  } else {
    callback()
  }
}
const loginRules = reactive({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
})
const passwordType = ref<string>('password')
const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    passwordRef.value.focus()
  })
}
const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      // Pinia use login method
      userStore
        .login(loginForm)
        .then(() => {
          // return value => next page
          router.push({
            path: (redirect.value as LocationQueryValue) || '/',
            query: otherQuery.value,
          })
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

// caps check
const capsTooltip = ref<boolean>(false)
const checkCapslock = (e: KeyboardEvent) => {
  const { key } = e
  capsTooltip.value = !!key && key.length === 1 && key >= 'A' && key <= 'Z'
}

const getOtherQuery = (query: LocationQueryRaw) => {
  return Object.keys(query).reduce((acc: { [index: string]: any }, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}
watch(
  route,
  (route) => {
    const query = route.query
    if (query) {
      redirect.value = query.redirect
      otherQuery.value = getOtherQuery(query)
    }
  },
  { immediate: true }
)

const showDialog = ref<boolean>(false)

onMounted(() => {
  if (loginForm.username === '') {
    usernameRef.value.focus()
  } else if (loginForm.password === '') {
    passwordRef.value.focus()
  }
})
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input {
    input {
      color: $cursor;
    }
    input::first-line {
      color: $light_gray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    // cancel border and background-color
    .el-input__wrapper {
      background-color: transparent;
      box-shadow: none;
      border: none;
    }

    input {
      height: 47px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      caret-color: $cursor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  // background-color: $loginBg;
  video {
    position: absolute;
    /* Vertical and Horizontal center*/
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
