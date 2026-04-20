<template>
  <div class="layout-nav">
    <t-icon name="notification" class="layout-header-icon" />
    <t-dropdown maxColumnWidth="150px">
      <span class="dropdown-link">
        <span class="dropdown-img-wrap">
          <img class="dropdown-img" src="@/assets/avatar.png" />
        </span>
        <span class="dropdown-text">{{ userinfo.name }}</span>
      </span>
      <t-dropdown-menu>
        <t-dropdown-item>
          <t-icon name="user" class="menu-item-icon" />
          <span>个人中心</span>
        </t-dropdown-item>
        <t-dropdown-item>
          <t-icon name="setting-1" class="menu-item-icon" />
          <span>个人设置</span>
        </t-dropdown-item>
        <t-dropdown-item @click="onLogout">
          <t-icon name="logout" class="menu-item-icon" />
          <span>退出登录</span>
        </t-dropdown-item>
      </t-dropdown-menu>
    </t-dropdown>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { MessagePlugin } from 'tdesign-vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from '@packages/hooks'
import { removeToken } from '@packages/utils'
import { logout } from '@/api'
import { useMenuStore } from '@/store/menu'
import { useUserStore } from '@/store/user'

// ====================== Hooks ======================
const theme = useTheme()
const router = useRouter()
const userStore = useUserStore()
const menuStore = useMenuStore()

// ====================== Components ======================
const userinfo = computed(() => userStore.Userinfo)

const onLogout = async () => {
  const res = await logout()
  if (!res || res.code !== 0) return
  MessagePlugin.success({
    content: '退出登录成功',
    duration: 1,
    onClose: () => {
      removeToken()
      userStore.cleanup()
      menuStore.cleanup()
      router.push('/login').catch(() => {})
    }
  })
}
</script>

<style lang="less" scoped>
.layout-nav {
  display: inline-flex;
  align-items: center;
  margin-left: auto;
}

.layout-header-icon {
  font-size: 16px;
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
    width: 24px;
    margin-right: 8px;
  }
  .dropdown-img {
    width: 24px;
    height: 24px;
  }

  .dropdown-text {
    font-size: 14px;
  }
}

.menu-item-icon {
  font-size: 16px;
  vertical-align: -0.15em !important;
  margin-right: 8px;
}

// theme
.layout-header-mix.dark,
.layout-header.dark {
  .dropdown-text,
  .layout-header-icon {
    color: #fff;
  }
}

html.dark .layout-header-mix {
  .dropdown-text,
  .layout-header-icon {
    color: #fff;
  }
}
</style>
