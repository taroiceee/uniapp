<template>
  <view id="account_login" class="user_account account_login">
    <view class="container">
      <view class="custom-1"></view>
      <view class="custom-2"></view>
      <view class="custom-3"></view>
      <view class="custom-4"><text>样式开发测试测试测试测试单</text></view>
      <view class="custom-5"></view>

      <view class="login-wrapper">
        <view class="input-content">
          <view class="input-item">
            <view class="input-item-icon">
              <view class="tn-icon-my-lack"></view>
            </view>
            <input type="text" v-model="form.username" placeholder="请输入用户名" maxlength="16" data-key="username" />
          </view>
          <view class="input-item">
            <view class="input-item-icon">
              <view class="tn-icon-lock"></view>
            </view>
            <input v-model="form.password" placeholder="请输入密码" placeholder-class="input-empty" maxlength="20"
              :password="!showPassword" data-key="password" @confirm="login" />
            <view class="input-item-icon">
              <view @click="showPassword = !showPassword" :class="[showPassword ? 'tn-icon-eye' : 'tn-icon-eye-hide']">
              </view>
            </view>
          </view>
          <view class="remember">
            <checkbox-group @change="handleRememberChange">
              <label>
                <checkbox :checked="form.remember" color="#409EFF" /> <text>记住密码</text>
              </label>
            </checkbox-group>
          </view>
        </view>
        <view class="agree" style="margin-top: 15px;margin-bottom: 20px;">
          <checkbox :checked="form.agreed" @change="form.agreed = !form.agreed" />
          <text>请阅读</text>
          <text class="protocol" @click="showProtocol" style="color: royalblue">《用户协议》</text>
        </view>

        <uni-popup ref="agreementPopup" type="center">
          <view class="agreement-content">
            <scroll-view scroll-y class="agreement-text">
              <text>
                <view>用户使用协议</view>
                <view>1. 本协议是用户与本站之间的法律协议。</view>
                <view>2. 用户在使用本系统前应仔细阅读本协议。</view>
                <view>3. 用户必须遵守国家相关法律法规。</view>
                <view>4. 不得利用本系统从事任何违法活动。</view>
                <view>5. 用户应妥善保管账号密码，不得泄露给他人。</view>
                <view>6. 本站有权在必要时修改协议内容。</view>
                <view>7. 本协议最终解释权归本站所有。</view>
                <view>8. 用户使用本系统即视为同意本协议所有条款。</view>
              </text>
            </scroll-view>
            <button @click="confirmProtocol" :disabled="!canAgree" class="confirm-btn">
              {{ canAgree ? '我已阅读并同意' : `请阅读协议(${countdown}秒)` }}
            </button>
          </view>
        </uni-popup>
        <button class="confirm-btn" @click="login" :disabled="logining">登录</button>
        <view class="forget-section">
          <view @click="$navTo('/pagesB/account/forgot')">忘记密码?</view>
        </view>
        <view class="register-section">
          还没有账号?
          <view @click="$navTo('/pagesB/account/register')" class="text">马上注册</view>
        </view>
        <view class="author-wrap" style="width: 100%; display: flex; justify-content: center">
          <!-- #ifdef MP-WEIXIN -->
          <view class="author">
            <button class="author-weixin" @click="getUserInfo"></button>
          </view>
          <!-- #endif -->
          <!-- #ifdef APP-VUE || H5 -->
          <view class="author">
            <button class="author-weixin" @click="weixin"></button>
          </view>
          <!-- #endif -->
        </view>
      </view>
    </view>

    <tn-action-sheet v-model="openFaceAction" :list="faceActionlist" @click="clickFaceAction" :maskCloseable="false"
      :cancelBtn="false"></tn-action-sheet>

    <tn-popup mode="center" v-model="openFacePopup" @close="closePopup">
      <view class="face-content">
        <view v-if="openCamera" class="face-camera">
          <!-- #ifdef MP-WEIXIN || H5 -->
          <view>
            <!-- #ifdef MP-WEIXIN -->
            <view style="width: 100%; height: 200px">
              <camera device-position="front" flash="off" @error="cameraError" style="width: 100%; height: 200px">
              </camera>
              <image v-if="form['face_image']" :src="$fullImgUrl(form['face_image'])" />
            </view>
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <video id="videoElement" ref="videoElement" autoplay></video>
            <canvas ref="canvasElement" canvas-id="canvasElement"></canvas>
            <!-- #endif -->
          </view>
          <button @click="takePhoto">拍照</button>
          <!-- #endif -->
          <!-- #ifdef APP-VUE -->
          <view>
            <image v-if="form['face_image']" :src="$fullImgUrl(form['face_image'])" />
          </view>
          <!-- #endif -->
          <button @click="submitFace('camera')">提交</button>
        </view>
        <view v-if="openFaceImg" class="face-img">
          <view class="img-wrap" v-if="form['face_image']" @click="change_img('face_image')">
            <image :src="$fullImgUrl(form['face_image'])" />
          </view>
          <view v-else class="add-img" @click="change_img('face_image')">
            <text>+</text>
          </view>
          <view class="me-btn btn-submit" @click="submitFace('img')">提交</view>
        </view>
      </view>
    </tn-popup>
  </view>
</template>

<script>
import mixin from '@/libs/mixins/page.js';
import { loginApi, faceLoginApi } from '@/api/login.js';
import { uploadFilePathApi, uploadFileApi } from '@/api/common.js';
import wx_open from "@/libs/wx_open.json";
import jsencrypt from '@/components/jsencrypt/jsencrypt.vue';

export default {
  mixins: [mixin],
  data() {
    return {
      logining: false,
      allow_user: [
        '管理员'
        , "注册用户"
        , "商家用户"
      ],
      form: {
        username: 'admin',
        password: 'asd123',
        face_image: "",
        remember: false,
        agreed: false,
        ip: '',
        device_hash: '',
      },
      city: '',
      browserInfo: {},
      // 密码错误计数
      passwordErrorCount: 0,
      maxAttempts: 5, // 最大尝试次数
      firstErrorTime: null, // 第一次密码错误的时间
      timeWindow: 5 * 60 * 1000, // 5分钟时间窗口（毫秒）
      rules: {
        username: {
          rules: [
            {
              required: true,
              errorMessage: '请输入用户名',
            },
            {
              minLength: 5,
              maxLength: 16,
              errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符',
            },
          ],
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: '请输入密码',
            },
            {
              minLength: 5,
              maxLength: 16,
              errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
            },
          ],
        },
      },
      showPassword: false,
      hasReadProtocol: false,
      canAgree: false,
      countdown: 5,
      openFace: false,
      openCamera: false,
      openFaceImg: false,

      // 媒体流，用于关闭摄像头
      mediaStreamTrack: null,
      openFaceAction: false,
      faceActionTips: {
        text: '请选择认证方式',
        fontSize: 26,
      },
      faceActionlist: [
        {
          text: '摄像头',
          fontSize: 28,
        },
        {
          text: '图片',
          fontSize: 28,
        },
      ],
      openFacePopup: false,
    };
  },
  onLoad() {
    console.log(this.$u.route);
    this.loadSavedCredentials();
  },
  methods: {
    async getCityByIP(ipAddress) {
      try {
        // 使用uniapp的request方法，兼容小程序
        const [error, response] = await uni.request({
          url: 'http://ip-api.com/json/' + ipAddress + '?lang=zh-CN',
          method: 'GET',
          timeout: 10000
        });

        if (error) {
          console.error('网络请求失败:', error);
          return null;
        }

        const data = response.data;

        if (data.status === 'fail') {
          console.error('IP查询错误:', data.message);
          return null;
        }

        return {
          ip: data.query,
          city: data.city || '未知', // 直接返回中文城市名
          region: data.regionName || '未知',
          country: data.country || '未知'
        };
      } catch (error) {
        console.error('查询IP地理位置失败:', error);
        return null;
      }
    },
    getBrowserInfo() {
      const systemInfo = uni.getSystemInfoSync();

      // 检测设备类型
      let deviceType = 'Unknown';
      if (systemInfo.platform === 'android') {
        deviceType = 'Android';
      } else if (systemInfo.platform === 'ios') {
        deviceType = 'iOS';
      } else if (systemInfo.platform === 'windows') {
        deviceType = 'Windows';
      } else if (systemInfo.platform === 'mac') {
        deviceType = 'macOS';
      }

      // 获取屏幕分辨率
      const screenResolution = systemInfo.screenWidth + 'x' + systemInfo.screenHeight;

      return {
        browserName: deviceType,
        browserVersion: systemInfo.version,
        osName: systemInfo.system,
        deviceType: deviceType,
        platform: systemInfo.platform,
        language: systemInfo.language,
        screenResolution: screenResolution,
        model: systemInfo.model,
        brand: systemInfo.brand || 'Unknown'
      };
    },
    // 通过接口锁定用户账户
    lockUserAccount() {
      const that = this;
      // 获取当前用户ID，需要先通过用户名查询用户信息
      this.$get('~/api/user/get_obj', { username: this.form.username }, (res) => {
        if (res.result && res.result.obj) {
          const userId = res.result.obj.user_id;
          // 调用接口设置用户状态为锁定（state: 2）
          that.$post('~/api/user/set?user_id=' + userId, {
            state: 2
          });
        } else {
          that.$toast('获取用户信息失败', 'error');
        }
      });
    },
    async initLoginInfo() {
      try {
        // 获取IP地址
        const [error, response] = await uni.request({
          url: 'http://api.ipify.cn?format=json',
          method: 'GET',
          timeout: 10000
        });

        if (!error && response.statusCode === 200) {
          this.form.ip = response.data.ip;
          console.log('IP地址：', this.form.ip);

          // 获取城市信息
          const cityInfo = await this.getCityByIP(this.form.ip);
          if (cityInfo) {
            this.city = cityInfo.city;
            console.log('城市信息：', cityInfo);
          }
        } else {
          console.error('获取IP失败:', error);
          this.form.ip = 'unknown';
          this.city = '未知';
        }

        // 获取设备信息
        this.browserInfo = this.getBrowserInfo();
        this.form.device_hash = this.browserInfo.browserName == 'Unknown' ? this.browserInfo.model : this.browserInfo.browserName;
        console.log(this.form.device_hash, '设备信息：', this.browserInfo);

      } catch (error) {
        console.error('初始化登录信息失败:', error);
        this.form.ip = 'unknown';
        this.city = '未知';
        this.form.device_hash = 'unknown';
      }
    },
    closePopup() {
      this.logining = false;
    },
    login() {
      if (!this.form.agreed) {
        // this.$toast('请仔细阅读用户协议并同意', 'error');
        // return;
      }
      this.logining = true;
      let form = Object.assign({}, this.form);
      form.is_face = 'face';
      //人脸识别登录
      const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+mEDzYLbKNB9rbOuvGgwdBUpPaHryRGarxBQppkOzlj+ouep8MMq1Xg7NBkjLOV2vnn4E5AVvX0XVOmBg8W5eNQ1uS1HCG2fie8BpXGgl1pWj/HYIrA2d/U7xxvMO8UMhAGfMdaGrPrGdZTr95pzL/q+VJZOcqSAgux/YEdu11wIDAQAB";
      form.password = jsencrypt.setEncrypt(publicKey, form.password);
      loginApi(form)
        .then((res) => {
          if (res.result && res.result.obj) {
            if (this.allow_user.includes(res.result.obj.user_group)) {
              this.openFaceAction = true;
            } else {
              this.$toast("您的账号不支持在用户端登录", 'error');
            }
          } else if (res.error) {
            this.$toast(res.error.message, 'error');
          }

        })
        .finally(() => {
          this.logining = false;
        });
    },
    clickFaceAction(v) {
      // 0摄像头 1图片
      this.openFacePopup = true;
      if (v === 0) {
        this.openAndInitCamera();
      } else {
        this.openAndUploadImg();
      }
    },
    initCamera() {
      // #ifdef H5
      const self = this;
      // 注意本例需要在HTTPS协议网站中运行，新版本Chrome中getUserMedia接口在http下不再支持。

      // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }

      // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
      // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先，如果有getUserMedia的话，就获得它
          const getUserMedia =
            navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
          if (!getUserMedia) {
            return Promise.reject(new Error('无法访问摄像头'));
          }
          // 否则，为老的navigator.getUserMedia方法包裹一个Promise
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }

      uni.getSystemInfo({
        success: function (res) {
          const constraints = {
            audio: false,
            video: {
              // 前置摄像头
              facingMode: 'user',
              // 手机端相当于高
              width: Math.max(res.windowWidth, res.windowHeight) - 120,
              // 手机端相当于宽
              height: Math.min(res.windowWidth, res.windowHeight),
            },
          };

          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) {
              self.mediaStreamTrack = stream;

              const video = document.querySelector('video');
              // 旧的浏览器可能没有srcObject
              if ('srcObject' in video) {
                video.srcObject = stream;
              } else {
                // 防止在新的浏览器里使用它，应为它已经不再支持了
                video.src = window.URL.createObjectURL(stream);
              }
              video.onloadedmetadata = function (e) {
                video.play();
              };
            })
            .catch(function (err) {
              console.log(err.name + ': ' + err.message);
            });
        },
      });
      // #endif
      // #ifdef APP-VUE
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], //从相册选择
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          const filePath = tempFilePaths[0];
          uploadFilePathApi(undefined, filePath, undefined, undefined, (task) => {
            task.onProgressUpdate((res) => {
              this.percent = res.progress;
              console.log('上传进度' + res.progress);
              console.log('已经上传的数据长度' + res.totalBytesSent);
              console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
            });
          }).then((res) => {
            this.form['face_image'] = res.result.url;
          });
        },
      });
      // #endif
    },
    takePhoto() {
      // #ifdef MP-WEIXIN
      const ctx = uni.createCameraContext();
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          const filePath = res.tempImagePath;
          uploadFilePathApi(undefined, filePath, undefined, undefined, (task) => {
            task.onProgressUpdate((res) => {
              this.percent = res.progress;
              console.log('上传进度' + res.progress);
              console.log('已经上传的数据长度' + res.totalBytesSent);
              console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
            });
          }).then((res) => {
            this.form['face_image'] = res.result.url;
          });
        },
      });
      // #endif
      // #ifdef H5
      const videoElement = document.querySelector('video');
      const canvasElement = document.querySelector('canvas');
      const context = canvasElement.getContext('2d');

      // 将视频流的画面绘制到Canvas中
      context.drawImage(videoElement, 0, 0, 300, 150);

      // 获取Canvas中的图像数据
      const imageData = canvasElement.toDataURL('image/png');
      let file = this.base64ToFile(imageData, 'cameraImg');

      uploadFileApi(undefined, file, undefined, undefined, (task) => {
        task.onProgressUpdate((res) => {
          this.percent = res.progress;
          console.log('上传进度' + res.progress);
          console.log('已经上传的数据长度' + res.totalBytesSent);
          console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
        });
      }).then((res) => {
        this.form['face_image'] = res.result.url;
      });

      // #endif
    },
    closeVideo() {
      if (this.mediaStreamTrack) {
        // 关闭摄像头
        this.mediaStreamTrack.getTracks().forEach(function (track) {
          track.stop();
        });
        this.mediaStreamTrack = null;
      }
    },
    /**
     * 上传图片
     * @param {Object} param文件参数
     */
    change_img(key_name) {
      // 选择图像方法
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          console.log('开始上传图片');
          console.log(tempFilePaths);
          const tempFilePaths = res.tempFilePaths;
          const filePath = tempFilePaths[0];
          console.log(filePath);
          uploadFilePathApi(undefined, filePath, undefined, undefined, (task) => {
            task.onProgressUpdate((res) => {
              this.percent = res.progress;
              console.log('上传进度' + res.progress);
              console.log('已经上传的数据长度' + res.totalBytesSent);
              console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
            });
          }).then((res) => {
            this.form[key_name] = res.result.url;
          });
        },
        error: function (e) {
          console.log(e);
        },
      });
    },
    openAndInitCamera() {
      this.openFaceImg = false;
      this.openCamera = true;
      this.initCamera();
    },
    openAndUploadImg() {
      this.openCamera = false;
      this.openFaceImg = true;
    },
    submitFace(type) {
      // #ifdef H5
      if (type === 'camera') {
        this.closeVideo();
      }
      // #endif
      //人脸识别登录
      let _this = this;
      faceLoginApi(_this.form).then((res) => {
        if (res.result && res.result.obj) {
          let user = res.result.obj;
          // 登录成功，重置密码错误计数和时间记录
          this.passwordErrorCount = 0;
          this.firstErrorTime = null;

          // 检测异地登录
          if (user.ip && user.ip != this.form.ip) {
            let message_inform = {
              title: '异地登录',
              type: '系统',
              content: '【安全提醒】检测到您在' + this.$toTime ? this.$toTime(new Date(), 'yyyy-MM-dd hh:mm:ss') : new Date().toLocaleString() + '从' + this.city + '(IP:' + this.form.ip + ')登录，若非本人操作，请立即修改账号密码。',
              state: 1,
              user_id: user.user_id
            };
            this.$post('~/api/message_inform/add', message_inform);
          }

          // 检测非常用设备
          if (user.device_hash && user.device_hash != this.form.device_hash) {
            let message_inform = {
              title: '非常用设备',
              type: '系统',
              content: '【安全提醒】检测到您在' + this.$toTime ? this.$toTime(new Date(), 'yyyy-MM-dd hh:mm:ss') : new Date().toLocaleString() + '从设备：' + (this.browserInfo.browserName == 'Unknown' ? this.browserInfo.model : this.browserInfo.browserName) + '登录，若非本人操作，请立即修改账号密码。',
              state: 1,
              user_id: user.user_id
            };
            this.$post('~/api/message_inform/add', message_inform);
          }

          // 更新用户IP和设备信息
          this.$post('~/api/user/set?user_id=' + user.user_id, {
            ip: this.form.ip,
            device_hash: this.form.device_hash
          });
          // 缓存token
          this.$u.vuex('token', user.token);
          // 存储用户信息
          this.$u.vuex('userInfo', user);
          // 设置权限集
          this.$u.vuex('userGroup', user.user_group);
          // 如果需要记住密码
          if (this.form.remember) {
            try {
              // 设置7天过期时间
              const expireTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
              uni.setStorageSync('savedCredentials', {
                username: this.form.username,
                password: this.simpleEncrypt(this.form.password),
                expireTime: expireTime
              });
              console.log('登录信息已保存');
            } catch (e) {
              console.log('保存登录信息失败:', e);
            }
          } else {
            this.clearSavedLogin();
          }
          // 前往首页
          uni.switchTab({
            url: '/pages/index/index',
          });
          console.log('-----');
        } else if (res.error) {
          if (res.error.message == '密码错误') {
            // 处理密码错误，增加失败次数
            const now = Date.now();

            // 如果是第一次密码错误，记录时间
            if (this.passwordErrorCount === 0) {
              this.firstErrorTime = now;
            }

            // 检查是否超过5分钟时间窗口，如果超过则重置计数
            if (this.firstErrorTime && (now - this.firstErrorTime) > this.timeWindow) {
              this.passwordErrorCount = 0;
              this.firstErrorTime = now;
            }

            this.passwordErrorCount++;

            // 检查是否在5分钟内达到最大错误次数
            if (this.passwordErrorCount >= this.maxAttempts &&
              this.firstErrorTime &&
              (now - this.firstErrorTime) <= this.timeWindow) {
              // 5分钟内达到最大错误次数，通过接口锁定账户
              this.lockUserAccount();
              let str = '5分钟内密码错误' + this.maxAttempts + '次，账号已被锁定，请联系管理员解锁';
              this.$toast(str, 'error');
              return;
            } else {
              const remaining = this.maxAttempts - this.passwordErrorCount;
              let str = '密码错误，5分钟内还可尝试' + remaining + '次';
              this.$toast(str, 'error');
            }
            this.logining = false;
            return;
          }
          this.$toast(res.error.message);
        }
      });
    },
    //base64转flie
    base64ToFile(base64, name) {
      if (typeof base64 != 'string') {
        return;
      }
      let arr = base64.split(',');
      let type = arr[0].match(/:(.*?);/)[1];
      let fileExt = type.split('/')[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${name}.` + fileExt, {
        type: type,
      });
    },
    cameraError(e) {
      console.log(e.detail);
    },
    /**
     * 手动重置表单
     */
    resetForm() {
      this.$refs.form.resetFields();
    },
    // #ifdef APP-VUE || H5
    // 三个授权组件地址
    // Tencent(){
    // 	uni.navigateTo({
    // 		url:'../authorization/authorization?id=1'
    // 	})
    // },
    weixin() {
      if (this.form.agreed) {
        this.$nav('/pagesB/authorization/authorization-weixin?id=2');
      } else {
        // this.$toast("请仔细阅读用户协议并同意", 'error');
      }
    },
    // weibo(){
    // 	uni.navigateTo({
    // 		url:'../authorization/authorization-weibo?id=3'
    // 	})
    // }
    // #endif
    // #ifdef MP-WEIXIN
    getUserInfo() {
      if (this.form.agreed) {
        uni.showLoading({
          // 展示加载框
          title: '加载中',
        });
        uni.getUserProfile({
          //获取到用户信息
          desc: '登录后可同步数据',
          success: async (obj) => {
            this.nickName = obj.userInfo.nickName; //用户名
            this.avatarUrl = obj.userInfo.avatarUrl; //用户头像
            // 调用 action ，请求登录接口
            uni.login({
              provider: 'weixin',
              success: (res) => {
                console.log('res-login', res); //获取到code
                this.code = res.code;
                //请求登录接口
                if (res.errMsg == 'login:ok') {
                  let params = {
                    code: this.code,
                    nickname: this.nickName,
                    avatar: this.avatarUrl,
                  };
                  const ps = {
                    appid: wx_open.appid,
                    secret: wx_open.secret,
                    js_code: params.code,
                    grant_type: 'authorization_code',
                  };
                  this.$get('https://api.weixin.qq.com/sns/jscode2session', ps, (res) => {
                    console.log(res);
                    if (res.openid) {
                      //登录
                      this.$post(
                        '~/api/user/open_id_login?',
                        {
                          open_id: res.openid,
                          username: this.form.username,
                          password: this.form.password,
                        },
                        (res) => {
                          if (res.result && res.result.obj) {
                            let user = res.result.obj;
                            if (this.allow_user.includes(user.user_group)) {
                              // 缓存token
                              this.$u.vuex('token', user.token);
                              // 存储用户信息
                              this.$u.vuex('userInfo', user);
                              // 设置权限集
                              this.$u.vuex('userGroup', user.user_group);
                              // 前往首页
                              uni.switchTab({
                                url: '/pages/index/index',
                              });
                              console.log('---登录成功---');
                            } else {
                              this.$toast("您的账号不支持在用户端登录！", 'error');
                            }
                          } else if (res.error) {
                            this.$toast(res.error.message, 'error');
                          }
                        }
                      );
                    } else {
                      uni.showToast({
                        icon: 'none',
                        title: '获取用户信息失败！',
                      });
                    }
                  })
                }
              },
            });
          },
          fail: () => {
            uni.showToast({
              title: '授权已取消',
              icon: 'error',
              mask: true,
            });
          },
          complete: () => {
            // 隐藏loading
            uni.hideLoading();
          },
        });
      } else {
        // this.$toast("请仔细阅读用户协议并同意", 'error');
      }
    },
    // #endif
    // 记住密码相关方法
    loadSavedCredentials() {
      try {
        const savedCredentials = uni.getStorageSync('savedCredentials');
        if (savedCredentials) {
          const currentTime = new Date().getTime();
          if (currentTime < savedCredentials.expireTime) {
            this.form.username = savedCredentials.username;
            this.form.password = this.simpleDecrypt(savedCredentials.password);
            this.form.remember = true;
            console.log('已加载保存的登录信息');
          } else {
            this.clearSavedLogin();
            console.log('保存的登录信息已过期');
          }
        }
      } catch (e) {
        console.log('加载保存的登录信息失败:', e);
      }
    },
    handleRememberChange(e) {
      this.form.remember = e.detail.value.length > 0;
      if (!this.form.remember) {
        this.clearSavedLogin();
      }
    },
    clearSavedLogin() {
      try {
        uni.removeStorageSync('savedCredentials');
        console.log('已清除保存的登录信息');
      } catch (e) {
        console.log('清除保存的登录信息失败:', e);
      }
    },
    simpleEncrypt(text) {
      return btoa(encodeURIComponent(text));
    },
    simpleDecrypt(encodedText) {
      try {
        return decodeURIComponent(atob(encodedText));
      } catch (e) {
        return '';
      }
    },
    // 协议相关方法
    startCountdown() {
      this.countdown = 5;
      this.canAgree = false;
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          this.canAgree = true;
          clearInterval(timer);
        }
      }, 1000);
    },
    confirmProtocol() {
      if (this.canAgree) {
        this.form.agreed = true;
        this.hasReadProtocol = true;
        this.$refs.agreementPopup.close();
      }
    },
    showProtocol() {
      this.$refs.agreementPopup.open();
      this.startCountdown();
    },
  },
  mounted() {
    this.initLoginInfo();
  },
  onBackPress() {
    var bl = false;
    var user_id = this.user.user_id;
    if (user_id == null || user_id < 1) {
      // this.$nav('/pages/index/index');
      bl = true;
    }
    return false;
  },
};
</script>

<style lang="scss" scoped>
@import 'styles/pagesB/index.scss';

/* 记住密码样式 */
.remember {
  margin-top: 15px;
  display: flex;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;

    checkbox {
      margin-right: 8px;
    }
  }
}

/* 协议样式 */
.agree {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;

  checkbox {
    margin-right: 8px;
  }

  .protocol {
    color: #409EFF;
    text-decoration: underline;
  }
}

/* 协议弹窗样式 */
.agreement-content {
  width: 300px;
  background: white;
  border-radius: 10px;
  padding: 20px;

  .agreement-text {
    height: 200px;
    border: 1px solid #eee;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 1.5;
  }

  .confirm-btn {
    width: 100%;
    height: 40px;
    background: #409EFF;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;

    &:disabled {
      background: #ccc;
      color: #999;
    }
  }
}

.face-content {
  height: 460px !important;
  background-color: transparent !important;
}

.face-content button {
  font-size: 14px;
  margin-top: 5px;
}

.account_login .face-content {
  background-color: #ffffff;
}
</style>
