export class HintManager {
  constructor(gameStore) {
    this.gameStore = gameStore
  }

  showLocationHint(location) {
    const hints = {
      'library': '在图书馆中仔细查阅古籍，或许能找到破解符号的关键。管理员可能知道一些不为人知的秘密。',
      'temple': '神庙中危机四伏，观察环境寻找守卫的弱点。古老的机关往往有其规律可循。',
      'market': '与商人交谈可能获得重要信息，但要小心选择。市场里流传着许多真真假假的传说。',
      'village': '村民可能知道一些古老的传说和秘密。长老的智慧往往超乎想象。',
      'mountain': '山脉中隐藏着许多自然线索，仔细观察周围环境。星空会为勇敢者指引方向。'
    }
    
    if (hints[location]) {
      this.showHint('地点提示', hints[location])
    }
  }

  showActionHint(action) {
    const hints = {
      'first_visit': '点击左上角的状态面板可以查看当前进度和收集的物品。',
      'clue_found': '新的线索已记录！继续探索会发现更多秘密。',
      'item_found': '物品已添加到库存，可能在后续冒险中派上用场。',
      'puzzle_solved': '谜题破解！你离真相又近了一步。'
    }
    
    if (hints[action]) {
      this.showHint('系统提示', hints[action])
    }
  }

  showHint(title, content) {
    this.gameStore.showHint({ title, content })
    
    // 5秒后自动隐藏
    setTimeout(() => {
      this.gameStore.hideHint()
    }, 5000)
  }
}