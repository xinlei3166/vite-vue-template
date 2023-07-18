<template>
  <div class="layout-nav">
    <!--    <BellOutlined class="layout-header-icon" />-->
    <a-dropdown placement="bottom">
      <span class="dropdown-link" @click.prevent>
        <span class="dropdown-img-wrap">
          <img class="dropdown-img" src="~@/assets/avatar.svg" />
        </span>
        <span class="dropdown-text">{{ userinfo.name }}</span>
      </span>
      <template #overlay>
        <a-menu>
          <!--          <a-menu-divider />-->
          <a-menu-item @click="onLogout">
            <LoginOutlined class="menu-item-icon" />
            退出登录
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { message } from 'ant-design-vue'
import { BellOutlined, UserOutlined, LoginOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { useTheme, useOpenRoute } from '@packages/hooks'
import { useUserStore } from '@/store/user'
import { removeToken } from '@packages/utils'

// ====================== Hooks ======================
const theme = useTheme()
const { openRoute } = useOpenRoute()
const userStore = useUserStore()

// ====================== Components ======================
const userinfo = computed(() => userStore.Userinfo)

const onLogout = () => {
  removeToken()
  message.success('退出成功')
  setTimeout(() => {
    openRoute('login')
  }, 300)
}
</script>

<style lang="less" scoped>
.layout-nav {
  display: inline-flex;
  align-items: center;
  margin-left: auto;
}

.layout-header-icon {
  font-size: 18px;
  cursor: pointer;
  margin: 0 8px;
}

.dropdown-link {
  display: inline-flex;
  height: v-bind('theme.height');
  line-height: v-bind('theme.height');
  cursor: pointer;
  margin: 0 16px;

  .dropdown-img-wrap {
    display: inline-flex;
    align-items: center;
    width: 30px;
    margin-right: 8px;
  }

  .dropdown-img {
    width: 30px;
    height: 30px;
  }

  .dropdown-text {
    font-size: 14px;
  }
}

.menu-item-icon {
  margin-right: 8px;
}

// theme
.layout-header-mix.dark,
.layout-header.dark,
html.dark .layout-header-mix {
  .dropdown-text,
  .layout-header-icon {
    color: #fff;
  }
}
</style>
