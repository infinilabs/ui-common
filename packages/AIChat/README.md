# @infinilabs/ai-chat

这是一个 AI Chat 组件库，用于在 React 应用中集成 AI 聊天功能。

## 项目简介

1. 项目是 pnpm 项目，执行命令需要用 pnpm
2. 项目是 AI Chat 组件库，最后是需要 pnpm build 之后部署发布 npm 库的

## 对外的参数

1. 需要获取历史数据的方法，支持组件内部调用获取数据
```ts
const [_error, res] = await Get(`/chat/_history`, {
    from: 0,
    size: 100,
});
```
2. 需要删除历史记录的方法，支持组件内部调用操作数据
3. 需要获取小助手列表数据的方法，支持组件内部调用获取数据
4. 需要创建新的会话的方法，支持组件内部调用获取第一次聊天的数据
```ts
await streamPost({
    url: "/chat/_create",
    body: { message },
    queryParams,
    onMessage: (line) => {
    // console.log("⏳", line);
    handleChatCreateStreamMessage(line);
    // append to chat box
    },
});
```
5. 需要继续聊天的方法，支持组件内部调用获取继续聊天的数据
```ts
await streamPost({
    url: `/chat/${newChat?._id}/_chat`,
    body: { message },
    queryParams,
    onMessage: (line) => {
    // console.log("line", line);
    handleChatCreateStreamMessage(line);
    // append to chat box
    },
});
```
6. 需要取消聊天的方法，支持组件内部调用取消聊天
```ts
const [_error, res] = await Post(
    `/chat/${activeChat?._id}/_cancel?message_id=${curIdRef.current}`,
    undefined
);
```
7. 需要每个聊天会话都有历史记录，历史记录包含用户输入和小助手回复
```ts
const [_error, res] = await Get(`/chat/${chat?._id}/_history`, {
    from: 0,
    size: 1000,
});
response = res;
```
8. 需要打开聊天会话的方法，支持组件内部调用打开聊天会话
```ts
const [_error, res] = await Post(`/chat/${chat?._id}/_open`, {});
response = res;
```
9. 需要关闭聊天会话的方法，支持组件内部调用关闭聊天会话
```ts
const [_error, res] = await Post(`/chat/${chat?._id}/_close`, {});
response = res;
```

## 包含组件

1. 独立历史列表组件（支持选择、重命名、删除、刷新、搜索）
2. 独立小助手列表组件（支持选择、翻页、搜索）
3. 独立 AI Chat 聊天组件（组件会话渲染 采用 "@infinilabs/chat-message": "workspace:*" 这个组件）

外部用户使用的时候，可以自由拼装，自己根据需要选择使用哪个组件。


