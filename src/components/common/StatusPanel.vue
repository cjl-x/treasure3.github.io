<template>
  <div id="status-panel" :class="{ minimized: isMinimized }" :style="panelStyle">
    <button class="toggle-status" @click="toggleMinimize">
      {{ isMinimized ? '+' : '−' }}
    </button>
    
    <div v-if="!isMinimized" class="panel-content">
      <div class="status-header">冒险日志</div>
      
      <div class="status-section">
        <div class="status-item">
          <span class="status-label">当前地点:</span>
          <span class="status-value">{{ locationName }}</span>
        </div>
        <div class="status-item">
          <span class="status-label">线索进度:</span>
          <span class="status-value">{{ cluesProgress }}</span>
        </div>
      </div>

      <div class="status-section">
        <div class="status-item">
          <span class="status-label">物品栏:</span>
          <div class="inventory-items">
            <div v-if="inventory.length === 0" class="inventory-item">空</div>
            <div v-else v-for="item in inventory" :key="item" class="inventory-item">
              {{ item }}
            </div>
          </div>
        </div>
      </div>

      <div class="status-section">
        <div class="status-item">
          <span class="status-label">发现线索:</span>
          <div class="clues-list">
            <div v-if="discoveredClues.length === 0" class="clue-item">尚未发现线索</div>
            <div v-else v-for="clue in discoveredClues" :key="clue" class="clue-item">
              {{ clue }}
            </div>
          </div>
        </div>
      </div>

      <div class="status-section">
        <div class="status-item">
          <span class="status-label">当前任务:</span>
          <div>
            <div v-for="quest in currentQuests" :key="quest.text" 
                 :class="['quest-item', quest.completed ? 'quest-completed' : 'quest-active']">
              {{ quest.completed ? '✓ ' : '' }}{{ quest.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 最小化状态显示 -->
    <div v-else class="minimized-content">
      <div class="minimized-icon">📜</div>
      <div class="minimized-progress">{{ cluesFound }}/12</div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'

export default {
  name: 'StatusPanel',
  setup() {
    const gameStore = useGameStore()
    
    const panelStyle = computed(() => ({
      width: gameStore.isStatusMinimized ? '80px' : '320px',
      minWidth: gameStore.isStatusMinimized ? '80px' : '320px',
      height: gameStore.isStatusMinimized ? '80px' : 'auto'
    }))

    const toggleMinimize = () => {
      console.log('切换状态面板:', !gameStore.isStatusMinimized)
      gameStore.toggleStatusPanel()
    }

    return {
      isMinimized: computed(() => gameStore.isStatusMinimized),
      locationName: computed(() => gameStore.locationName),
      cluesProgress: computed(() => gameStore.cluesProgress),
      cluesFound: computed(() => gameStore.cluesFound),
      inventory: computed(() => gameStore.inventory),
      discoveredClues: computed(() => gameStore.discoveredClues),
      currentQuests: computed(() => gameStore.currentQuests),
      panelStyle,
      toggleMinimize
    }
  }
}
</script>

<style scoped>
#status-panel {
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(42, 42, 66, 0.95);
  border: 2px solid #ffd700;
  border-radius: 15px;
  padding: 1.5rem;
  min-width: 320px;
  z-index: 1000;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  overflow: hidden;
}

#status-panel.minimized {
  min-width: 80px !important;
  width: 80px !important;
  height: 80px !important;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.panel-content {
  transition: opacity 0.3s ease;
}

#status-panel.minimized .panel-content {
  display: none;
}

.minimized-content {
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

#status-panel.minimized .minimized-content {
  display: flex;
}

.minimized-icon {
  font-size: 1.8rem;
  color: #ffd700;
}

.minimized-progress {
  color: #ffd700;
  font-size: 0.9rem;
  font-weight: bold;
}

.status-header {
  color: #ffd700;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  border-bottom: 2px solid #ffd700;
  padding-bottom: 0.5rem;
}

.status-section {
  margin-bottom: 1.2rem;
}

.status-item {
  margin: 0.8rem 0;
}

.status-label {
  color: #ffd700;
  font-weight: bold;
  margin-right: 0.5rem;
  font-size: 0.9rem;
}

.status-value {
  color: #e0e0e0;
  font-size: 0.9rem;
}

.inventory-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.inventory-item {
  background: linear-gradient(135deg, #3a3a5c 0%, #2a2a42 100%);
  color: #ffd700;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid #ffd700;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.clues-list {
  max-height: 150px;
  overflow-y: auto;
  margin-top: 0.5rem;
  padding-right: 0.5rem;
}

.clues-list::-webkit-scrollbar {
  width: 6px;
}

.clues-list::-webkit-scrollbar-track {
  background: rgba(255, 215, 0, 0.1);
  border-radius: 3px;
}

.clues-list::-webkit-scrollbar-thumb {
  background: #ffd700;
  border-radius: 3px;
}

.clue-item {
  background: rgba(255, 215, 0, 0.1);
  padding: 0.6rem;
  margin: 0.3rem 0;
  border-radius: 8px;
  font-size: 0.8rem;
  border-left: 3px solid #ffd700;
}

.quest-item {
  padding: 0.6rem;
  margin: 0.3rem 0;
  border-radius: 8px;
  font-size: 0.8rem;
}

.quest-completed {
  background: rgba(0, 255, 0, 0.1);
  border-left: 3px solid #00ff00;
  text-decoration: line-through;
  opacity: 0.7;
}

.quest-active {
  background: rgba(255, 215, 0, 0.2);
  border-left: 3px solid #ffd700;
}

.toggle-status {
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
  z-index: 1001;
}

.toggle-status:hover {
  background: rgba(255, 215, 0, 0.2);
  transform: scale(1.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  #status-panel {
    position: relative;
    top: auto;
    left: auto;
    margin-bottom: 1rem;
    width: 100% !important;
    min-width: auto !important;
  }
  
  #status-panel.minimized {
    width: 80px !important;
    height: 80px !important;
    position: fixed;
    top: 20px;
    left: 20px;
  }
}
</style>