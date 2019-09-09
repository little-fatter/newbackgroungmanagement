<template>
  <div>
    <svg
      style="transform: rotate(-90deg)"
      :width="width"
      :height="width"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        transform="rotate(90)"
        x="50"
        y="-55"
        text-anchor="middle"
        fill="black"
        v-show="chooseitem === index"
      >
        {{ progress }}%
      </text>
      <text
        v-show="chooseitem === index"
        transform="rotate(90)"
        x="50"
        y="-35"
        text-anchor="middle"
        fill="black"
      >
        完成率
      </text>
      <circle
        :r="(width - radius) / 2"
        :cy="width / 2"
        :cx="width / 2"
        :stroke-width="radius"
        :stroke="backgroundColor"
        fill="none"
      />
      <circle
        ref="$bar"
        :r="(width - radius) / 2"
        :cy="width / 2"
        :cx="width / 2"
        :stroke="index===0 ? '#5eb0fe' : index ===1 ? '#80e313' : '#f2ae57'"
        :stroke-width="radius"
        :stroke-linecap="isRound ? 'round' : 'square'"
        :stroke-dasharray="(width - radius) * 3.14"
        :stroke-dashoffset="
        (width - radius) * 3.14
        "
        fill="none"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: ["progress", "id", "index", "chooseitem"],
  data() {
    return {
      width: 100, // 圆的大小
      radius: 10, // 进度条厚度
      // barColor: "#F2AE57", // 进度条颜色
      backgroundColor: "#dce2e6", // 背景颜色
      isAnimation: true, // 是否是动画效果
      isRound: true, // 是否是圆形画笔
      duration: 1000, // 整个动画时长
      delay: 200, // 延迟多久执行
      timeFunction: "cubic-bezier(0.99, 0.01, 0.22, 0.94)", // 动画缓动函数
      idStr: `circle_progress_keyframes_${this.id}`
    };
  },
  beforeDestroy() {
    // 清除旧组件的样式标签
    document.getElementById(this.idStr) &&
      document.getElementById(this.idStr).remove();
  },

  mounted() {
    if (this.isAnimation) {
      // 重复定义判断
      if (document.getElementById(this.idStr)) {
        console.warn("vue-circle-progress should not have same id style");
        document.getElementById(this.idStr).remove();
      }

      // 生成动画样式文件
      let style = document.createElement("style");
      style.id = this.idStr;
      style.type = "text/css";
      style.innerHTML = `
      @keyframes circle_progress_keyframes_name_${this.id} {
      from {stroke-dashoffset: ${(this.width - this.radius) * 3.14}px;}
      to {stroke-dashoffset: ${((this.width - this.radius) *
        3.14 *
        (100 - this.progress)) /
        100}px;}}
      .circle_progress_bar${
        this.id
      } {animation: circle_progress_keyframes_name_${this.id} ${
        this.duration
      }ms ${this.delay}ms ${this.timeFunction} forwards;}`;

      // 添加新样式文件
      document.getElementsByTagName("head")[0].appendChild(style);

      // 往svg元素中添加动画class
      if (this.index === 0){
        this.$refs.$bar.classList.add(`circle_progress_bar${this.id}`)
      }
    }
  },
  watch:{
    chooseitem(val){
      if (val === this.index)
      {this.$refs.$bar.classList.add(`circle_progress_bar${this.id}`);
      }
      else {
        this.$refs.$bar.classList.remove(`circle_progress_bar${this.id}`)
      }
    }
  }
};
</script>
