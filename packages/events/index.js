/** 创建事件对象 */
export const createEvents = () => {
  /** 单例事件对象 */
  const one = new Map();
  /** 多例事件对象 */
  const ons = new Map();
  /** 事件索引 */

  /** 添加事件 */
  const addEvent = (event, callback) => {
    if ("function" !== typeof callback) throw new Error("callback must be a function");
    /** 添加事件 */
    if (!ons.has(event)) ons.set(event, new Set([callback]));
    else ons.get(event).add(callback);
  };
  /** 绑定事件 */
  const setEvent = (event, callback) => {
    if ("function" !== typeof callback) throw new Error("callback must be a function");
    /** 设置事件 */
    one.set(event, callback);
  };
  /** 移除事件 */
  const removeEvent = (event, callback) => {
    const callbacks = ons.get(event);
    if (!callbacks) return;
    if (typeof callback !== "function") callbacks.clear();
    else callbacks.delete(callback);
  };

  return {
    /** 添加监听 */
    on: (event, callback, set = false) => {
      /** 创建事件 */
      ({ true: setEvent, false: addEvent })[set](`on:${event}`, callback);
    },
    /** 添加一次性监听 */
    once: (event, callback, set = false) => {
      ({ true: setEvent, false: addEvent })[set](`once:${event}`, callback);
    },
    /** 移除监听 */
    off: (event, callback) => {
      if (!["undefined", "function"].includes(typeof callback)) throw new Error("callback must be a function");
      /** 移除多例 */
      removeEvent(`on:${event}`, callback);
      removeEvent(`once:${event}`, callback);
      /** 移除单例 */
      if (one.has(`on:${event}`)) one.delete(`on:${event}`);
      if (one.has(`once:${event}`)) one.delete(`once:${event}`);
    },
    /** 触发事件 */
    emit: (event, ...args) => {
      let cbs = ons.get(`on:${event}`);
      if (cbs) cbs.forEach((f) => f(...args));
      cbs = ons.get(`once:${event}`);
      if (cbs) {
        cbs.forEach((f) => f(...args));
        cbs.clear();
      }
      let cb = one.get(`on:${event}`);
      if (cb) cb(...args);
      cb = one.get(`once:${event}`);
      if (cb) {
        cb(...args);
        one.delete(`once:${event}`);
      }
    },
  };
};
