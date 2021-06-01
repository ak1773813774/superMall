export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldProduct) {
                context.commit('addCount', oldProduct)
                resolve('商品数量+1');
            } else {
                context.commit('addCart', payload)
                resolve('成功加入购物车')
            }
        })
    }
}