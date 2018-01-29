import {otherRouter, appRouter} from '@/router/router';
import Util from '@/libs/util';

const app = {
    state: {
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ]
    },
    mutations: {
        updateMenulist (state,resourceList) {
            state.menuList = resourceList;
        }
    },
    actions:{
        updateMenuList({commit}){
            return new Promise((resolve,reject) => {
                Util.ajax.post("/api/sys/main/userResource").then(function (response) {
                    let tempList = JSON.parse(JSON.stringify(appRouter));
                    commit('updateMenulist',routerFilter(tempList,response.data.resourceList?response.data.resourceList:[],""));
                    resolve();
                });
            });
        }
    }
};

/**
 * 权限过滤
 * @param router
 * @param resource
 * @param parentPath 父组件路径
 * @returns {Array}
 */
function routerFilter(router,resource,parentPath) {
    //console.log(parentPath);
    let resList = [];
    router.forEach(function (router) {
        let state = false;
        let pPath = parentPath+"/"+router.path.replace(/\//,"");
        resource.forEach(function (resourceItem) {
            //resourceItem.path.replace(/.*\//gi,"")
            if(resourceItem.name==router.title && resourceItem.path==pPath){
                state = true;
                return;
            }
        });
        if(!state){
            if(router.children!=undefined && router.children.length>0){
                router.children = routerFilter(router.children,resource,pPath);
                if(router.children.length>0){
                    resList.push(router);
                    //console.log(router);
                }
            }
        }else{
            if(router.children!=undefined && router.children.length>0){
                router.children = routerFilter(router.children,resource,pPath);
            }
            resList.push(router);
        }
    });
    return resList;
}

export default app;