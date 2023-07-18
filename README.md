# vite-vue-template

这个模板可以帮助你快速使用 `Vue3`, `TypeScript` 和 `Vite` 进行项目开发。

**安装pnpm**

```javascript
npm i -g pnpm 
```

**起步**

执行这个命令安装完依赖，apps目录下的应用可以正常启动。

```javascript
pnpm i 
```

**安装依赖**

```javascript
pnpm i -w pkgName
```

递归每个package安装
```javascript
pnpm i -w -r pkgName
```

**给子包安装指定依赖**
```javascript
pnpm -F @packages/components add lodash
```

**package间的相互引用**
```javascript
pnpm -F @packages/components add @packages/utils
```


**项目结构**
```javascript
├── base
├── apps // web项目及子应用
├── features // 可复用的页面组件代码
├── packages // 常用工具和库
│   ├── components
│   ├── hooks
│   ├── lib
│   ├── plugins
│   ├── styles
│   ├── types
│   └── utils
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
└── tsconfig.json
```
