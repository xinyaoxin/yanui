/**
 * 一、比对路由权限
 * 二、指定默认路由
 */


export function recursionRouter(userRouter:[], allRouter:any) {
    let relRoutes: any = []
    allRouter.forEach((v: any) => {
        userRouter.forEach((item: any) => {
            if (item.name == v.meta.name) {
                if (item.children && item.children.length > 0) {
                    v.children = recursionRouter(item.children, v.children)
                }
                relRoutes.push(v)
            }
        })
    })
    return relRoutes
}

//指定默认路由
export function setDefaultRoute(routes: any) {
    routes.forEach((v: any, i: any) => {
        if (v.children && v.children.length > 0) {
            v.redirect = { name: v.children[0].name }
            setDefaultRoute(v.children)
        }
    })
}