<template>
  <div class="layout-nav">
    <BellOutlined class="layout-header-icon" />
    <a-dropdown>
      <span class="dropdown-link">
        <span class="dropdown-img-wrap">
          <img class="dropdown-img" src="~@/assets/avatar.png" />
        </span>
        <span class="dropdown-text">{{ userinfo.name }}</span>
      </span>
      <template #overlay>
        <a-menu>
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
import { useTheme } from '@packages/hooks'
import { removeToken } from '@packages/utils'
import { logout } from '@/api'
import { useUserStore } from '@/store/user'
import { useMenuStore } from '@/store/menu'

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
  message.success({
    content: '退出登录成功',
    duration: 1,
    onClose: () => {
      removeToken()
      router.push('/login')
      userStore.cleanup()
      menuStore.cleanup()
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
