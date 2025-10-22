<template>
  <div id="world-map" class="game-screen">
    <div class="screen-header">
      <button class="back-btn" @click="$emit('back-to-cover')">← 返回</button>
      <h2>探险地图</h2>
      <div class="header-decoration"></div>
    </div>
    
    <div class="map-container">
      <div class="map-background"></div>
      <div class="locations-grid">
        <div v-for="location in locations" 
             :key="location.id"
             class="location-item" 
             @click="$emit('enter-location', location.id)">
          <div class="location-icon-container">
            <img :src="location.image" :alt="location.name" class="location-icon">
            <div class="location-glow"></div>
          </div>
          <span class="location-name">{{ location.name }}</span>
          <div class="location-desc">{{ location.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorldMap',
  emits: ['back-to-cover', 'enter-location'],
  data() {
    return {
      locations: [
        {
          id: 'library',
          name: '古老图书馆',
          description: '知识的殿堂，隐藏着古老符号的秘密',
          image: '/图/图10.jpg'
        },
        {
          id: 'temple',
          name: '蛇形神庙',
          description: '神秘的遗迹，守护着传说中的宝藏',
          image: '/图/图11.jpg'
        },
        {
          id: 'market',
          name: '古董市场',
          description: '信息交汇处，商人们知晓许多秘密',
          image: '/图/市场.jpg'
        },
        {
          id: 'village',
          name: '古老村庄',
          description: '传承之地，村民们守护着古老传说',
          image: '/图/村庄.jpg'
        },
        {
          id: 'mountain',
          name: '神秘山脉',
          description: '自然之谜，星空下的指引者',
          image: '/图/山脉.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
#world-map {
  animation: fadeInUp 0.8s ease-out;
}

.screen-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.screen-header h2 {
  font-size: 2.5rem;
  color: #ffd700;
  margin: 1rem 0;
}

.header-decoration {
  height: 3px;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  margin: 0 auto;
  width: 200px;
}

.back-btn {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.8rem 1.5rem;
  background: rgba(58, 58, 92, 0.8);
  color: #f0f0f0;
  border: 2px solid #ffd700;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #ffd700;
  color: #1a1a2e;
}

.map-container {
  position: relative;
  background: rgba(42, 42, 66, 0.6);
  border-radius: 20px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.map-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(120, 119, 198, 0.1) 0%, transparent 50%);
  border-radius: 20px;
  pointer-events: none;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.location-item {
  background: rgba(58, 58, 92, 0.6);
  border: 2px solid transparent;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.location-item:hover {
  transform: translateY(-10px);
  border-color: #ffd700;
  box-shadow: 0 15px 30px rgba(255, 215, 0, 0.2);
}

.location-icon-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
}

.location-icon {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ffd700;
  position: relative;
  z-index: 2;
}

.location-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.location-name {
  font-size: 1.4rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 0.5rem;
  display: block;
}

.location-desc {
  font-size: 0.9rem;
  color: #b8b8b8;
  line-height: 1.4;
}
</style>