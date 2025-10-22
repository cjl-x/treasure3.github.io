<template>
  <div id="cover-container" class="game-screen active">
    <div class="cover-content">
      <div class="cover-image-container">
        <img src="/图/图2.jpg" alt="寻宝封面" class="cover-img">
        <div class="image-overlay"></div>
      </div>
      <div class="cover-text">
        <h2>传奇的开始</h2>
        <p class="cover-desc">
          你是一位富有冒险精神的考古学家后代。在整理祖父的遗物时，你发现了一本古老的日记，里面夹着一张泛黄的字条，上面写着："当狮子的影子落在女神之手时，星辰之眼将指引通往无限财富之路。" 你知道，这一定是祖父未完成的寻宝之旅。你的冒险，从现在开始！
        </p>
        <button class="glow-button" @click="startAdventure">开始冒险</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoverScreen',
  emits: ['start-adventure'],
  methods: {
    startAdventure() {
      this.$emit('start-adventure')
    }
  }
}
</script>

<style scoped>
#cover-container {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cover-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.cover-image-container {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.3s ease;
}

.cover-image-container:hover {
  transform: perspective(1000px) rotateY(0deg);
}

.cover-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(26, 26, 46, 0.7) 0%, transparent 100%);
}

.cover-text {
  padding: 2rem;
}

.cover-text h2 {
  font-size: 2.5rem;
  color: #ffd700;
  margin-bottom: 1.5rem;
}

.cover-desc {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #e0e0e0;
  margin-bottom: 2rem;
  text-align: justify;
}

.glow-button {
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #ffd700 0%, #e6c200 100%);
  color: #1a1a2e;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.glow-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.5);
}
</style>