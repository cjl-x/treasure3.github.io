<template>
  <div id="game-container" class="game-screen">
    <div class="screen-header">
      <button class="back-btn" @click="handleBackToMap">← 返回地图</button>
      <h2>{{ locationName }}</h2>
      <div class="header-decoration"></div>
    </div>
    
    <div class="game-content">
      <component :is="currentSceneComponent" 
                 @scene-complete="handleSceneComplete"
                 @add-clue="handleAddClue"
                 @add-item="handleAddItem"
                 @treasure-found="handleTreasureFound" 
                 ref="sceneComponent"/>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'
import { computed, ref } from 'vue'

import LibraryScene from '@/components/locations/LibraryScene.vue'
import TempleScene from '@/components/locations/TempleScene.vue'
import MarketScene from '@/components/locations/MarketScene.vue'
import VillageScene from '@/components/locations/VillageScene.vue'
import MountainScene from '@/components/locations/MountainScene.vue'

export default {
  name: 'GameScene',
  emits: ['back-to-map', 'treasure-found'],
  components: {
    LibraryScene,
    TempleScene,
    MarketScene,
    VillageScene,
    MountainScene
  },
  setup(props, { emit }) {
    const gameStore = useGameStore()
    const sceneComponent = ref(null)
    
    const currentSceneComponent = computed(() => {
      const componentMap = {
        'library': 'LibraryScene',
        'temple': 'TempleScene',
        'market': 'MarketScene',
        'village': 'VillageScene',
        'mountain': 'MountainScene'
      }
      console.log('🎯 当前地点:', gameStore.currentLocation, '对应组件:', componentMap[gameStore.currentLocation])
      return componentMap[gameStore.currentLocation] || 'LibraryScene'
    })

    const handleSceneComplete = () => {
      console.log('✅ 场景完成，返回地图')
      emit('back-to-map')
    }

    const handleAddClue = (clue) => {
      console.log('🔍 添加线索:', clue)
      gameStore.addClue(clue)
    }

    const handleAddItem = (item) => {
      console.log('🎁 添加物品:', item)
      gameStore.addItem(item)
    }

    const handleTreasureFound = () => {
      console.log('🎉 宝藏已找到！显示完成界面')
      emit('treasure-found')
    }

    const handleBackToMap = () => {
      console.log('⬅️ 手动返回地图')
      emit('back-to-map')
    }

    return {
      locationName: gameStore.locationName,
      currentSceneComponent,
      sceneComponent,
      handleSceneComplete,
      handleAddClue,
      handleAddItem,
      handleTreasureFound,
      handleBackToMap
    }
  }
}
</script>

<style scoped>
#game-container {
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

.game-content {
  background: rgba(42, 42, 66, 0.6);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  min-height: 500px;
}
</style>