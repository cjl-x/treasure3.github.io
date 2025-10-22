<template>
  <div id="achievement-popup" :class="{ show: currentAchievement }">
    <div class="achievement-icon">{{ currentAchievement?.icon }}</div>
    <div class="achievement-title">{{ currentAchievement?.title }}</div>
    <div class="achievement-desc">{{ currentAchievement?.description }}</div>
    <div class="achievement-progress"></div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'

export default {
  name: 'AchievementPopup',
  setup() {
    const gameStore = useGameStore()
    
    return {
      currentAchievement: gameStore.currentAchievement
    }
  }
}
</script>

<style scoped>
#achievement-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background: rgba(42, 42, 66, 0.98);
  border: 3px solid #ffd700;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  z-index: 2000;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  transition: transform 0.5s ease;
}

#achievement-popup.show {
  transform: translate(-50%, -50%) scale(1);
  animation: achievementBounce 0.6s ease;
}

@keyframes achievementBounce {
  0% { transform: translate(-50%, -50%) scale(0); }
  50% { transform: translate(-50%, -50%) scale(1.1); }
  100% { transform: translate(-50%, -50%) scale(1); }
}

.achievement-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: iconFloat 3s ease-in-out infinite;
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.achievement-title {
  color: #ffd700;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
}

.achievement-desc {
  color: #e0e0e0;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.achievement-progress {
  height: 4px;
  background: rgba(255, 215, 0, 0.3);
  border-radius: 2px;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}

.achievement-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  animation: progressShine 2s infinite;
}

@keyframes progressShine {
  0% { left: -100%; }
  100% { left: 100%; }
}
</style>