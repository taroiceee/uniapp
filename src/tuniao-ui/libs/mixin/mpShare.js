export default {
  onLoad() {
    // 璁剧疆榛樿鐨勮浆鍙戝弬鏁?
    this.$tn.mpShare = {
      // 鍒嗕韩鐨勬爣棰橈紝榛樿涓哄皬绋嬪簭鍚嶇О
      title: '',
      // 鍒嗕韩鐨勮矾寰勶紝榛樿涓哄綋鍓嶉〉闈?
      path: '',
      // 鍒嗕韩鏃舵樉绀虹殑鍥剧墖锛岄粯璁や负褰撳墠椤甸潰鎴浘
      imageUrl: '',
      // 褰撳墠椤甸潰鏄惁鍙互鍒嗕韩
      share: true
    }
    if (!this.$tn.mpShare.share) {
      uni.hideShareMenu()
    }
  },
  onShareAppMessage() {
    return this.$tn.mpShare
  },
  // #ifdef MP-WEIXIN
  onShareTimeline() {
    return {
      title: this.$tn.mpShare.title,
      query: this.$tn.mpShare.path.substring(this.$tn.mpShare.path.indexOf('?') + 1, this.$tn.mpShare.path.length),
      imageUrl: this.$tn.mpShare.imageUrl
    }
  }
  // #endif
}
