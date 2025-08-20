import { RouterMount, createRouter } from 'uni-simple-router';
import store from '../store';
import { historyList } from "@/router/historyList.js";
import http from '@/utils/http2';
// console.log(ROUTES);
const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [...ROUTES],
});

let formatDate = (date) => {
	var date = new Date(date);
	var YY = date.getFullYear() + '-';
	var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
	var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	return YY + MM + DD +" "+hh + mm + ss;
}
// 记录历史记录防抖5秒延迟
let historyTimer = null;
// 特殊名单
const specialList = ['/novel_chapters/read','/movie_episode/playvideo'];

//全局路由前置守卫
router.beforeEach((to, from, next) => {
  const toPath = to.path.replace(/^\/pages[A-Z]?/, '');
  const historyItem = historyList.find(item => item.path == toPath);
  historyTimer && clearTimeout(historyTimer);
  if(historyItem){
    historyTimer = setTimeout(() => {
      let user_id = store.state.app.userInfo.user_id;
      const url = to.path.split('/')[2];
      http.request({
        url: `/${url}/get_obj`,
        method: 'GET',
        params: to.query,
      }).then(obj => {
        let isSpecial = specialList.includes(toPath);
        http.request({
          url: `/history/get_list`,
          method: 'GET',
          params: { user_id: user_id },
        }).then(history => {
          const list = history.result.list;
          // 判断是否存在历史记录
          let isExist = list.find(item => {
            // 特殊的名单处理
            if(isSpecial){
              const fullPath = to.fullPath;
              const path = fullPath.replace(/&currentChapterIndex=\d+/, '');
              return item.path == path;
            }
            return item.path == to.fullPath;
          })
          // 如果存在历史记录，则更新
          if(isExist){
						const param = {
              update_time: formatDate(new Date())
            };
            http.request({
              url: `/history/set?history_id=${isExist.history_id}`,
              method: 'POST',
              data: param,
            }).then((res) => {
              console.log("更新历史结果：", res);
            });
					}else {
            const param = {
              user_id: user_id,
              title: historyItem.titleKey ? obj.result.obj[historyItem.titleKey] : null,
              img: historyItem.imgKey ? obj.result.obj[historyItem.imgKey] : null,
              path: to.fullPath,
              type: historyItem.type,
              source_table: obj.result.obj.source_table || url,
              source_field: obj.result.obj.source_field || url + '_id',
              source_id: isSpecial ? to.query.move_info_id || to.query.novel_reading_id : to.query[url + '_id'],
              params: JSON.stringify(obj.result.obj)
            };
            http.request({
              url: `/history/add`,
              method: 'POST',
              data: param,
            }).then((res) => {
              console.log("添加历史结果：", res);
            });
          }
        })
      });
    }, 5000);
  }

  if (to.meta?.noAuth) {
    if (!store.state.app.token) {
      store.dispatch('auth/getUserAuth').then(() => {
        next();
      });
    } else {
      store
        .dispatch('auth/getUserInfo')
        .then(() => {
          next();
        })
        .catch(() => {
          store.dispatch('auth/logOut');
          next({
            path: '/pagesB/account/login',
          });
        });
    }
  } else {
    if (store.state.app.token) {
      store
        .dispatch('auth/getUserInfo')
        .then(() => {
          next();
        })
        .catch(() => {
          store.dispatch('auth/logOut');
          next({
            path: '/pagesB/account/login',
          });
        });
    } else {
      next({
        path: '/pagesB/account/login',
      });
    }
  }
});
// 全局路由后置守卫
router.afterEach((to, from) => {
  console.log('跳转结束');
});

export { router, RouterMount };
