<template>
  <div class="ranking-view">
    <div class="main-container">
      <Leaderboard />
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
import Leaderboard from '@/components/user/Leaderboard.vue'

export default {
  name: 'RankingView',
  components: {
    Leaderboard
  }
}
</script>

<style scoped>
.ranking-view {
  min-height: 100vh;
  padding-bottom: 80px;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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