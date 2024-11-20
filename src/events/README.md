# 使用方式

```ts
import { createEvents } from "qrany-utils";
const events = createEvents();
```

## 监听事件

```ts
const event = (data) => {
  console.log(data);
};
events.on("event:name", event);
```

### 监听唯一化（第二次设置时，原有监听被替换）

```ts
events.on("event:name", event, true);
```

## 监听事件（触发后不再监听）

```ts
events.once("event:name", event);
```

### 监听唯一化（第二次设置时，原有监听被替换）

```ts
events.once("event:name", event, true);
```

## 触发事件

```ts
events.emit("event:name", { data: "hello" });
```

## 取消监听

```ts
events.off("event:name");
```

## 取消监听下的特定事件

```ts
events.off("event:name", event);
```
