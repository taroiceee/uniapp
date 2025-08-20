<template>
  <view id="page_diy_details" class="page_diy_details page_seating_arrangements_details" :style="{ paddingTop: vuex_custom_bar_height + 'px', paddingBottom: vuex_safe_area_bottom + 'px',}">
    <tn-nav-bar>座位安排</tn-nav-bar>
    <view class="page_diy page_seating_arrangements" id="seating_arrangements_details">
        
      <view class="warp info-wrapper">
        <view class="container-fluid">
          <view class="row">
              <view v-if="$check_field('get', 'name_of_session')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>场次名称</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["name_of_session"] }}                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'date_of_session')" class="info-item field_time ">
                <view class="diy_title">
                  <span>场次日期</span>
                </view>
                    <view class="diy_field diy_date">
                  <span>
                    {{ $toTime(obj['date_of_session'], 'yyyy-MM-dd') }}
                  </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'schedule_of_sessions')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>场次安排</span>
                </view>
                    <view class="diy_field diy_number">
                    <span>
                        {{ obj['schedule_of_sessions'] }}                    </span>
                </view>
                </view>
                <view v-if="$check_field('get', 'arrange_person_times')" class="info-item  field_text ">
                <view class="diy_title">
                  <span>安排人次</span>
                </view>
                    <view class="diy_field diy_text">
                  <span>
                      {{ obj["arrange_person_times"] }}                  </span>
                </view>
                </view>
            </view>
        </view>
		<view class="table_info">
			<div class="table_title">详情</div>
			<scroll-view class="diy_html" scroll-x="true">
				<div class="content">
				  <div class="table-wrapper">
										<table>
					  <thead>
					    <tr>
					      <th class="fw thAmtdstyle"></th>
					      <th class="fw thAmtdstyle" v-for="index in obj.scheduling_col" :key="'row'+index">
					        <p>{{ index }} {{ obj.col_unit }}</p>
					      </th>
					    </tr>
					  </thead>
					  <tbody>
					    <tr v-for="(item, index) in tableData" :key="'row'+index">
					      <td class="wd fw thAmtdstyle">
					        <div>
					          <p style="font-weight: bold">{{ index + 1 }} {{ obj.row_unit }}</p>
					        </div>
					      </td>
					      <td v-for="(col, index) in item" :key="col">
					        <p style="font-weight: bold">{{ col.join('，') }}</p>
					      </td>
					    </tr>
					  </tbody>
					</table>
									  </div>
				</div>
			</scroll-view>
		</view>
      </view>

	<view class="kb-row">


	</view>





    </view>
  </view>
</template>

<script>
  import mixin from '@/libs/mixins/page.js';

  export default {
    mixins: [mixin],
    components: {
    },
    data() {
      return {
        url_get_obj: '~/api/seating_arrangements/get_obj?',
        field: 'seating_arrangements_id',
        query: {
                seating_arrangements_id: 0,
        },
        // 商品详情初始化
        obj: {
          seating_arrangements_id: 0,
              name_of_session: "",
                  date_of_session: "",
                  schedule_of_sessions: 0,
                  arrange_person_times: "",
    		  seatingtable: "",
		  scheduling_col: 0,
		  row_unit: "",
		  col_unit: "",
        },
        				tableData: [],
      };
    },
    methods: {
    // #ifdef MP-WEIXIN
    preview_file(flie) {
      uni.downloadFile({
        url: flie,
        success: function (res) {
          var filePath = res.tempFilePath;
          uni.openDocument({
            filePath: filePath,
            showMenu: true,
            success: function (res) {
              console.log('打开文档成功');
            }
          });
        }
      });
    },
    // #endif
      openUrl(url) {
        uni.navigateTo({
          url: `/pages/webview/webview?url=${url}`,
        });
      },
      /**
       * 获取对象之后
       * @param {Object} json 结果对象
       */
      get_obj_after(json) {
        // 判断是否获取到数据
        if (this.obj) {
          var obj = this.obj;
		const seatingtableStr = obj.seatingtable;
		if (seatingtableStr) {
		  this.tableData = JSON.parse(seatingtableStr);
		} else {
		  this.tableData = [];
		}
        }
      },
                    },
    created() {
                    },

    mounted() {
    },
    onShow() {
    },
  };
</script>

<style lang="scss" scoped>
  @import 'styles/pagesC/index.scss';
  .score_statistics_chart {
    display: flex;
    padding: 0 10px;
  }
  .score_num_text {
    font-size: 24px;
    margin-right: 5px;
  }
  .score_person_num {
    font-size: 12px;
    color: #6195bd;
    text-align: left;
  }
  .user_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .user_avatar {
    width: 40px !important;
    height: 40px !important;
    border-radius: 100%;
    margin-right: 10px
  }

  .user_info {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }

  .user_nickname {
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
  }
  .user_fans {
    font-size: 12px;
    color: #999;
  }

  .item-btn {
    height: 26px;
    padding: 0 20px;
    border-radius: 4px;
    margin-right: 6px;
  }
  .item-btn-radius {
    height: 26px;
    padding: 0 10px;
    border-radius: 26px;
    margin-right: 6px;
  }
  .plain {
    color: #0079fe;
    background-color: transparent;
    border: 1px solid #0079fe;
  }
	.table_info {
		margin: 10px 0;

		.table_title {
			font-weight: bold;
			text-align: center;
			margin-bottom: 10px;
		}
	}
	.diy_html table{
		border: 1px solid #eee;
		border-collapse: collapse;
	}
	.diy_html table tr{
		display: flex;
	}
	.diy_html table th,.diy_html table td{
		width: 120px;
		font-size: 12px;
		border: 1px solid #eee;
		border-collapse: collapse;
		text-align: center;
		padding: 20px 0;
		
	}
	.diy_html table tr th:first-child,.diy_html table tr td:first-child{
		position: sticky;
		left: 0;
		background: #f7f7f7;
	}
</style>