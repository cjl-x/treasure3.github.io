<template>
  <div class="leaderboard">
    <h2>排行榜</h2>
    
    <div class="leaderboard-content">
      <div class="leaderboard-header">
        <div class="rank">排名</div>
        <div class="username">玩家</div>
        <div class="score">最高分数</div>
        <div class="time">最佳时间</div>
        <div class="games">游戏次数</div>
      </div>
      
      <div class="leaderboard-list">
        <div v-for="(user, index) in leaderboard" 
             :key="user.id"
             :class="['leaderboard-item', { current: user.id === currentUser?.id }]">
          <div class="rank">
            <span v-if="index < 3" class="medal">{{ ['🥇', '🥈', '🥉'][index] }}</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <div class="username">{{ user.username }}</div>
          <div class="score">{{ user.bestScore }}</div>
          <div class="time">{{ formatTime(user.bestTime) }}</div>
          <div class="games">{{ user.gamesPlayed }}</div>
        </div>
      </div>
      
      <div v-if="leaderboard.length === 0" class="empty-state">
        暂无排行榜数据
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

export default {
  name: 'Leaderboard',
  setup() {
    const userStore = useUserStore()
    
    const formatTime = (seconds) => {
      if (!seconds) return '暂无'
      const minutes = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${minutes}分${secs}秒`
    }

    return {
      leaderboard: userStore.leaderboard,
      currentUser: userStore.currentUser,
      formatTime
    }
  }
}
</script>

<style scoped>
.leaderboard {
  max-width: 800px;
  margin: 0 auto;
}

.leaderboard h2 {
  color: #ffd700;
  text-align: center;
  margin-bottom: 2rem;
}

.leaderboard-content {
  background: rgba(42, 42, 66, 0.6);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.leaderboard-header {
  display: grid;
  grid-template-columns: 80px 1fr 100px 120px 100px;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 10px;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 1rem;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.leaderboard-item {
  display: grid;
  grid-template-columns: 80px 1fr 100px 120px 100px;
  gap: 1rem;
  padding: 1rem;
  background: rgba(58, 58, 92, 0.5);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.leaderboard-item:hover {
  background: rgba(58, 58, 92, 0.8);
  transform: translateX(5px);
}

.leaderboard-item.current {
  background: rgba(255, 215, 0, 0.2);
  border: 1px solid #ffd700;
}

.rank {
  text-align: center;
  font-weight: bold;
}

.medal {
  font-size: 1.2rem;
}

.username {
  color: #ffd700;
  font-weight: bold;
}

.score, .time, .games {
  text-align: center;
  color: #e0e0e0;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #b8b8b8;
  font-style: italic;
}
</style>