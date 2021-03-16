<template>
  <div class="layout-nav">
    <BellOutlined class="layout-header-icon" />
    <a-dropdown>
      <span class="dropdown-link" @click.prevent>
        <span class="dropdown-img-wrap">
          <img class="dropdown-img" src="~@/assets/avatar.png" />
        </span>
        <span class="dropdown-text">君惜</span>
      </span>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="#">
              <UserOutlined class="menu-item-icon" />
              个人中心
            </a>
          </a-menu-item>
          <a-menu-item>
            <a href="#">
              <SettingOutlined class="menu-item-icon" />
              个人设置
            </a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item>
            <a href="#">
              <LoginOutlined class="menu-item-icon" />
              退出登录
            </a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import { BellOutlined, UserOutlined, LoginOutlined, SettingOutlined } from '@ant-design/icons-vue'

export default {
  name: 'Nav',
  components: { BellOutlined, UserOutlined, LoginOutlined, SettingOutlined }
}
</script>

<style lang="scss" scoped>
.layout-nav {
  display: inline-flex;
  align-items: center;
}

.layout-header-icon {
  font-size: 20px;
  cursor: pointer;
  margin: 0 8px;
}

.dropdown-link {
  display: inline-block;
  height: 48px;
  line-height: 48px;
  cursor: pointer;
  margin: 0 16px;

  .dropdown-img-wrap {
    display: inline-block;
    width: 24px;
    vertical-align: top;
    margin-right: 8px;
  }
  .dropdown-img {
    width: 24px;
    height: 24px;
  }

  .dropdown-text {
    font-size: 16px;
  }
}

.menu-item-icon {
  margin-right: 8px;
}
</style>
