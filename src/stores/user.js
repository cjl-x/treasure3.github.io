import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || null)
  const users = ref(JSON.parse(localStorage.getItem('gameUsers')) || [])
  const achievements = ref(new Set(JSON.parse(localStorage.getItem('game_achievements') || '[]')))

  const isLoggedIn = computed(() => currentUser.value !== null)
  
  const leaderboard = computed(() => {
    return [...users.value]
      .sort((a, b) => b.bestScore - a.bestScore || a.bestTime - b.bestTime)
      .slice(0, 10)
  })

  function register(username, password) {
    if (users.value.find(user => user.username === username)) {
      throw new Error('用户名已存在')
    }
    
    const newUser = {
      id: Date.now().toString(),
      username,
      password, // 实际项目中应该加密
      bestScore: 0,
      bestTime: 0,
      gamesPlayed: 0,
      joinDate: new Date().toISOString(),
      achievements: [],
      lastGameScore: 0,
      lastGameTime: 0,
      lastGameClues: 0,
      lastGameLocations: 0,
      lastPlayDate: null
    }
    
    users.value.push(newUser)
    localStorage.setItem('gameUsers', JSON.stringify(users.value))
    return newUser
  }

  function login(username, password) {
    const user = users.value.find(u => u.username === username && u.password === password)
    if (user) {
      currentUser.value = user
      localStorage.setItem('currentUser', JSON.stringify(user))
      return user
    }
    throw new Error('用户名或密码错误')
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }

  function updateUserStats(score, time, cluesFound = 0, locationsVisited = 0) {
    if (!currentUser.value) {
      console.warn('未登录用户，无法保存成绩')
      return
    }
    
    const user = users.value.find(u => u.id === currentUser.value.id)
    if (user) {
      user.gamesPlayed++
      
      // 更新最高分和最佳时间
      if (score > user.bestScore) {
        user.bestScore = score
        user.bestTime = time
      }
      
      // 更新游戏统计数据
      user.lastGameScore = score
      user.lastGameTime = time
      user.lastGameClues = cluesFound
      user.lastGameLocations = locationsVisited
      user.lastPlayDate = new Date().toISOString()
      
      localStorage.setItem('gameUsers', JSON.stringify(users.value))
      localStorage.setItem('currentUser', JSON.stringify(user))
      currentUser.value = user
      
      console.log('🎯 用户数据已更新:', {
        score,
        time,
        cluesFound,
        locationsVisited
      })
    }
  }

  function unlockAchievement(achievementId) {
    if (!achievements.value.has(achievementId)) {
      achievements.value.add(achievementId)
      localStorage.setItem('game_achievements', JSON.stringify([...achievements.value]))
    }
  }

  return {
    currentUser,
    users,
    achievements,
    isLoggedIn,
    leaderboard,
    register,
    login,
    logout,
    updateUserStats,
    unlockAchievement
  }
})