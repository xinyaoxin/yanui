// 定义所有路由

// 商品管理管理
const goodsClass = () => import('../views/goods-manage/goods-class/index.vue')
const goodsSmall = () =>import ('../views/goods-manage/goods-small/index.vue')
const goodsList = () => import ('../views/goods-manage/goods-list/index.vue')

//Echarts
const echartsNotes = () => import('../views/echarts-notes/index.vue')

//需要判断得路由
const dynamicRoutes = [
    {
        path:'/goodsclass',
        component: goodsClass,
        name:'good-class',
        meta:{
            name:'商品管理'
        },
        children:[
            {
                path:'/goodssmall',
                name:'goods-small',
                component:goodsSmall,
                meta:{
                    name:'小商品类别'
                }
            },
            {
                path:'/goodslist',
                name:'goods-list',
                component:goodsList,
                meta:{
                    name:'商品列表'
                }
            }
        ]

    },
    {
        path:'/echarts-notes',
        component: echartsNotes,
        name:'echarts-notes',
        meta:{
            name:'Echarts笔记'
        }
    }
]
export default dynamicRoutes