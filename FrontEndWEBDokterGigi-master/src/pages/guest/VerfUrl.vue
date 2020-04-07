<template>
  <q-page padding class="items-center justify-center">
      <div class="row justify-center full-width">
        <div class="col-md-6 col-xs-12 q-pb-lg q-pl-md q-pr-md q-pt-sm">
          <q-card flat bordered class="my-card">
            <q-card-section>
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-h6 text-blue-grey-14">Verifikasi {{ msg }}</div>
                </div>
              </div>
            </q-card-section>

            <q-card-section class="text-blue-grey-14">
              Silahkan Login
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

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  async created () {
    try {
      await this.$axios.post('users/verfemailviarul', {
        token: this.$route.params.token
      })
        .then(resolve => {
          if (resolve.data.error) {
            this.msg = 'Gagal'
          } else {
            this.msg = 'Berhasil'
          }
        }
        )
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
