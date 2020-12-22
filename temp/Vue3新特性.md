Composition-api





性能提升1.2-2倍

1. diff优化。patchflag静态标记

2. 静态提升（hoistStatic）。不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用即可
3. 事件侦听器缓存（cacheHandlers）。

[vue-template翻译](https://vue-next-template-explorer.netlify.app/)