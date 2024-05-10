# 使用方式

```ts
import { createSession, createStorage } from "qranyue-utils";
```

## 长效缓存

```ts
const local = createStorage({
  // 前缀
  prefix: "",
  // 缓存时长（毫秒）
  expire: 0
});
```
## 临时缓存

```ts
const session = createSession({
  // 前缀
  prefix: "",
});
```

### 设置缓存

```ts
local.set("key", "value");
sess.set("key", "value");
```

### 设置缓存（带过期时间）

```ts
local.set("key", "value", 1000 * 60 * 60 * 24);
```

### 获取缓存

```ts
local.get("key");
sess.get("key");
```

### 删除缓存

```ts
local.rm("key");
sess.rm("key");
```
