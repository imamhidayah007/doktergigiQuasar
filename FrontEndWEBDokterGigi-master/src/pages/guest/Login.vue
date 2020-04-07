<template>
  <q-page padding class="items-center justify-center">
      <div class="row fixed-center full-width">
        <div class="col-md-4 offset-md-4 col-xs-12 q-pb-lg q-pl-md q-pr-md q-pt-sm">
          <q-card class="my-card bg-white text-black">
            <q-card-section class="text-center">
              <img src="statics/doctor.png" style="height: 100px;max-width: 150px;"/>
            </q-card-section>
            <q-card-section>
              <div class="text-secondary text-center text-h4">VELLID</div>
              <div class="text-black text-center text-subtitle1">Silahkan Login Disini</div>
            </q-card-section>
            <q-card-section>
              <q-input v-model="username" label="Username">
                <template v-slot:append>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input v-on:keyup.enter="login()" type="password" class="q-pt-lg" v-model="password" label="Password">
                <template v-slot:append>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section>
              <div class="row q-col-gutter-xs">
                <div class="col-md-5 col-xs-12 col-sm-12">
                  <!-- <router-link style="text-decoration:none;color:teal;" to="/register">Lupa Password ?</router-link> -->
                </div>
                <div class="col-md-4 col-xs-12 col-sm-12">
                  <q-btn class="full-width" rounded flat :loading="loading" to="/register" color="secondary" label="Register" />
                </div>
                <div class="col-md-3 col-xs-12 col-sm-12">
                  <q-btn class="full-width" rounded :loading="loading" color="secondary" @click="login()" label="Login" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      loading: false,
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.username === '' || this.password === '') {
        this.showNotif('Username/Password Tidak Boleh Kosong', 'red')
        return
      }
      this.$axios
        .post('users/login', {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.data.error === true) {
            this.showNotif(res.data.msg, 'red')
          } else {
            if (res.data.status === 0) {
              this.$q.localStorage.set('dataadmin', res.data.token)
              this.$q.sessionStorage.set('sessionadmin', res.data.token)
              this.$router.push('/admin')
            } else {
              this.$q.localStorage.set('datauser', res.data.token)
              this.$q.sessionStorage.set('sessionuser', res.data.token)
              this.$q.localStorage.set('cart', res.data.cart)
              this.$router.push('/')
            }
          }
        })
        .catch((err) => {
          this.showNotif(err.toString(), 'red')
        })
    },
    showNotif (message, jenis) {
      this.$q.notify({
        message: message,
        color: jenis,
        timeout: 2000,
        actions: [{ icon: 'close', color: 'white' }]
      })
    },
    simulateProgress () {
      // we set loading state
      this.loading = true
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this.loading = false
      }, 3000)
    }
  }
}
</script>
