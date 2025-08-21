export default {
  data() {
    return {}
  },
  onLoad() {
    // getRect鎸傝浇鍐?t涓婏紝鐢ㄤ负杩欎釜鏂规硶闇€瑕佷娇鐢╥n锛坱his锛夛紝鎵€浠ユ棤娉曟妸瀹冪嫭绔嬪眰涓€涓崟鐙殑鏂囦欢瀵煎嚭
    this.$tn.getRect = this._tGetRect
  },
  beforeDestory() {
    // 鍒ゆ柇褰撳墠椤甸潰鏄惁瀛樺湪parent鍜宑hildren
    // 缁勪欢閿€姣佹椂锛岀Щ闄ゅ瓙缁勪欢鍦ㄧ埗缁勪欢children鏁扮粍涓殑瀹炰緥锛岄噴鏀捐祫婧愶紝閬垮厤鏁版嵁娣蜂贡
    if (this.parent && uni.$tn.test.array(this.parent.children)) {
      // 缁勪欢閿€姣佹椂锛岀Щ闄ゅ瓙缁勪欢鍦ㄧ埗缁勪欢children鏁扮粍涓殑瀹炰緥
      const childrenList = this.parent.children
      childrenList.map((child, index) => {
        // 濡傛灉鐩稿锛屽垯绉婚櫎
        if (child === this) {
          childrenList.splice(index, 1)
        }
      })
    }
  },
  methods: {
    /**
     * 鏌ヨ鑺傜偣淇℃伅
     * 褰撳墠鏂规硶鍦ㄦ敮浠樺疂灏忕▼搴忎腑鏃犳硶鑾峰彇缁勪欢璺熸帴鐐圭殑灏哄
     * 瑙ｅ喅鍔炴硶锛氫负缁勪欢鏍归儴鍐嶅涓€涓病鏈変换浣曚綔鐢ㄧ殑view鍏冪礌
     */
    _tGetRect(selector, all) {
      return new Promise((resolve) => {
        uni.createSelectorQuery()
          .in(this)[all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect)
            }
            if (!all && rect) {
              resolve(rect)
            }
          })
          .exec()
      })
    },
    /**
     * 鑾峰彇鐖剁粍浠剁殑鏁版嵁
     */
    getParentData(parentName = '') {
      // 閬垮厤鍐峜reated涓畾涔塸arent鍙橀噺
      if (!this.parent) this.parent = false
      // 閫氳繃鑾峰彇鐖剁粍浠跺疄渚?
      // 灏嗙埗缁勪欢this涓搴旂殑鍙傛暟锛岃祴鍊肩粰鏈粍浠剁殑parentData瀵硅薄涓搴旂殑灞炴€?
      // 澶存潯灏忕▼搴忎笉鏀寔閫氳繃this.parent.xxx鍘荤洃鍚埗缁勪欢鍙傛暟鐨勫彉鍖栵紝鎵€浠ラ渶瑕佹湰鏂规硶杩涜瀹炵幇
      this.parent = this.$tn.$parent.call(this, parentName)
      if (this.parent) {
        // 閬嶅巻parentData涓殑灞炴€э紝灏唒arent涓悓鍚嶇殑灞炴€ц祴鍊肩粰parentData
        Object.keys(this.parentData).map(key => {
          this.parentData[key] = this.parent[key]
        })
      }
    },
    /**
     * 闃绘浜嬩欢鍐掓场
     */
    preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation()
    }
  }
}
