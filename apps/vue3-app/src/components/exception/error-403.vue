<template>
  <a-card class="exception-wrap">
    <div class="exception-img-wrap">
      <img class="exception-img" src="@/assets/exception/web-exception.svg" />
      <span class="exception-desc">
        抱歉，您没有被授权菜单权限，如有权限需求请联系管理员为您添加权限
      </span>
    </div>
  </a-card>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.exception-wrap {
  height: 100%;

  :deep(.ant-card-body) {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .exception-img-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .exception-desc {
    margin-top: 10px;
  }
}
</style>
