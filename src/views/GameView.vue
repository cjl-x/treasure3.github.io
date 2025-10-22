<template>
  <div class="game-view">
    <div class="main-container">
      <h1 class="game-title">星辰之眼的秘密</h1>
      <div class="subtitle">古老传说与未知宝藏的冒险</div>
      
      <CoverScreen v-if="currentScreen === 'cover'" @start-adventure="showWorldMap" />
      <WorldMap v-else-if="currentScreen === 'worldmap'" 
                @back-to-cover="showCover"
                @enter-location="enterLocation" />
      <GameScene v-else-if="currentScreen === 'game'" 
                 @back-to-map="showWorldMap"
                 @treasure-found="showTreasureComplete" />
      <TreasureComplete v-else-if="currentScreen === 'complete'"
                        @new-game="handleNewGame"
                        @back-to-map="showWorldMap" />
    </div>
    
    <!-- 导航菜单 -->
    <nav class="main-nav">
      <router-link to="/" class="nav-item">游戏</router-link>
      <router-link to="/user" class="nav-item">用户</router-link>
      <router-link to="/ranking" class="nav-item">排行榜</router-link>
    </nav>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useUserStore } from '@/stores/user'
import { AudioManager } from '@/utils/audioManager'
import { AchievementManager } from '@/utils/achievementManager'
import { HintManager } from '@/utils/hintManager'

import CoverScreen from '@/components/screens/CoverScreen.vue'
import WorldMap from '@/components/screens/WorldMap.vue'
import GameScene from '@/components/screens/GameScene.vue'
import TreasureComplete from '@/components/screens/TreasureComplete.vue'

export default {
  name: 'GameView',
  components: {
    CoverScreen,
    WorldMap,
    GameScene,
    TreasureComplete
  },
  setup() {
    const gameStore = useGameStore()
    const userStore = useUserStore()
    const currentScreen = ref('cover')
    
    let audioManager
    let achievementManager
    let hintManager

    onMounted(() => {
      audioManager = new AudioManager()
      achievementManager = new AchievementManager(gameStore, userStore)
      hintManager = new HintManager(gameStore)
      
      // 显示初始提示
      setTimeout(() => {
        hintManager.showActionHint('first_visit')
      }, 2000)
    })

    const showCover = () => {
      currentScreen.value = 'cover'
      gameStore.setStage('cover')
      if (audioManager) audioManager.playBackground()
    }

    const showWorldMap = () => {
      currentScreen.value = 'worldmap'
      gameStore.setStage('worldmap')
      if (audioManager) audioManager.playBackground()
    }

    const enterLocation = (location) => {
      currentScreen.value = 'game'
      gameStore.enterLocation(location)
      if (audioManager) audioManager.playLocationMusic(location)
      if (hintManager) hintManager.showLocationHint(location)
      if (achievementManager) achievementManager.checkAchievements()
    }

    const showTreasureComplete = () => {
      currentScreen.value = 'complete'
      if (audioManager) audioManager.playBackground()
    }

    const handleNewGame = () => {
      gameStore.resetGame()
      showCover()
    }

    return {
      currentScreen,
      showCover,
      showWorldMap,
      enterLocation,
      showTreasureComplete,
      handleNewGame
    }
  }
}
</script>

<style scoped>
.game-view {
  min-height: 100vh;
  padding-bottom: 80px; /* 为导航留出空间 */
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.game-title {
  text-align: center;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
  letter-spacing: 2px;
}

.subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #b8b8b8;
  margin-bottom: 2rem;
  font-style: italic;
  letter-spacing: 1px;
}

.main-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(42, 42, 66, 0.95);
  backdrop-filter: blur(10px);
  border-top: 2px solid #ffd700;
  display: flex;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.nav-item {
  color: #ffd700;
  text-decoration: none;
  padding: 0.8rem 2rem;
  margin: 0 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-weight: bold;
}

.nav-item:hover,
.nav-item.router-link-active {
  background: #ffd700;
  color: #1a1a2e;
}
</style>