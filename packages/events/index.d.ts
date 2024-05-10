/** 事件触发器 */
interface QEvents {
  /** 添加监听 */
  on: (event: string, callback: Function, set?: boolean) => void;
  /** 添加一次性监听 */
  once: (event: string, callback: Function, set?: boolean) => void;
  /** 移除监听 */
  off: (event: string, callback?: Function) => void;
  /** 触发事件 */
  emit: (event: string, ...args: any[]) => void;
}

/** 创建事件对象 */
export const createEvents: () => QEvents;
