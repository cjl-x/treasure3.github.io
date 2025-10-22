<template>
  <div class="location-scene">
    <div class="animation-section">
      <div class="animation-frame">
        <img src="/图/图7.jpg" alt="神庙" class="scene-img">
        <p class="scene-desc">
          神庙主殿昏暗而庄严，古老的石柱上雕刻着星辰图案。祭坛上的石盒泛着神秘的微光，仿佛在呼唤着你。突然，盔甲守卫从阴影中走出，金属摩擦声在寂静中回荡...
        </p>
      </div>
    </div>
    
    <div class="choice-section" v-if="showChoices">
      <button v-for="(choice, index) in availableChoices" 
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
import { computed } from 'vue'

export default {
  name: 'TempleScene',
  emits: ['scene-complete', 'add-clue', 'add-item', 'treasure-found'],
  data() {
    return {
      showChoices: true
    }
  },
  setup(props, { emit }) {
    const gameStore = useGameStore()
    
    const baseChoices = [
      { text: "用登山杖正面迎战 - 考验勇气的时候到了" },
      { text: "绕柱子周旋找守卫弱点 - 智取胜过蛮力" },
      { text: "扔食物引开守卫注意力 - 利用环境创造机会" }
    ]

    const availableChoices = computed(() => {
      const choices = [...baseChoices]
      
      if (!gameStore.isPrepared) {
        choices.push({ text: "惊慌失措转身逃跑 - 恐惧占据了上风" })
      }
      
      if (gameStore.inventory.includes('青铜钥匙')) {
        choices.unshift({ text: "使用青铜钥匙 - 这把古老的钥匙或许有用" })
      }
      
      return choices
    })

    const handleChoice = (index) => {
      const adjustedIndex = gameStore.inventory.includes('青铜钥匙') ? index - 1 : index
      
      switch(adjustedIndex) {
        case -1: // 使用钥匙 - 成功找到宝藏
          emit('add-clue', '青铜钥匙的正确用途')
          emit('add-item', '开启的宝箱')
          emit('treasure-found')
          break
        case 1:  // 找到弱点 - 成功找到宝藏  
          emit('add-clue', '守卫的机械弱点')
          emit('add-item', '守卫的核心')
          emit('treasure-found')
          break
        case 2:  // 利用环境 - 成功找到宝藏
          emit('add-clue', '环境利用的技巧')
          emit('treasure-found')
          break
        case 0:  // 正面战斗 - 失败
          emit('add-clue', '正面战斗的经验')
          break
        case 3:  // 逃跑 - 失败
          emit('add-clue', '逃跑的教训')
          break
      }
      
      // 无论成功失败都返回地图
      setTimeout(() => {
        emit('scene-complete')
      }, 1500)
    }

    return {
      availableChoices,
      handleChoice
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