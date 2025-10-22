<template>
  <div class="location-scene">
    <div class="animation-section">
      <div class="animation-frame">
        <img src="/图/村庄.jpg" alt="古老村庄" class="scene-img">
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
  name: 'VillageScene',
  emits: ['scene-complete', 'add-clue', 'add-item'],
  data() {
    return {
      showChoices: true,
      currentDescription: "宁静的古老村庄坐落在青山绿水之间，传统的木屋炊烟袅袅。村民们用好奇而友善的目光打量着你这位外来者，孩子们在村中追逐嬉戏...",
      currentChoices: [
        { text: "拜访村庄长老 - 长者往往知晓古老的传说" },
        { text: "与当地猎人交谈 - 野外专家可能知道地形秘密" },
        { text: "探索村庄遗迹 - 历史痕迹中藏着真相" },
        { text: "在酒馆打听消息 - 流言蜚语中也有真实" }
      ]
    }
  },
  methods: {
    async handleChoice(index) {
      this.showChoices = false

      switch(index) {
        case 0:
          this.currentDescription = "长老在神树下接待了你，眼中闪烁着智慧的光芒：'星辰之眼是先祖留下的智慧结晶...'"
          await this.delay(1000)
          this.currentDescription = "'它不仅是一件宝物，更是开启更大秘密的钥匙。只有当狮子座升到天顶时，神庙的真正入口才会显现。'"
          this.$emit('add-clue', "长老的智慧：星辰之眼的真正意义")
          this.$emit('add-clue', "神庙入口的天文时机")
          this.$emit('add-clue', "更大秘密的暗示")
          break
        
        case 1:
          this.currentDescription = "猎人分享了他的野外生存技巧，并给了你一些特制的补给品。"
          await this.delay(1000)
          this.currentDescription = "'山区夜晚很危险，这些火把和绳索可能会救你的命。'"
          this.$emit('add-item', '生存补给')
          this.$emit('add-item', '特制火把')
          this.$emit('add-clue', '猎人的生存技巧')
          break
        
        case 2:
          this.currentDescription = "在村庄后山的废弃神庙遗址中，你发现了一块刻着复杂星图的石板..."
          await this.delay(1000)
          this.currentDescription = "石板上的图案与你之前看到的星图相互呼应，指向同一个目的地。"
          this.$emit('add-clue', "村庄遗迹的星图石板")
          this.$emit('add-clue', "多重验证的目的地")
          this.$emit('add-item', '星图石板')
          break
        
        case 3:
          this.currentDescription = "酒馆老板一边擦着杯子一边告诉你：'最近有其他寻宝者也来过这里...'"
          await this.delay(1000)
          this.currentDescription = "'小心点，陌生人，不是所有寻宝者都心怀善意。有些人为了宝藏什么都做得出来。'"
          this.$emit('add-clue', "其他寻宝者的情报")
          this.$emit('add-clue', "潜在的危险警告")
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