import http from '@/utils/http2';
import { getListParams } from './params/common';

/**
 * 获取首页点赞
 */
export const getPraiseListApi = (params) => {
  return http.request({
    url: `/praise/list_group`,
    method: 'GET',
    custom: {
      isDeduplication: false,
      isLoading: true,
    },
    params,
  });
};

/**
 * 获取首页轮播图列表
 */
export const gethomeSlidesListApi = (params) => {
  params = Object.assign(getListParams(), params);
  return http.request({
    url: `/slides/get_list`,
    method: 'GET',
    custom: {
      isDeduplication: false,
      isLoading: true,
    },
    params,
  });
};

/**
 * 获取首页菜单
 */
export const getMenuListApi = (params) => {
  return http.request({
    url: `/auth/get_list`,
    method: 'GET',
    custom: {
      isDeduplication: false,
      isLoading: true,
    },
    params,
  });
};
/**
 * 获取首页论坛列表
 */
export const getHomeForumListApi = (params) => {
  params = Object.assign(getListParams(), params);
  return http.request({
    url: `/forum/get_list`,
    method: 'GET',
    custom: {
      isDeduplication: false,
      //   isLoading: false,
    },
    params,
  });
};
/**
 * 获取首页新闻资讯列表
 */
export const getHomeArticleListApi = (params) => {
  params = Object.assign(getListParams(), params);
  return http.request({
    url: `/article/get_list`,
    method: 'GET',
    custom: {
      isDeduplication: false,
      //   isLoading: false,
    },
    params,
  });
};
/**
 * 获取公告列表
 */
export const getHomeNoticeListApi = (params) => {
  params = Object.assign(getListParams(), params);
  return http.request({
    url: `/notice/get_list`,
    method: 'GET',
    custom: {
      isDeduplication: false,
      //   isLoading: false,
    },
    params,
  });
};

/**
 * 获取商品列表
 */
export const getHomeGoodsListApi = (params) => {
  let url = "/goods/get_list";
      	      	      	      	      	      	      	      	      	      	      	      	    params = Object.assign(getListParams(), params);
  return http.request({
    url: url,
    method: 'GET',
    custom: {
      isDeduplication: false,
    },
    params,
  });
};

/**
 * 获取商品搜索列表
 */
export const getHomeGoodsSearchListApi = (params) => {
  let url = "/goods/get_list";
  params = Object.assign(getListParams(), params);
  return http.request({
    url: url,
    method: 'GET',
    custom: {
      isDeduplication: false,
    },
    params,
  });
};


            /**
   * 获取定制商品
   */
  export const get_customized_products_api = (params) => {
    let url = "/customized_products/get_list";
    let oNowDate = dateFormat("yyyy-MM-dd hh:mm:ss") + "";
    params.timing_start_time_max = oNowDate;
    params.timing_end_time_min = oNowDate;
    params.like = 0;
    let url_get_list = "/customized_products/get_list";
    url = url_get_list;
    params.examine_state = "已通过";
    return http.request({
      url: url,
      method: 'GET',
      custom: {
        isDeduplication: false,
      },
      params,
    });
  };
          /**
   * 获取影视小说
   */
  export const get_film_and_television_novels_api = (params) => {
    let url = "/film_and_television_novels/get_list";
    return http.request({
      url: url,
      method: 'GET',
      custom: {
        isDeduplication: false,
      },
      params,
    });
  };
          
/**
 * 获取首页分类列表
 */
export const getHomeClassificationListApi = (params) => {
  params = Object.assign(getListParams(), params);
  return http.request({
    url: `/classification_information/get_list`,
    method: 'GET',
    custom: {
      isDeduplication: false,
      //   isLoading: false,
    },
    params,
  });
};

/**
 * 获取友情连接列表
 */
export const getHomeLinkListApi = (params) => {
  params = Object.assign(getListParams(), params);
  return http.request({
    url: `/link/get_list`,
    method: 'GET',
    custom: {
      isDeduplication: false,
      //   isLoading: false,
    },
    params,
  });
};


function dateFormat(fmt) {
  var myDate = new Date();
  var o = {
    "M+": myDate.getMonth() + 1, // 月份
    "d+": myDate.getDate(), // 日
    "h+": myDate.getHours(), // 小时
    "m+": myDate.getMinutes(), // 分
    "s+": myDate.getSeconds(), // 秒
    "q+": Math.floor((myDate.getMonth() + 3) / 3), // 季度
    S: myDate.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
            RegExp.$1,
            (myDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                      ? o[k]
                      : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}
