import { permission } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { DynamicRoutes } from '@/router'
import dynamicRoutes from '@/router/dynamic-routes'
import { recursionRouter, setDefaultRoute } from '@/utils/recursion-router'

const state = {
    permissionList: [],
    sidebarMenu: [],
    currentMenu: ''
}

const mutations = {
    SET_PERMISSION: (state: any, routes: string) => {
        console.log(routes)
        state.permissionList = [...routes]
        console.log('设置路由routes:', state.permissionList)
    },

    CLEAR_PERMISSION: (state: any) => {
        state.permissionList = ''
    },

    SET_MENU: (state: any, menu: any) => {
        state.sidebarMenu = menu
    },
    CLEAR_MENU: (state: any) => {
        state.sidebarMenu = []
    },
}

const actions = {
    async storePermission({ commit }: any, userInfo: string) {
        const params = {
            "username": userInfo
        }
        let permissionList = await permission(params);

        // 筛选
        let permissionListArr = permissionList.data.data
        let routes = recursionRouter(permissionListArr, dynamicRoutes);
        let MainContainer = DynamicRoutes.find(v => v.path === "/");
        let children = MainContainer?.children;
        children?.push(...routes)

        // 生成菜单
        commit("SET_MENU", children);

        // 设置默认路由
        setDefaultRoute([MainContainer]);
        // 初始化路由
        let initialRoutes = router.options.routes;
        DynamicRoutes.forEach((item)=>{
            router.addRoute(item)
        })
        commit("SET_PERMISSION", [...initialRoutes, ...DynamicRoutes])
    }


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

