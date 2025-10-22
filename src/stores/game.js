import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({  // 游戏状态
  
    stage: "cover",
    currentLocation: "cover",
    hasDecoded: false,
    isPrepared: true,
    visitedLocations: ["cover"],
    inventory: [],
    cluesFound: 0,
    discoveredClues: [],
    foundTreasure: false,
    gameStartTime: new Date().toISOString(),
    
    // 新增状态
    gameCompleted: false,
    finalScore: 0,
    gameEndTime: null,
    
    // UI状态
    isMusicMuted: localStorage.getItem('game_muted') === 'true',
    isStatusMinimized: false,
    currentHint: null,
    currentAchievement: null
  }),

  getters: {
    locationName: (state) => {
      const locations = {
        'cover': '祖父的书房',
        'worldmap': '世界地图',
        'library': '古老图书馆',
        'temple': '蛇形神庙',
        'market': '古董市场',
        'village': '古老村庄',
        'mountain': '神秘山脉'
      }
      return locations[state.currentLocation] || '未知地点'
    },
    
    cluesProgress: (state) => `${state.cluesFound}/12`,
    
    currentQuests: (state) => [
      { text: '探索祖父的书房', completed: state.currentLocation !== 'cover' },
      { text: '破解神秘符号', completed: state.hasDecoded },
      { text: '收集至少3条线索', completed: state.cluesFound >= 3 },
      { text: '访问所有地点', completed: state.visitedLocations.length >= 5 },
      { text: '找到星辰之眼', completed: state.foundTreasure },
      { text: '建立完整线索链', completed: state.cluesFound >= 8 }
    ]
  },

  actions: {
    setStage(stage) {
      this.stage = stage
      this.currentLocation = stage
    },

    enterLocation(location) {
      this.currentLocation = location
      if (!this.visitedLocations.includes(location)) {
        this.visitedLocations.push(location)
      }
    },

    addClue(clueText) {
      if (clueText && !this.discoveredClues.includes(clueText)) {
        this.discoveredClues.push(clueText)
        this.cluesFound++
      }
    },

    addItem(item) {
      if (item && !this.inventory.includes(item)) {
        this.inventory.push(item)
      }
    },

    toggleMusic() {
      this.isMusicMuted = !this.isMusicMuted
      localStorage.setItem('game_muted', this.isMusicMuted)
    },

    toggleStatusPanel() {
      this.isStatusMinimized = !this.isStatusMinimized
    },

    showHint(hint) {
      this.currentHint = hint
    },

    hideHint() {
      this.currentHint = null
    },

    showAchievement(achievement) {
      this.currentAchievement = achievement
      setTimeout(() => {
        this.currentAchievement = null
      }, 3000)
    },

    completeGame(score) {
      this.gameCompleted = true
      this.finalScore = score
      this.gameEndTime = new Date().toISOString()
      this.foundTreasure = true
    },

    resetGame() {
      this.stage = "cover"
      this.currentLocation = "cover"
      this.hasDecoded = false
      this.isPrepared = true
      this.visitedLocations = ["cover"]
      this.inventory = []
      this.cluesFound = 0
      this.discoveredClues = []
      this.foundTreasure = false
      this.gameCompleted = false
      this.finalScore = 0
      this.gameEndTime = null
      this.gameStartTime = new Date().toISOString()
    }
  }
})