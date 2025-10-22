<template>
  <div class="user-login">
    <div class="login-container">
      <h2>{{ isLogin ? '登录' : '注册' }}</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>用户名:</label>
          <input v-model="form.username" type="text" required>
        </div>
        
        <div class="form-group">
          <label>密码:</label>
          <input v-model="form.password" type="password" required>
        </div>
        
        <button type="submit" class="glow-button">
          {{ isLogin ? '登录' : '注册' }}
        </button>
      </form>
      
      <p class="toggle-mode">
        {{ isLogin ? '没有账号？' : '已有账号？' }}
        <a href="#" @click.prevent="toggleMode">
          {{ isLogin ? '立即注册' : '立即登录' }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  name: 'UserLogin',
  data() {
    return {
      isLogin: true,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleSubmit() {
      const userStore = useUserStore()
      
      try {
        if (this.isLogin) {
          await userStore.login(this.form.username, this.form.password)
          this.$emit('login-success')
        } else {
          await userStore.register(this.form.username, this.form.password)
          this.isLogin = true
          this.$emit('register-success')
        }
        
        this.form.username = ''
        this.form.password = ''
      } catch (error) {
        alert(error.message)
      }
    },
    
    toggleMode() {
      this.isLogin = !this.isLogin
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>

<style scoped>
.user-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.login-container {
  background: rgba(42, 42, 66, 0.9);
  border: 2px solid #ffd700;
  border-radius: 15px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
}

h2 {
  color: #ffd700;
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  color: #ffd700;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #3a3a5c;
  border-radius: 5px;
  background: rgba(58, 58, 92, 0.6);
  color: #f0f0f0;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #ffd700;
}

.glow-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #ffd700 0%, #e6c200 100%);
  color: #1a1a2e;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.glow-button:hover {
  transform: translateY(-2px);
}

.toggle-mode {
  text-align: center;
  margin-top: 1rem;
  color: #b8b8b8;
}

.toggle-mode a {
  color: #ffd700;
  text-decoration: none;
}

.toggle-mode a:hover {
  text-decoration: underline;
}
</style>