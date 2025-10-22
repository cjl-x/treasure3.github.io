<template>
  <div class="music-controls">
    <button class="music-btn" @click="toggleMusic">
      {{ isMuted ? '🔇' : '♪' }}
    </button>
  </div>
</template>

<script>
import { useGameStore } from '@/stores/game'

export default {
  name: 'MusicControls',
  setup() {
    const gameStore = useGameStore()
    
    const toggleMusic = () => {
      gameStore.toggleMusic()
    }

    return {
      isMuted: gameStore.isMusicMuted,
      toggleMusic
    }
  }
}
</script>

<style scoped>
.music-controls {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.music-btn {
  background: rgba(42, 42, 66, 0.9);
  color: #ffd700;
  border: 2px solid #ffd700;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.music-btn:hover {
  background: #ffd700;
  color: #1a1a2e;
  transform: scale(1.1);
}
</style>