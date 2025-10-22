<template>
  <div id="app">
    <MusicControls />
    <StatusPanel />
    <HintSystem />
    <AchievementPopup />
    <router-view />
  </div>
</template>

<script>
import MusicControls from '@/components/common/MusicControls.vue'
import StatusPanel from '@/components/common/StatusPanel.vue'
import HintSystem from '@/components/common/HintSystem.vue'
import AchievementPopup from '@/components/common/AchievementPopup.vue'

export default {
  name: 'App',
  components: {
    MusicControls,
    StatusPanel,
    HintSystem,
    AchievementPopup
  }
}
</script>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
}

body {
  background: linear-gradient(135deg, #0c0c1d 0%, #1a1a2e 50%, #16213e 100%);
  color: #f0f0f0;
  min-height: 100vh;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
}

/* 动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
}
</style>