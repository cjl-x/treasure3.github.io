<template>
  <div class="location-scene">
    <div class="animation-section">
      <div class="animation-frame">
        <img src="/图/山脉.jpg" alt="神秘山脉" class="scene-img">
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
export default {
  name: 'MountainScene',
  emits: ['scene-complete', 'add-clue', 'add-item'],
  data() {
    return {
      showChoices: true,
      currentDescription: "险峻的山脉直插云霄，寒风在峡谷间呼啸。云雾缭绕的山峰若隐若现，仿佛守护着千年的秘密。这里的空气清新而寒冷，每一步都能感受到大自然的力量...",
      currentChoices: [
        { text: "攀登主峰寻找制高点 - 俯瞰全景寻找线索" },
        { text: "探索山腰洞穴 - 自然形成的洞穴可能藏有秘密" },
        { text: "沿着溪流寻找线索 - 水流往往会指引方向" },
        { text: "观察星空确定方位 - 让星辰成为你的向导" }
      ]
    }
  },
  methods: {
    async handleChoice(index) {
      this.showChoices = false

      switch(index) {
        case 0:
          this.currentDescription = "经过艰难的攀登，你终于到达山顶。从这里俯瞰，整个地区尽收眼底..."
          await this.delay(1000)
          this.currentDescription = "你清晰地看到了蛇形神庙的确切位置，以及一条隐藏的小路！"
          this.$emit('add-clue', "山顶俯瞰的精确位置")
          this.$emit('add-clue', "隐藏小路的发现")
          break
        
        case 1:
          this.currentDescription = "洞穴中有古老的壁画，描绘了星辰之眼的真正用途和来历..."
          await this.delay(1000)
          this.currentDescription = "壁画显示星辰之眼不仅是宝物，更是开启更大秘密的钥匙，关系到整个文明的命运。"
          this.$emit('add-clue', "洞穴壁画的古老记载")
          this.$emit('add-clue', "星辰之眼的深层意义")
          this.$emit('add-clue', "文明命运的暗示")
          break
        
        case 2:
          this.currentDescription = "沿着清澈的溪流，你发现了一块发光的奇异矿石..."
          await this.delay(1000)
          this.currentDescription = "矿石在黑暗中发出柔和的光芒，似乎与星辰之眼有着某种联系。"
          this.$emit('add-item', '发光矿石')
          this.$emit('add-clue', "发光矿石的发现")
          break
        
        case 3:
          this.currentDescription = "在纯净的山巅夜空中，星辰格外明亮。通过仔细观察，你确定了神庙入口的最佳观测时间..."
          await this.delay(1000)
          this.currentDescription = "狮子座将在三天后的午夜升到天顶，那是开启神庙的完美时机。"
          this.$emit('add-clue', "星空观测的精确时间")
          this.$emit('add-clue', "完美时机的确定")
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