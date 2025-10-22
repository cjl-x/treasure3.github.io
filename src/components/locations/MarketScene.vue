<template>
  <div class="location-scene">
    <div class="animation-section">
      <div class="animation-frame">
        <img src="/图/市场.jpg" alt="古董市场" class="scene-img">
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
  name: 'MarketScene',
  emits: ['scene-complete', 'add-clue', 'add-item'],
  data() {
    return {
      showChoices: true,
      currentDescription: "热闹的古董市场中人声鼎沸，各种奇珍异宝在阳光下闪耀。商人们的叫卖声此起彼伏，一个穿着传统服饰的神秘商人注意到你，微笑着向你招手...",
      currentChoices: [
        { text: "询问关于星辰之眼的线索 - 直接打听核心秘密" },
        { text: "查看商人的特殊商品 - 也许能找到有用的道具" },
        { text: "打听蛇形神庙的信息 - 了解目标地点的情报" },
        { text: "只是随便逛逛 - 放松心情，也许有意外发现" }
      ]
    }
  },
  methods: {
    async handleChoice(index) {
      const gameStore = useGameStore()
      this.showChoices = false

      switch(index) {
        case 0:
          this.currentDescription = "商人神秘地笑了笑，压低声音：'星辰之眼...那可是传说中的宝物，已经很久没人提起过了。'"
          await this.delay(1000)
          this.currentDescription = "'据说它被藏在东方山脉的古老神庙中，需要特殊的钥匙和正确的时间才能打开。狮子座的升起之时...'"
          this.$emit('add-clue', "商人的情报：星辰之眼的传说")
          this.$emit('add-clue', "开启宝藏的具体要求")
          this.$emit('add-item', "商人提示")
          break
        
        case 1:
          this.currentDescription = "在琳琅满目的商品中，你发现了一把古老的青铜钥匙，上面精细地刻着星辰图案..."
          await this.delay(1000)
          if (gameStore.inventory.includes('金币')) {
            this.currentDescription = "商人：'眼光不错！这把钥匙据说能在蛇形神庙中派上用场，只要500金币。'你用之前找到的金币买下了这把神秘的钥匙，它在你手中微微发烫。"
            this.$emit('add-item', '青铜钥匙')
            this.$emit('add-clue', '购买了青铜钥匙')
          } else {
            this.currentDescription = "商人：'眼光不错！这把钥匙据说能在蛇形神庙中派上用场，只要500金币。'可惜你没有足够的金币购买这把钥匙，也许在其他地方能找到财富。"
            this.$emit('add-clue', '发现青铜钥匙但没钱购买')
          }
          break
        
        case 2:
          this.currentDescription = "老商人捋着胡须告诉你：'蛇形神庙的守卫其实是千年前的机械装置，弱点在关节处。'"
          await this.delay(1000)
          this.currentDescription = "'而且，神庙中有隐藏的通道，只有懂得星象的人才能找到。'"
          this.$emit('add-clue', "神庙守卫的机械本质")
          this.$emit('add-clue', "隐藏通道的星象线索")
          break
        
        case 3:
          this.currentDescription = "你在市场中悠闲地逛着，感受着异域风情。在一个摊位旁，你偶然发现地上有一枚古老的金币..."
          await this.delay(1000)
          this.currentDescription = "这枚金币看起来年代久远，上面刻着你不认识的文字，也许能在其他地方使用。"
          this.$emit('add-item', '金币')
          this.$emit('add-clue', '在市场闲逛时发现金币')
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
/* 样式保持不变 */
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