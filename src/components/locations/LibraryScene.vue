<template>
  <div class="location-scene">
    <div class="animation-section">
      <div class="animation-frame">
        <img src="/图/图2.jpg" alt="图书馆" class="scene-img">
        <p class="scene-desc">{{ currentDescription }}</p>
      </div>
    </div>
    
    <div class="choice-section" v-if="showChoices">
      <button v-for="(choice, index) in currentChoices" 
              :key="index"
              class="choice-btn"
              @click="handleChoice(index)">
        <span class="choice-number">{{ index + 1 }}.</span>
        {{ choice.text }}
      </button>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'

export default {
  name: 'LibraryScene',
  emits: ['scene-complete', 'add-clue', 'add-item'],
  data() {
    return {
      showChoices: true,
      currentStep: 0,
      currentDescription: "市立古老图书馆H区，尘封的书架散发着陈旧的气息。你找到《失落文明的神话》，轻轻翻开书页，一张星图莎草纸从书中滑落，下方刻着奇特的符号，似乎在诉说着古老的秘密...",
      currentChoices: [
        { text: "用手机搜索符号含义 - 现代科技或许能快速解答" },
        { text: "翻祖父日记找类似符号 - 祖父的笔记可能藏有关键" },
        { text: "临摹符号请教图书馆管理员 - 当地智者可能知晓秘密" },
        { text: "凭星图直觉直接找方向 - 相信自己的直觉和判断" }
      ]
    }
  },
  methods: {
    async handleChoice(index) {
      const gameStore = useGameStore()
      this.showChoices = false

      switch(index) {
        case 0:
          // 手机搜索路径
          this.currentDescription = "你打开手机输入符号，在浩瀚的网络中搜索..."
          await this.delay(1000)
          this.currentDescription = "网上没有匹配的解读，现代科技在这里显得无力。"
          await this.delay(1000)
          this.currentDescription = "但在杂乱的搜索结果中，你发现了一个神秘网站的链接，似乎与古老文明有关..."
          this.$emit('add-clue', "网络搜索结果：神秘网站的线索")
          this.$emit('add-item', "可疑网址")
          break
        
        case 1:
          // 祖父日记路径
          this.currentDescription = "你摊开祖父的日记，在泛黄的'神庙铭文'章节仔细查找比对..."
          await this.delay(1000)
          this.currentDescription = "找到了！符号对照表显示：'星辰之眼藏于东方蛇形神庙，需在狮子座升顶时开启'"
          this.$emit('add-clue', "日记中的符号对照表")
          this.$emit('add-clue', "蛇形神庙的位置信息")
          this.$emit('add-clue', "开启宝藏的天文时机")
          gameStore.decodeSymbols()
          break
        
        case 2:
          // 请教管理员路径
          this.currentDescription = "你临摹符号找到老管理员，他戴上老花眼镜仔细端详..."
          await this.delay(1000)
          this.currentDescription = "管理员眼中闪过智慧的光芒：'这是古老的默码，连起来指向城外蛇形神庙，但要小心神庙的守护者！'"
          this.$emit('add-clue', "管理员的解读：默码的含义")
          this.$emit('add-clue', "蛇形神庙的确切方向")
          this.$emit('add-clue', "神庙守护者的警告")
          gameStore.decodeSymbols()
          break
        
        case 3:
          // 直觉路径
          this.currentDescription = "你按照星图指向的东方，驱车穿越茂密的丛林..."
          await this.delay(1000)
          this.currentDescription = "成功找到了蛇形神庙的入口，但缺乏具体指引，前方的道路充满未知..."
          this.$emit('add-clue', "星图的基本方向")
          gameStore.isPrepared = false
          break
      }

      await this.delay(1500)
      this.$emit('scene-complete')
    },

    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
</script>

<style scoped>
.location-scene {
  width: 100%;
}

.animation-frame {
  text-align: center;
  animation: fadeIn 0.8s ease-out;
  margin-bottom: 2rem;
}

.scene-img {
  max-width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
  border: 3px solid #ffd700;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  margin-bottom: 1.5rem;
}

.scene-desc {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #e0e0e0;
  background: rgba(58, 58, 92, 0.5);
  padding: 1.5rem;
  border-radius: 10px;
  border-left: 4px solid #ffd700;
  text-align: left;
  min-height: 120px;
  display: flex;
  align-items: center;
}

.choice-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.choice-btn {
  padding: 1.2rem 1.5rem;
  background: rgba(58, 58, 92, 0.8);
  color: #f0f0f0;
  border: 2px solid #3a3a5c;
  border-radius: 10px;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  width: 100%;
}

.choice-btn:hover {
  border-color: #ffd700;
  background: rgba(255, 215, 0, 0.1);
  transform: translateX(10px);
}

.choice-number {
  color: #ffd700;
  font-weight: bold;
  margin-right: 0.5rem;
}
</style>