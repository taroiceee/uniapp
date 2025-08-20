<template>
  <view id="home" class="page_home" :style="{ paddingTop: vuex_custom_bar_height + 'px' }">
	<view class="header_bg"></view>
    <tn-nav-bar fixed :isBack="false">
      <view class="nav-wrapper">
        <view class="nav-user" @click="$navTo('/pages/user/info')">
          <image :src="$fullImgUrl(userInfo.avatar) || '/static/img/default.png'"></image>
        </view>
        <view class="tabs">
          <view :class="['tab-item', tabIndex === 0 ? 'active' : '']" @click="onClickTab(0)">
            <view class="name">推荐</view>
            <view class="active-flag" v-if="tabIndex === 0"> </view>
          </view>
                    <view :class="['tab-item', tabIndex === 5 ? 'active' : '']" @click="onClickTab(5)" v-if="$check_action('/customized_products/list', 'get')">
            <view class="name">定制商品</view>
            <view class="active-flag" v-if="tabIndex === 5"> </view>
          </view>
                  <view :class="['tab-item', tabIndex === 8 ? 'active' : '']" @click="onClickTab(8)" v-if="$check_action('/film_and_television_novels/list', 'get')">
            <view class="name">影视小说</view>
            <view class="active-flag" v-if="tabIndex === 8"> </view>
          </view>
                  </view>
      </view>
    </tn-nav-bar>

    <view class="tab-pane" v-show="tabIndex === 0">
      <view class="search-wrapper" @click.stop="$navTo('/pages/search/index')">
        <Search disabled placeholder="搜索内容" @cancel="cancel" />
      </view>

      <view class="scroll-x">
        <view class="left">
          <scroll-view class="scroll-view" :style="[!isExpand ? expandStyle : '']" scroll-x="true">
		    <view class="item">
		      推荐
		    </view>
            <view
              class="item"
              @click="clickMore(item.path)"
              v-for="(item, index) in list_menu"
              :key="index"
			   v-if="$check_action(item.path,'get') || item.path == '/chat/index'"
            >
              {{ item.mod_name }}
            </view>
          </scroll-view>
        </view>
        <view class="right">
          <view class="iconfont icon-liebiao" @click="isExpand = !isExpand"></view
        ></view>
      </view>

      <!-- 轮播图模块(开始) -->
      <view class="swiper">
        <Slide :list="list_slide" :show_title="true" />
      </view>
      <!-- 轮播图模块(结束) -->

      <!-- 菜单模块(开始) -->
      <view class="menu" v-if="list_menu.length > 0">
        <list_menu :list="list_menu"></list_menu>
      </view>
      <!-- 菜单模块(结束) -->
    <!-- 广告模块(开始) -->
    <view>
      <list_ad :list="list_ad" location="顶部广告"></list_ad>
    </view>
    <!-- 广告模块(结束) -->
      <!-- 商城资讯模块(开始) -->
      <Card
        v-if="$check_action('/article/list', 'get')"
        title="商城资讯"
        url="/pages/article/index"
	    toTab
        :list="list_article"
        class="article_list"
      >
        <view class="scroll-category">
          <scroll-view class="scroll-view" scroll-x="true">
            <view
              :class="['category-item', activeArticle == item.value ? 'active' : '']"
              @click="onClickCategory(item.value)"
              v-for="(item, index) in types_article"
              :key="index"
            >
              {{ item.value }}</view
            >
          </scroll-view>
        </view>
        <list_article :list="list_article"></list_article>
      </Card>
      <view class="split-line"></view>
      <!-- 商城资讯模块(结束) -->
    <!-- 广告模块(开始) -->
    <view>
      <list_ad :list="list_ad" location="中部广告"></list_ad>
    </view>
    <!-- 广告模块(结束) -->
      <!-- 商品模块(开始) -->
      <Card
        v-if="$check_action('/goods/list', 'get')"
        class="goods_list"
        title=" 水果商城 "
        url="/pagesA/goods/list"
        :list="list_goods"
      >
        <view class="scroll-category">
          <scroll-view class="scroll-view" scroll-x="true">
            <view
              :class="['category-item', activeGoods == item.value ? 'active' : '']"
              @click="onClickGoods(item.value)"
              v-for="(item, index) in types_goods"
              :key="index"
            >
              {{ item.value }}</view
            >
          </scroll-view>
        </view>

        <list_goods :list="list_goods"></list_goods>
      </Card>
      <view class="split-line"></view>
      <!-- 商品模块(结束) -->
	  <view class="home_recommend">
          		<Card
		  v-if="$check_action('/customized_products/list', 'get')"
		  class="list_diy"
		  title="定制商品"
		  url="/pagesC/customized_products/list"
		  :list="list_customized_products"
		>
		  <list_customized_products :list="list_customized_products"></list_customized_products>
		</Card>
        		<Card
		  v-if="$check_action('/film_and_television_novels/list', 'get')"
		  class="list_diy"
		  title="影视小说"
		  url="/pagesC/film_and_television_novels/list"
		  :list="list_film_and_television_novels"
		>
		  <list_film_and_television_novels :list="list_film_and_television_novels"></list_film_and_television_novels>
		</Card>
          	  </view>
      <Card
        v-if="$check_action('/notice/list', 'get')"
        class="notice_list list_diy"
        title="网站公告"
        url="/pages/notice/list"
        :list="list_notice"
      >
        <view class="gg-list-wrap">
          <view
            class="gg-list-item"
            v-for="(o, i) in list_notice"
            :key="i"
            @click="$navTo('/pages/notice/details?notice_id=' + o['notice_id'])"
          >
            <view class="content">
              <text class="num">{{ i + 1 }}.</text>
              <text class="title">{{ o.title }}</text>
            </view>
			<view class="time"> {{ $toTime(o.create_time, "yyyy-MM-dd hh:mm:ss") }}</view>
			<rich-text class="desc" :nodes="$setRichTextImage(o.content)"></rich-text>
          </view>
        </view>
      </Card>

      <view class="split-line"></view>
      <!-- 推荐通知公告模块(结束) -->
    <!-- 广告模块(开始) -->
    <view class="ads">
      <list_ad :list="list_ad" location="底部广告"></list_ad>
    </view>
    <!-- 广告模块(结束) -->
      <!-- 链接模块(开始) -->
      <view class="list-box">
        <list_link :list="list_link"></list_link>
      </view>
      <!-- 链接模块(结束) -->

      <!-- 版权模块(开始) -->
      <view class="copyright">
        <text>@版权归属 XX 所有</text>
      </view>
      <!-- 版权模块(结束) -->
    </view>

              <view class="tab-pane" v-show="tabIndex === 5">
      <view class="split-line"></view>
      <view
        v-if="$check_action('/customized_products/list', 'get')"
        class="list_diy"
        url="/pagesC/customized_products/list"
      >
        <list_customized_products :list="list_customized_products"></list_customized_products>
      </view>
      <view class="see-more">
        <view @click="$navTo('/pagesC/customized_products/list')">
          查看更多<text class="iconfont icon-right"></text>
        </view>
      </view>

      <view class="split-line"></view>
    </view>
            <view class="tab-pane" v-show="tabIndex === 8">
      <view class="split-line"></view>
      <view
        v-if="$check_action('/film_and_television_novels/list', 'get')"
        class="list_diy"
        url="/pagesC/film_and_television_novels/list"
      >
        <list_film_and_television_novels :list="list_film_and_television_novels"></list_film_and_television_novels>
      </view>
      <view class="see-more">
        <view @click="$navTo('/pagesC/film_and_television_novels/list')">
          查看更多<text class="iconfont icon-right"></text>
        </view>
      </view>

      <view class="split-line"></view>
    </view>
          
    <!-- 智能客服(开始) -->
    <button class="zhinengs" style="width: 44px; height: 44px" @click="indexkefu"></button>
    <!-- 智能客服(结束) -->

    <image src="/static/img/support.png" @tap="openSupportModal" class="support_icon" />

    <view class="support_module" v-if="showChat">
      <view class="container" :class="{ small_css: isSmall, big_css: !isSmall }">
        <view class="support_module_title">
          <span class="title_btn" @click="openSupportModal">{{ !isSmall ? 'x' : '□' }}</span>
        </view>
        <scroll-view
          :scroll-top="scrollTop"
          scroll-y="true"
          class="content support_content"
          @scroll="scroll"
        >
          <view v-for="(item, index) in chatList" :key="index">
            <view class="item item-center" v-if="item.sendTime">
              <span v-text="item.sendTime"></span>
            </view>
            <view class="item" :class="{ item_left: item.isAdmin, item_right: !item.isAdmin }">
              <view class="avatar" v-if="item.isAdmin">
                <image src="/static/img/system_icon.jpg" />
              </view>
              <view
                class="bubble"
                :class="{ 'bubble-right': !item.isAdmin }"
                v-text="item.content"
              ></view>
              <view class="avatar" v-if="!item.isAdmin">
                <image src="/static/img/mine.jpg" />
              </view>
            </view>
          </view>
        </scroll-view>
        <view class="input-area">
          <textarea
            name="text"
            style="height: 50px"
            v-model="sendValue"
            id="textarea"
            placeholder="输入内容"
          ></textarea>
        </view>
        <view class="button-area">
          <span class="send-btn" @tap.stop="sendChat">发 送</span>
        </view>
      </view>
    </view>

    <tn-tabbar
      :value="tabbarIndex"
      :list="tabbarList"
      @change="switchTabbar"
      :animation="true"
      :safeAreaInsetBottom="true"
    ></tn-tabbar>
	<view class="back_top" v-if="show_back_top" @click="scroll_top">
      <text>↑</text>
    </view>
  </view>
</template>

<script>
import Search from '@/components/businessCp/search.vue';
          import list_customized_products from "@/components/diy/list_customized_products.vue";
        import list_film_and_television_novels from "@/components/diy/list_film_and_television_novels.vue";
          import Card from '@/components/common/card.vue';
import list_menu from '@/components/diy/list_menu.vue';
import list_ad from '@/components/diy/list_ad.vue';
import list_goods from '@/components/diy/list_goods.vue';
import list_article from '@/components/diy/list_article.vue';
import list_link from '@/components/diy/list_link.vue';
import Slide from '@/components/common/slide.vue';
import Notice from '@/components/common/notice.vue';

import mixin from '@/libs/mixins/page.js';
import tabbar from '@/libs/mixins/tabbar.js';
import * as HomeApi from '@/api/home';

export default {
  mixins: [mixin, tabbar],
  components: {
    Search,
    Card,
              list_customized_products,
            list_film_and_television_novels,
              list_ad,
    list_menu,
    list_goods,
    list_article,
    list_link,
    Slide,
    Notice,
  },
  data() {
    return {
      tabIndex: 0,
      isExpand: false,
      expandStyle: {
        whiteSpace: 'nowrap',
      },
      tabbarIndex: 0,
      isSmall: false,
      sendValue: '',
      chatList: [],
      showChat: false,
      isAdmin: false,
      scrollTop: 0,
      oldScrollTop: 0,
                list_customized_products: [],
              list_film_and_television_novels: [],
                list_ad: [],
      list_goods: [],
      list_slide: [],
      list_article: [],
      list_menu: [],
      list_link: [],
      list_notice: [],
      activeGoods: '全部',
      types_goods: [],
      activeArticle: '全部',
      types_article: [],
    };
  },
  created() {
  },
  methods: {
    onClickGoods(val) {
      this.activeGoods = val;
      this.get_goods();
    },
    /**
     *  获取商品
     */
    get_goods() {
      let params = {
        page: 1,
        size: 12,
      };
      if (this.activeGoods && this.activeGoods != '全部') {
        params['type'] = this.activeGoods;
      }
                                                      HomeApi.getHomeGoodsListApi(params).then((res) => {
        if (res.result && res.result.list) {
          this.list_goods = res.result.list;
        }
      });
    },
    /**
     * 添加商品过滤
     */
    get_goods_type() {
      this.$get('/goods_type/get_list', {}, (res) => {
        if (res.result && res.result.list) {
          let list = res.result.list.map((obj) => {
            return { value: obj.name, text: obj.name };
          });
          let arr = [
            {
              value: '全部',
              text: '全部',
            },
          ];
          this.types_goods = arr.concat(list);
        }
      });
    },
    onClickCategory(val) {
      this.activeArticle = val;
      this.get_article();
    },
    /**
     *  获取文章
     */
    get_article() {
      let params = {
        page: 1,
        size: 6,
      };
      if (this.activeArticle && this.activeArticle != '全部') {
        params['type'] = this.activeArticle;
      }
      HomeApi.getHomeArticleListApi(params).then((res) => {
        if (res.result && res.result.list) {
          this.list_article = res.result.list;
        }
      });
    },
    /**
     * 添加文章过滤
     */
    get_article_type() {
      this.$get(
        '~/api/article_type/get_list',
        {
          page: 1,
        },
        (res) => {
          if (res.result && res.result.list) {
            let list = res.result.list.map((obj) => {
              return { value: obj.name, text: obj.name };
            });
            let arr = [
              {
                value: '全部',
                text: '全部',
              },
            ];
            this.types_article = arr.concat(list);
          }
        }
      );
    },
    getFullPath(path) {
      if (path) {
        const fullPath = this.pathList[path];
        if (fullPath) {
          return fullPath + path;
        } else if (path.indexOf("/webview/urlview" !== -1)) {
          return '/pages' + path;
        } else {
          return '/pagesC' + path;
        }
      }
      return '';
    },
    onClickTab(val) {
      this.tabIndex = val;
    },
    indexkefu() {
      uni.navigateTo({
        url: `/pages/webview/webview?url=https://chat.zszhan.cn/chat/1002`
      });
    },
    /**
     *  获取广告
     */
    get_ad() {
      this.$get("~/api/ad/get_list?", { page: 1, size: 5 }, (json) => {
        if (json.result && json.result.list) {
          this.list_ad = json.result.list;
        }
      });
    },
    // open
    openSupportModal() {
      let record = this.supportChat;
      this.isAdmin = this.userGroup == '管理员' ? true : false;

      if (record) {
        this.chatList = JSON.parse(record);
      }

      if (!this.token) {
        return uni.showToast({ title: '请先进行登录', icon: 'none' });
      }
      // console.log('打开客服');
      this.showChat = !this.showChat;
      if (this.chatList.length && this.showChat) {
        setTimeout(() => {
          this.scrollBottom();
        }, 0);
      }
    },
    scroll(e) {
      this.oldScrollTop = e.detail.scrollTop;
    },
    // 滚动到最底部
    scrollBottom() {
      uni
        .createSelectorQuery()
        .select('.support_content')
        .boundingClientRect((res) => {
          let newbottom = res.bottom + res.height;
          this.scrollTop = this.oldScrollTop;
          this.$nextTick(() => {
            this.scrollTop = newbottom + 5000;
          });
        })
        .exec();
    },
    // 发送聊天
    sendChat() {
      let nowTime = new Date(+new Date() + 8 * 3600 * 1000)
        .toJSON()
        .substr(0, 16)
        .replace('T', ' ');
      let nowTimeChuo = new Date().getTime();
      let reallyTime = '';
      let spaceTime = 12000; //	20分钟
      if (!this.sendValue) {
        return uni.showToast({ title: '不能发送空内容', icon: 'none' });
      }
      this.chatList.length &&
        (reallyTime =
          nowTimeChuo - this.chatList[this.chatList.length - 1]['nowTime'] > spaceTime
            ? nowTime
            : '');
      !this.chatList.length && (reallyTime = nowTime);
      let obj = {
        isAdmin: this.isAdmin,
        content: this.sendValue,
        sendTime: reallyTime,
        nowTime: nowTimeChuo,
      };
      this.chatList.push(obj);

      setTimeout(() => {
        this.scrollBottom();
      }, 0);
          this.$u.vuex('supportChat', JSON.stringify(this.chatList));

      this.sendValue = '';
    },
                        /**
     *  获取定制商品
     */
    get_customized_products() {
      const params = {
          };
          HomeApi.get_customized_products_api(params).then((res) => {
        if (res.result && res.result.list) {
          this.list_customized_products = res.result.list;
        }
      });
    },
                  /**
     *  获取影视小说
     */
    get_film_and_television_novels() {
      const params = {
          };
          HomeApi.get_film_and_television_novels_api(params).then((res) => {
        if (res.result && res.result.list) {
          this.list_film_and_television_novels = res.result.list;
        }
      });
    },
                  
    /**
     *  获取轮播图
     */
    get_slides() {
      HomeApi.gethomeSlidesListApi().then((res) => {
        if (res.result && res.result.list) {
          this.list_slide = res.result.list;
        }
      });
    },

    /**
     *  获取导航栏
     */
    get_menu() {
      const user_group = this.userGroup;
      HomeApi.getMenuListApi({
        size: '0',
        get: 1,
        user_group,
        position: 'top',
      }).then((res) => {
        if (res.result && res.result.list) {
          this.list_menu = res.result.list;
        }
        this.list_menu.push({mod_name:this.$page_title("/webview/urlview13") || '天气预报',path:"/webview/urlview13"})
          this.list_menu.push({mod_name:"水果商城",path:"/goods/list"})
          this.list_menu.unshift({ mod_name: "知识问答", path: "/exam/list" });
        this.list_menu.unshift({ mod_name: "测评问卷", path: "/evaluation/list" });
        this.list_menu.unshift({ mod_name: "在线考试", path: "/exam_subject/list" });
        this.list_menu.unshift({ mod_name: "在线留言", path: "/message/list" });
        if(this.userInfo.user_group!="游客") {
          this.list_menu.unshift({mod_name: "在线聊天", path: "/chat/index"});
        }
		this.list_menu.push({mod_name:"商城资讯",path:"/article/list"})
		this.list_menu.push({mod_name:"交流论坛",path:"/forum/list"})
        this.list_menu.push({ mod_name: '地图导航', path: '/map_navigation/map_navigation' });
      });
    },

    /**
     *  获取链接列表
     */
    get_link() {
      HomeApi.getHomeLinkListApi({ page: 1, size: 3 }).then((res) => {
        if (res.result && res.result.list) {
          console.log('链接', res.result.list);
          this.list_link = res.result.list;
        }
      });
    },
    /**
     *  获取公告列表
     */
    get_notice() {
      HomeApi.getHomeNoticeListApi({ page: 1, size: 3 }).then((res) => {
        if (res.result && res.result.list) {
          // console.log('公告', res.result.list);
          this.list_notice = res.result.list;
          this.list_notice.map((o) => {
            o['praise_len'];
          });
          this.get_praise(this.list_notice, 'notice', 'notice_id');
        }
      });
    },
    /**
     *  获取点赞数
     *  @param {Object} list
     */
    get_praise(list, table, idName) {
      if (list) {
        for (let i = 0; i < list.length; i++) {
          list[i].praise_len = 0;
        }

        HomeApi.getPraiseListApi({
          source_table: table,
          groupby: 'source_id',
        }).then((res) => {
          if (res.result && res.result.list) {
            res.result.list.map((o) => {
              for (let i = 0; i < list.length; i++) {
                let oj = list[i];
                if (oj[idName] === o['source_id']) {
                  oj['praise_len'] = o['count'];
                  break;
                }
              }
            });
          } else if (res.error) {
            // console.error(res.error);
          }
        });
      }
    },
	clickMore(url){
		if(url == "/article/list"){
			this.$navToTab(this.getFullPath('/article/index'))
		}else if(url == "/forum/list"){
			this.$navToTab(this.getFullPath('/forum/index'))
		}else{
			this.$navTo(this.getFullPath(url))
		}
	}
  },
  onShow() {
    this.get_slides();
    this.get_menu();
    this.get_notice();
              this.get_customized_products();
            this.get_film_and_television_novels();
              this.get_article_type();
    this.get_article();
    this.get_goods_type();
    this.get_goods();
    this.get_link();
    this.get_ad();
  },
};
</script>
<style lang="scss" scoped>
.back_top {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 24px;
  font-weight: 700;
  position: fixed;
  bottom: 100px;
  right: 10px;
  border-radius: 30px;
  background-color: #fff;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
