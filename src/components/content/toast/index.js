import Toast from './Toast'
const obj = {}

obj.install = function (Vue) {
    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)
    // 2.以new的方式  根据组件构造器 创建一个组件对象
    const toast = new toastContrustor();
    // 3.把组件对象手动挂载到某一个元素中
    toast.$mount(document.createElement('div'))
    // 4.toast.$el就是对应的div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj