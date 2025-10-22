export class AudioManager {
  constructor() {
    this.audioElements = new Map()
    this.isMuted = localStorage.getItem('game_muted') === 'true'
    this.setupAudioElements()
  }

  setupAudioElements() {
    const audioFiles = {
      'background': 'audio/background.mp3',
      'library': 'audio/library.mp3',
      'temple': 'audio/temple.mp3',
      'market': 'audio/market.mp3'
    }

    Object.entries(audioFiles).forEach(([key, src]) => {
      const audio = new Audio(src)
      audio.loop = key === 'background'
      audio.muted = this.isMuted
      this.audioElements.set(key, audio)
    })
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    localStorage.setItem('game_muted', this.isMuted)
    this.audioElements.forEach(audio => {
      audio.muted = this.isMuted
    })
  }

  playBackground() {
    this.stopAll()
    const audio = this.audioElements.get('background')
    if (audio) {
      audio.volume = 0.7
      audio.play().catch(e => console.log('背景音乐播放被阻止:', e))
    }
  }

  playLocationMusic(location) {
    this.stopAll()
    const audio = this.audioElements.get(location) || this.audioElements.get('background')
    if (audio) {
      audio.volume = 0.6
      audio.play().catch(e => console.log(`地点音乐播放被阻止:`, e))
    }
  }

  stopAll() {
    this.audioElements.forEach(audio => {
      audio.pause()
      audio.currentTime = 0
    })
  }
}