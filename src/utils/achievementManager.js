export class AchievementManager {
  constructor(gameStore, userStore) {
    this.gameStore = gameStore
    this.userStore = userStore
  }

  checkAchievements() {
    this.checkFirstClue()
    this.checkMasterExplorer()
    this.checkTreasureHunter()
    this.checkLoreMaster()
    this.checkCompletionist()
  }

  checkFirstClue() {
    if (this.gameStore.cluesFound >= 1 && !this.userStore.achievements.has('first_clue')) {
      this.unlockAchievement('first_clue', '首次发现', '你发现了第一条线索！', '🔍')
    }
  }

  checkMasterExplorer() {
    if (this.gameStore.visitedLocations.length >= 3 && !this.userStore.achievements.has('master_explorer')) {
      this.unlockAchievement('master_explorer', '探险大师', '访问了3个以上地点！', '🗺️')
    }
  }

  checkTreasureHunter() {
    if (this.gameStore.cluesFound >= 5 && !this.userStore.achievements.has('treasure_hunter')) {
      this.unlockAchievement('treasure_hunter', '宝藏猎人', '收集了5条以上线索！', '💎')
    }
  }

  checkLoreMaster() {
    if (this.gameStore.hasDecoded && !this.userStore.achievements.has('lore_master')) {
      this.unlockAchievement('lore_master', '考古专家', '成功破解了神秘符号！', '📜')
    }
  }

  checkCompletionist() {
    if (this.gameStore.visitedLocations.length >= 5 && this.gameStore.cluesFound >= 8 && 
        !this.userStore.achievements.has('completionist')) {
      this.unlockAchievement('completionist', '完美冒险', '完成了所有主要探索！', '⭐')
    }
  }

  unlockAchievement(id, title, description, icon = '🏆') {
    this.userStore.unlockAchievement(id)
    this.gameStore.showAchievement({ title, description, icon })
  }
}