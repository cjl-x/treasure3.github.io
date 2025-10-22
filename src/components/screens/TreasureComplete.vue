<template>
  <div id="treasure-complete" class="game-screen">
    <div class="complete-content">
      <div class="treasure-animation">
        <div class="treasure-icon">💎</div>
        <div class="sparkles">
          <div class="sparkle" v-for="n in 20" :key="n" :style="sparkleStyle(n)"></div>
        </div>
      </div>
      
      <h1 class="complete-title">恭喜！你找到了星辰之眼！</h1>
      
      <div class="completion-stats">
        <div class="stat-item">
          <span class="stat-label">发现的线索:</span>
          <span class="stat-value">{{ cluesFound }}/12</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">访问的地点:</span>
          <span class="stat-value">{{ visitedLocations }}/5</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">收集的物品:</span>
          <span class="stat-value">{{ inventoryCount }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">完成度:</span>
          <span class="stat-value">{{ completionPercentage }}%</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">游戏得分:</span>
          <span class="stat-value">{{ finalScore }}</span>
        </div>
      </div>
      
      <div class="success-level" :class="successLevelClass">
        <div class="level-icon">{{ levelIcon }}</div>
        <div class="level-title">{{ levelTitle }}</div>
        <div class="level-desc">{{ levelDesc }}</div>
      </div>
      
      <div class="completion-message">
        <p>🎉 恭喜你完成了这次伟大的冒险！</p>
        <p>星辰之眼不仅是传说中的宝物，更是连接古老文明的钥匙。</p>
        <p>你的勇气和智慧将被永远铭记！</p>
      </div>
      
      <div class="action-buttons">
        <button class="glow-button primary" @click="handleNewGame">
          🎮 开始新的冒险
        </button>
        <button class="glow-button secondary" @click="handleViewRanking">
          🏆 查看排行榜
        </button>
        <button class="glow-button secondary" @click="handleBackToMap">
          🗺️ 返回地图
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'
import { useUserStore } from '@/stores/user'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'TreasureComplete',
  emits: ['new-game', 'back-to-map'],
  setup(props, { emit }) {
    const gameStore = useGameStore()
    const userStore = useUserStore()
    const router = useRouter()
    
    const cluesFound = computed(() => gameStore.cluesFound)
    const visitedLocations = computed(() => gameStore.visitedLocations.length)
    const inventoryCount = computed(() => gameStore.inventory.length)
    
    const completionPercentage = computed(() => {
      const totalPossible = 12 + 5 // 线索 + 地点
      const actual = cluesFound.value + visitedLocations.value
      return Math.round((actual / totalPossible) * 100)
    })
    
    const finalScore = computed(() => {
      let score = cluesFound.value * 100
      score += visitedLocations.value * 50
      score += inventoryCount.value * 30
      score += completionPercentage.value * 2
      
      // 额外奖励
      if (gameStore.hasDecoded) score += 200
      if (gameStore.foundTreasure) score += 500
      
      return Math.max(score, 100)
    })
    
    const successLevel = computed(() => {
      if (cluesFound.value >= 10 && visitedLocations.value >= 5) return 3
      if (cluesFound.value >= 7 && visitedLocations.value >= 4) return 2
      if (cluesFound.value >= 4) return 1
      return 0
    })
    
    const successLevelClass = computed(() => `level-${successLevel.value}`)
    
    const levelInfo = computed(() => {
      const levels = {
        3: {
          icon: '🏆',
          title: '传奇冒险家',
          desc: '完美完成所有挑战！'
        },
        2: {
          icon: '⭐',
          title: '资深探险家', 
          desc: '出色地完成了冒险！'
        },
        1: {
          icon: '🎯',
          title: '勇敢寻宝者',
          desc: '成功找到了宝藏！'
        },
        0: {
          icon: '🔍',
          title: '幸运发现者', 
          desc: '完成了基本目标！'
        }
      }
      return levels[successLevel.value]
    })
    
    const levelIcon = computed(() => levelInfo.value.icon)
    const levelTitle = computed(() => levelInfo.value.title)
    const levelDesc = computed(() => levelInfo.value.desc)
    
    const sparkleStyle = (index) => {
      const angle = (index / 20) * 360
      const distance = 120 + Math.random() * 40
      return {
        transform: `rotate(${angle}deg) translate(${distance}px) rotate(-${angle}deg)`
      }
    }
    
    const handleNewGame = () => {
      // 先保存当前游戏成绩
      saveGameResult()
      // 重置游戏
      gameStore.resetGame()
      emit('new-game')
    }
    
    const handleBackToMap = () => {
      saveGameResult()
      emit('back-to-map')
    }
    
    const handleViewRanking = () => {
      saveGameResult()
      router.push('/ranking')
    }
    
    const saveGameResult = () => {
      if (userStore.isLoggedIn) {
        const gameTime = Math.floor((new Date() - new Date(gameStore.gameStartTime)) / 1000)
        userStore.updateUserStats(finalScore.value, gameTime, cluesFound.value, visitedLocations.value)
        console.log('✅ 游戏成绩已保存:', { 
          score: finalScore.value, 
          time: gameTime,
          clues: cluesFound.value,
          locations: visitedLocations.value
        })
      }
    }
    
    onMounted(() => {
      // 自动保存游戏结果
      saveGameResult()
    })
    
    return {
      cluesFound,
      visitedLocations,
      inventoryCount,
      completionPercentage,
      finalScore,
      successLevelClass,
      levelIcon,
      levelTitle,
      levelDesc,
      sparkleStyle,
      handleNewGame,
      handleBackToMap,
      handleViewRanking
    }
  }
}
</script>

<style scoped>
#treasure-complete {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.complete-content {
  text-align: center;
  max-width: 600px;
  background: rgba(42, 42, 66, 0.9);
  border-radius: 20px;
  padding: 3rem;
  border: 3px solid #ffd700;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.treasure-animation {
  position: relative;
  margin-bottom: 2rem;
}

.treasure-icon {
  font-size: 6rem;
  animation: treasureGlow 2s ease-in-out infinite;
}

@keyframes treasureGlow {
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
  }
  50% { 
    transform: scale(1.1);
    filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
  }
}

.sparkles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffd700;
  border-radius: 50%;
  animation: sparkleTwinkle 1.5s ease-in-out infinite;
}

@keyframes sparkleTwinkle {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.complete-title {
  color: #ffd700;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

.completion-stats {
  background: rgba(58, 58, 92, 0.6);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.8rem 0;
  padding: 0.5rem 1rem;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 10px;
}

.stat-label {
  color: #ffd700;
  font-weight: bold;
}

.stat-value {
  color: #e0e0e0;
  font-weight: bold;
  font-size: 1.1rem;
}

.success-level {
  background: rgba(58, 58, 92, 0.8);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 2px solid;
  transition: all 0.3s ease;
}

.success-level.level-3 {
  border-color: #ffd700;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.1));
}

.success-level.level-2 {
  border-color: #c0c0c0;
  background: linear-gradient(135deg, rgba(192, 192, 192, 0.2), rgba(192, 192, 192, 0.1));
}

.success-level.level-1 {
  border-color: #cd7f32;
  background: linear-gradient(135deg, rgba(205, 127, 50, 0.2), rgba(205, 127, 50, 0.1));
}

.success-level.level-0 {
  border-color: #b8b8b8;
  background: linear-gradient(135deg, rgba(184, 184, 184, 0.2), rgba(184, 184, 184, 0.1));
}

.level-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.level-title {
  color: #ffd700;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.level-desc {
  color: #e0e0e0;
  font-size: 1.1rem;
}

.completion-message {
  background: rgba(255, 215, 0, 0.1);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #ffd700;
}

.completion-message p {
  margin: 0.5rem 0;
  color: #e0e0e0;
  line-height: 1.6;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.glow-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.glow-button.primary {
  background: linear-gradient(135deg, #ffd700 0%, #e6c200 100%);
  color: #1a1a2e;
}

.glow-button.secondary {
  background: rgba(58, 58, 92, 0.8);
  color: #ffd700;
  border: 2px solid #ffd700;
}

.glow-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
}

@media (max-width: 768px) {
  .complete-content {
    padding: 2rem;
    margin: 1rem;
  }
  
  .complete-title {
    font-size: 2rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
}
</style>