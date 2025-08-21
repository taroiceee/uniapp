export default {
  data() {},
  props: {
    // 鑳屾櫙棰滆壊
    backgroundColor: {
      type: String,
      default: '',
    },
    // 瀛椾綋棰滆壊
    fontColor: {
      type: String,
      default: '',
    },
    // 瀛椾綋澶у皬
    fontSize: {
      type: Number,
      default: 0,
    },
    // 瀛椾綋澶у皬鍗曚綅
    fontUnit: {
      type: String,
      default: 'rpx',
    },
  },
  computed: {
    backgroundColorStyle() {
      return this.$tn.color.getBackgroundColorStyle(this.backgroundColor);
    },
    backgroundColorClass() {
      return this.$tn.color.getBackgroundColorInternalClass(this.backgroundColor);
    },
    fontColorStyle() {
      return this.$tn.color.getFontColorStyle(this.fontColor);
    },
    fontColorClass() {
      return this.$tn.color.getFontColorInternalClass(this.fontColor);
    },
    fontSizeStyle() {
      return this.$tn.string.getLengthUnitValue(this.fontSize, this.fontUnit);
    },
  },
  methods: {},
};

