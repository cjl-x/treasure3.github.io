<template>
  <div class="user-profile">
    <div class="profile-header">
      <h2>用户资料</h2>
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </div>
    
    <div class="profile-content">
      <div class="profile-info">
        <div class="info-item">
          <span class="label">用户名:</span>
          <span class="value">{{ currentUser.username }}</span>
        </div>
        <div class="info-item">
          <span class="label">加入时间:</span>
          <span class="value">{{ formatDate(currentUser.joinDate) }}</span>
        </div>
        <div class="info-item">
          <span class="label">游戏次数:</span>
          <span class="value">{{ currentUser.gamesPlayed }}</span>
        </div>
        <div class="info-item">
          <span class="label">最高分数:</span>
          <span class="value">{{ currentUser.bestScore }}</span>
        </div>
        <div class="info-item">
          <span class="label">最佳时间:</span>
          <span class="value">{{ formatTime(currentUser.bestTime) }}</span>
        </div>
        <!-- 新增游戏数据 -->
        <div class="info-item" v-if="currentUser.lastGameScore">
          <span class="label">最后游戏分数:</span>
          <span class="value">{{ currentUser.lastGameScore }}</span>
        </div>
        <div class="info-item" v-if="currentUser.lastGameClues">
          <span class="label">最后游戏线索:</span>
          <span class="value">{{ currentUser.lastGameClues }}/12</span>
        </div>
        <div class="info-item" v-if="currentUser.lastGameLocations">
          <span class="label">最后访问地点:</span>
          <span class="value">{{ currentUser.lastGameLocations }}/5</span>
        </div>
        <div class="info-item" v-if="currentUser.lastPlayDate">
          <span class="label">最后游戏时间:</span>
          <span class="value">{{ formatDate(currentUser.lastPlayDate) }}</span>
        </div>
      </div>
      
      <div class="achievements-section">
        <h3>成就</h3>
        <div class="achievements-grid">
          <div v-for="achievement in userAchievements" 
               :key="achievement.id"
               class="achievement-item">
            <div class="achievement-icon">{{ achievement.icon }}</div>
            <div class="achievement-info">
              <div class="achievement-title">{{ achievement.title }}</div>
              <div class="achievement-desc">{{ achievement.description }}</div>
            </div>
          </div>
          <div v-if="userAchievements.length === 0" class="no-achievements">
            尚未获得任何成就
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

export default {
  name: 'UserProfile',
  emits: ['logout'],
  setup(props, { emit }) {
    const userStore = useUserStore()
    
    const achievementData = {
      'first_clue': { title: '首次发现', description: '发现第一条线索', icon: '🔍' },
      'master_explorer': { title: '探险大师', description: '访问3个以上地点', icon: '🗺️' },
      'treasure_hunter': { title: '宝藏猎人', description: '收集5条以上线索', icon: '💎' },
      'lore_master': { title: '考古专家', description: '成功破解神秘符号', icon: '📜' },
      'completionist': { title: '完美冒险', description: '完成所有主要探索', icon: '⭐' }
    }

    const userAchievements = computed(() => {
      return Array.from(userStore.achievements).map(id => ({
        id,
        ...achievementData[id]
      }))
    })

    const handleLogout = () => {
      userStore.logout()
      emit('logout')
    }

    const formatDate = (dateString) => {
      if (!dateString) return '暂无'
      return new Date(dateString).toLocaleDateString('zh-CN')
    }

    const formatTime = (seconds) => {
      if (!seconds) return '暂无'
      const minutes = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${minutes}分${secs}秒`
    }

    return {
      currentUser: userStore.currentUser,
      userAchievements,
      handleLogout,
      formatDate,
      formatTime
    }
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.profile-header h2 {
  color: #ffd700;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 107, 107, 0.8);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(255, 107, 107, 1);
  transform: translateY(-2px);
}

.profile-content {
  background: rgba(42, 42, 66, 0.6);
  border-radius: 15px;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.profile-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(58, 58, 92, 0.5);
  border-radius: 10px;
  border-left: 3px solid #ffd700;
}

.label {
  color: #ffd700;
  font-weight: bold;
}

.value {
  color: #e0e0e0;
}

.achievements-section h3 {
  color: #ffd700;
  margin-bottom: 1rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.achievement-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(58, 58, 92, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.achievement-icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.achievement-title {
  color: #ffd700;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.achievement-desc {
  color: #b8b8b8;
  font-size: 0.9rem;
}

.no-achievements {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #b8b8b8;
  font-style: italic;
  background: rgba(58, 58, 92, 0.3);
  border-radius: 10px;
}
</style>