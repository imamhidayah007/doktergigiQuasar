<template>
  <q-page padding class="items-center justify-center">
      <div class="row justify-center full-width">
        <div class="col-md-6 col-xs-12 q-pb-lg q-pl-md q-pr-md q-pt-sm">
          <q-card flat bordered class="my-card">
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-h6 text-blue-grey-14">Registrasi Berhasil</div>
                </div>
              </div>
            </q-card-section>

            <q-card-section class="text-blue-grey-14">
              Harap melakukan verifikasi email anda.
              Verifikasi berguna untuk memulihkan akun anda ketika lupa password.
              <div>Buka email anda lalu klik link pada isi pesan verifikasi.</div>
            </q-card-section>

            <q-card-section class="text-blue-grey-14">
              Atau anda dapat memasukan kode
              <q-input v-model="kode" type="number" label="Masukan Kode Disini"></q-input>
              <q-btn @click="verfEmail" class="q-mt-md" color="secondary" label="Verifikasi"/>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-space/> <q-btn to="/login" color="secondary" flat>Login</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      token: '',
      username: '',
      kode: ''
    }
  },
  async created () {
    this.username = this.$route.params.token
  },
  methods: {
    async verfEmail () {
      try {
        await this.$axios.post('users/verfemail', {
          kode: this.kode,
          username: this.username
        })
          .then(res => {
            if (res.data.error) {
              this.showNotif('Kode Salah', 'red')
            } else {
              this.showNotif('Berhasil. Silahkan Login', 'green')
              this.$router.replace('/login')
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
    showNotif (message, jenis) {
      this.$q.notify({
        message: message,
        color: jenis,
        timeout: 2000,
        actions: [{ icon: 'close', color: 'white' }]
      })
    }
  }
}
</script>
