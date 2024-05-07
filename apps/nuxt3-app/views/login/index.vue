<template>
  <ClientOnly>
    <div class="user-layout box-border border-border">
      <div class="login-wrap">
        <div class="login">
          <div class="login-title">
            <img class="login-title-img" src="@/assets/logo.png" />
            <span class="login-title-text">{{ title }}</span>
          </div>
          <div class="text-text2 text-center mt-4 mb-12">
            Vue 是一款非常流行的 JavaScript 前端框架
          </div>
          <a-form
            ref="formRef"
            class="login-form"
            :model="form"
            :rules="rules"
            :colon="false"
            :label-col="{ flex: '50px' }"
            label-align="right"
          >
            <a-form-item class="login-form-item" label="" name="account">
              <a-input
                v-model:value.trim="form.account"
                size="large"
                :allow-clear="false"
                placeholder="账号：admin"
              >
                <template #prefix>
                  <UserOutlined class="text-primary text-3.5" type="user" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item class="login-form-item" label="" name="password">
              <a-input-password
                v-model:value.trim="form.password"
                size="large"
                type="password"
                :allow-clear="false"
                placeholder="密码：123456"
              >
                <template #prefix>
                  <LockOutlined class="text-primary text-3.5" type="user" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item label="">
              <a-checkbox v-model:checked="checked">自动登录</a-checkbox>
              <a class="float-right text-btn" href="#">忘记密码</a>
            </a-form-item>
            <a-form-item class="login-form-btn-wrap" label="">
              <a-button
                class="login-btn"
                size="large"
                type="primary"
                :loading="loading"
                @click="onSubmit"
              >
                登 录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
        <div class="footer">
          <div class="links">
            <a class="link" href="_self">帮助</a>
            <a class="link" href="_self">隐私</a>
            <a class="link" href="_self">条款</a>
          </div>
          <div class="copyright">Copyright © 2023-present 君惜 (xinlei3166)</div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { login } from '@/api'
import { setToken } from '@packages/utils'
import { useTheme } from '@packages/hooks/theme'
import { useMenuStore } from '@/store/menu'
import { useUserStore } from '@/store/user'

// ====================== Hooks ======================
const theme = useTheme()
const router = useRouter()
const route = useRoute()
const menuStore = useMenuStore()
const userStore = useUserStore()

// ====================== Components ======================
const title = import.meta.env.VITE_LOGIN_TITLE
const checked = ref(true)
const loading = ref(false)

const formRef = ref()
const form = reactive<Record<string, any>>({ userAccount: '', password: '' })
const rules = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const doLogin = async () => {
  loading.value = true
  const res = await login({
    account: form.userAccount,
    password: form.password
  })
  loading.value = false
  if (!res || res.code !== 0) return
  setToken(res.data.accessToken)
  let query = route.query
  let { redirect } = query
  if (redirect) {
    delete query.redirect
  }
  // let path = redirect ? decodeURIComponent(redirect) : '/'
  let path = '/'
  if (__DYNAMIC_MENU__) {
    await menuStore.setMenus()
  }
  await userStore.setUserinfo()
  await userStore.setPermissions()
  message.success({
    content: '登录成功',
    duration: 1,
    onClose: () => {
      router.push({
        path
        // query: {
        //   ...route.query
        // }
      })
    }
  })
}

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      await doLogin()
    })
    .catch(() => {})
}
</script>

<style lang="less" scoped>
.user-layout {
  overflow-y: auto;
  height: 100vh;
}

.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 110px 0 144px;
  background: url('@/assets/login-bg.svg');
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
}

.login {
  width: 368px;
  min-width: 260px;
  margin: 20px auto 0;

  .login-title {
    font-size: 34px;
    font-weight: 600;
    text-align: center;
  }

  .login-title-img {
    height: 44px;
    margin-right: 16px;
    vertical-align: top;
    border-style: none;
  }

  .login-title-text {
    display: inline-block;
    margin-top: 2px;
  }

  .login-form {
    width: 100%;
    margin-top: 40px;
    text-align: left;
  }

  .login-form-btn-wrap {
    margin-top: 24px;
    .login-btn {
      width: 100%;
    }
  }
}

.login-wrap .footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin: 48px 0 24px;
  padding: 0 16px;
  text-align: center;

  .links {
    margin-bottom: 8px;
  }

  .link {
    color: theme('colors.text2');
    transition: all 0.3s;
    &:not(:last-of-type) {
      margin-right: 40px;
    }
  }

  .copyright {
    color: theme('colors.text2');
  }
}
</style>
