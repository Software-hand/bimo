
const conf = {
  data: {
    // 此处为日历自定义配置字段
    calendarConfig: {
      multi: true, // 是否开启多选,
      theme: 'elegant', // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题在 theme 文件夹扩展
      showLunar: true, // 是否显示农历，此配置会导致 setTodoLabels 中 showLabelAlways 配置失效
      inverse: true, // 单选模式下是否支持取消选中,
      markToday: '今', // 当天日期展示不使用默认数字，用特殊文字标记
      takeoverTap: true, // 是否完全接管日期点击事件（日期不会选中)
      highlightToday: true, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
      defaultDate: '2018-3-6', // 默认选中指定某天；当为 boolean 值 true 时则默认选中当天，非真值则在初始化时不自动选中日期，
      preventSwipe: true, // 是否禁用日历滑动切换月份
      firstDayOfWeek: 'Mon', // 每周第一天为周一还是周日，默认按周日开始
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      autoChoosedWhenJump: true, // 跳转到指定日期后是否需要自动选中
      disableMode: {
        // 禁用某一天之前/之后的所有日期
        type: 'after', // [‘before’, 'after']
        date: '2020-3-24' // 无该属性或该属性值为假，则默认为当天
      },
    }
  }
}
Page({
  conf,
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  afterCalendarRender(e) {
    console.log('afterCalendarRender', e)
  },
  /**
   * 日期点击事件（此事件会完全接管点击事件），需自定义配置 takeoverTap 值为真才能生效
   * currentSelect 当前点击的日期
   */
  takeoverTap(e) {
    console.log('takeoverTap', e.detail) // => { year: 2019, month: 12, day: 3, ...}
  },
  /**
   * 选择日期后执行的事件
   * currentSelect 当前点击的日期
   * allSelectedDays 选择的所有日期（当multi为true时，allSelectedDays有值）
   */
  afterTapDate(e) {
    console.log('afterTapDate', e.detail) // => { currentSelect: {}, allSelectedDays: [] }
  },
  /**
   * 当日历滑动时触发(适用于周/月视图)
   * 可在滑动时按需在该方法内获取当前日历的一些数据
   */
  onSwipe(e) {
    console.log('onSwipe', e.detail)
  },
  /**
   * 当改变月份时触发
   * => current 当前年月 / next 切换后的年月
   */
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail)
    // => { current: { month: 3, ... }, next: { month: 4, ... }}
  }
})