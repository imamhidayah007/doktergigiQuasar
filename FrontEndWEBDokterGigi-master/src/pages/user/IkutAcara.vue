<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-8 col-xs-12">
        <q-list>
          <q-item class="bg-white q-pt-lg q-pb-lg">
            <q-item-section>
              <q-item-label class="text-blue-grey-14 text-h5">Acara Yang Anda Ikuti</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list v-for="cart in cartList" :key="cart._id" class="bg-white q-mt-sm">
          <q-expansion-item
            expand-separator
            icon="event"
            class="text-blue-grey-14"
            :label="sliceText(cart.tittle)"
            :caption="getFullDate(cart.tgl_mulai) + ' - ' + getFullDate(cart.tgl_mulai)"
          >
          <q-separator/>
            <q-card>
              <q-card-section>
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-h6">Detail Pendaftaran</q-item-label>
                      <q-item-label>Anda terdaftar dikategori {{ capitalize(parse(cart.peserta[0].biayaSeminar).jenisPembayaranSeminar) }}</q-item-label>
                      <q-item-label>Rp .{{ parse(cart.peserta[0].biayaSeminar).biaya }} ,-</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-h6">Hand On Yang Anda Ikuti</q-item-label>
                      <q-item-label v-for="handOn in listhandOn(cart.handon, cart.peserta[0].listHandOn)" :key="handOn.id">{{ handOn.handOn[0].value }} - {{ capitalize(handOn.ket.jenis) }} - Rp. {{ handOn.ket.biaya }},-</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-h6">Detail Pembayaran</q-item-label>
                      <q-item-label>Total Pembayaran Rp. {{ cart.peserta[0].totalBayar }},-</q-item-label>
                      <q-item-label :class="`text-weight-bolder  text-${getStatus(cart.peserta[0].status)[1]}`">Status Pembayaran Anda {{ getStatus(cart.peserta[0].status)[0] }}</q-item-label>
                      <q-btn class="q-mt-md" v-if="cart.peserta[0].status === 'b'" icon="delete" color="negative">Cancle</q-btn>
                      <q-btn class="q-mt-md" v-if="cart.peserta[0].status === 's'" disable icon="delete" color="negative">Cancle</q-btn>
                      * Sebelum penyelenggara mengkonfirmasi, anda masih bisa membatalkan keikutsertaan pada kegiatan ini
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
        <q-separator/>
      </div>
  </div>
  </q-page>
</template>

<style>
</style>

<script>
import jwtDecoder from 'jwt-decode'
export default {
  data () {
    return {
      idUser: [],
      cartList: []
    }
  },
  async created () {
    let token = this.$q.localStorage.getItem('datauser')
    let userData = jwtDecoder(token)
    let user = userData
    this.idUser = user._id
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.get('event/getmyevent/' + this.idUser)
          .then(resolve => {
            this.cartList = resolve.data
          })
      } catch (error) {
        console.log(error)
      }
    })
  },
  methods: {
    showNotif (message, jenis) {
      this.$q.notify({
        message: message,
        color: jenis,
        timeout: 2000,
        actions: [{ icon: 'close', color: 'white' }]
      })
    },
    getFullDate (date) {
      var newDate = new Date(date)
      let month = '' + (newDate.getMonth() + 1)
      var listMonth = [ 'Januari', 'Februar', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'Desember' ]
      let tgl = '' + (newDate.getDate())
      let year = newDate.getFullYear()
      return tgl + ' ' + listMonth[month - 1] + ' ' + year
    },
    parse (data) {
      return JSON.parse(data)
    },
    listhandOn (asalhandOn, asallistHandOn) {
      let handOn = JSON.parse(asalhandOn)
      let listHandOn = JSON.parse(asallistHandOn)
      var dataHandOn = []
      for (let i = 0; i < listHandOn.length; i++) {
        let dataHandon = {
          ket: listHandOn[i],
          handOn: this.find_in_object(handOn, { id: listHandOn[i].id })
        }
        dataHandOn.push(dataHandon)
      }
      return dataHandOn
    },
    capitalize (value) {
      if (value == null) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    getStatus (status) {
      if (status === 'b') {
        return ['Belum Diverifikasi Oleh Penyelenggara', 'red']
      } else {
        return ['Sudah Diverifikasi Oleh Penyelenggara', 'green']
      }
    },
    find_in_object (myObject, myCriteria) {
      return myObject.filter(function (obj) {
        return Object.keys(myCriteria).every(function (c) {
          return obj[c] === myCriteria[c]
        })
      })
    },
    sliceText (text) {
      if (!text) return ''
      text.toString()
      if (text.length < 28) {
        return text
      } else {
        return text.substr(0, 30) + '...'
      }
    }
  }
}
</script>
