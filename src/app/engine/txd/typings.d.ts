// 声明 react-object-view 模块
declare module 'react-object-view' {
  // 假设该模块导出一个默认组件
  export function ObjectView(props: {
    // 这里可以定义组件的属性
    data: any; // 假设组件接受一个 data 属性，类型为任意类型
    // 可以根据实际情况添加更多属性
  }): JSX.Element;
}