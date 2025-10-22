<template>
  <div id="hint-system" :class="{ show: currentHint }">
    <button class="close-hint" @click="hideHint">×</button>
    <div class="hint-header">{{ currentHint?.title }}</div>
    <div class="hint-content">{{ currentHint?.content }}</div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'

export default {
  name: 'HintSystem',
  setup() {
    const gameStore = useGameStore()
    
    const hideHint = () => {
      gameStore.hideHint()
    }

    return {
      currentHint: gameStore.currentHint,
      hideHint
    }
  }
}
</script>

<style scoped>
#hint-system {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(42, 42, 66, 0.95);
  border: 2px solid #ffd700;
  border-radius: 15px;
  padding: 1.5rem;
  max-width: 320px;
  z-index: 1000;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  transform: translateX(400px);
  transition: transform 0.5s ease;
}

#hint-system.show {
  transform: translateX(0);
}

.hint-header {
  color: #ffd700;
  font-weight: bold;
  margin-bottom: 0.8rem;
  font-size: 1.1rem;
}

.hint-content {
  color: #e0e0e0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.close-hint {
  position: absolute;
  top: 0.5rem;
  right: 0.8rem;
  background: none;
  border: none;
  color: #ffd700;
  cursor: pointer;
  font-size: 1.2rem;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-hint:hover {
  background: rgba(255, 215, 0, 0.2);
}
</style>