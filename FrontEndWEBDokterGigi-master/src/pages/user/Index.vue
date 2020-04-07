<template>
  <q-page padding>
    <div class="row">
      <q-carousel
      animated
      v-model="header"
      arrows
      navigation
      navigation-icon="minimize"
      infinite
      swipeable
      style="width:100%;height:100%;"
      >
        <q-carousel-slide class="img-responsive" :ratio="0" v-for="(image, i) in images" :name="(i+1)"  :key="image._id">
          <q-img @click="detailpromosi(image._id)" spinner-color="teal" :src="linkBanner+image.imageName" placeholder-src="statics/default-placeholder-1024x1024-570x321.png"/>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="row justify-end">
      <div class="col-md-6 col-sm-12 col-xs-12 desktop-only">
        <div class="text-h5 text-blue-grey-14 q-pt-md q-pb-md">List Kegiatan Untuk Kamu</div>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <q-input ref="search" v-on:keyup.enter="fNull()" class="q-mb-md text-red" placeholder="Cari Disini ... " color="red" bg-color="grey-2" rounded standout v-model="keyword">
          <template v-slot:append>
            <q-icon v-if="keyword === ''" color="secondary" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="keyword = ''" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div v-for="(event) in computedList" :key="event._id" class="col-md-4 col-xs-12">
        <q-card square flat class="bg-white">
          <q-item>
            <q-item-section avatar>
              <q-avatar class="text-blue-grey-6" icon="fas fa-user"/>
            </q-item-section>

            <q-item-section class="text-blue-grey-9">
              <q-item-label>{{ event.data_author[0].nama_lengkap }}</q-item-label>
              <q-item-label caption>Publisher</q-item-label>
            </q-item-section>
          </q-item>
          <q-img
            @click="detail(event._id)"
            :src="link+'data/event/'+parseImg(event.pamflet)"
            basic
            clickable
            spinner-color="teal"
            :ratio="1"
            placeholder-src="statics/default-placeholder-1024x1024-570x321.png"
            >
          </q-img>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6 text-blue-grey-14 ellipsis">{{ event.tittle }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="teal" name="location_on" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-blue-grey-14">
                    <div v-if="event.lokasi !== null" class="text-subtitle1 ellipsis">{{ event.lokasi }}</div>
                    <div v-if="event.lokasi === '' || event.lokasi === null" class="text-subtitle1">Lokasi Tidak Tersedia</div>
                  </q-item-label>
                  <q-item-label class="text-h6 text-blue-grey-14">
                    <div class="text-caption">{{ event.provinsi + ' - ' + event.kota }}</div>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="teal" name="event" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h6 text-blue-grey-14">
                    <div v-if="event.lokasi !== null" class="text-subtitle1 ellipsis">{{ getFullDate(event.tgl_mulai) + ' - ' + getFullDate(event.tgl_selesai) }}</div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          <q-card-actions align="around">
            <q-btn flat round color="teal" :to="`detailevent/${event._id}`" icon="info" />
            <q-btn flat round color="warning" @click="addToCart(event._id,event.lokasi,event.tittle)" icon="shopping_cart" />
            <q-btn flat round color="primary" icon="share" @click="share(event._id)"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 500px">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="text-blue-grey-14 text-subtittle">Bagikan</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-btn icon="close" flat round v-close-popup/>
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item>
            <q-item-section>
              <q-card-actions align="around">
                <a target="_blank" :href="'https://www.facebook.com/sharer/sharer.php?u='+link+linkActive"><q-btn icon="fab fa-facebook" size="xl" flat color="blue-9"/></a>
                <a target="_blank" :href="'https://twitter.com/share?url='+link+linkActive">
                  <q-btn icon="fab fa-twitter" size="xl" flat color="light-blue-5"/>
                </a>
                <a target="_blank" :href="'https://api.whatsapp.com/send?text='+link+linkActive">
                  <q-btn icon="fab fa-whatsapp-square" size="xl" flat color="green-14"/>
                </a>
              </q-card-actions>
            </q-item-section>
          </q-item>
          <q-separator spaced />
          <q-item>
            <q-item-section class="text-blue-grey-14 text-subtittle">
              Bagikan kegiatan melalui sosial media kamu
            </q-item-section>
          </q-item>

        </q-list>
        <div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style>
</style>

<script>
import jwtDecoder from 'jwt-decode'
import { LocalStorage } from 'quasar'
let tokenUser = LocalStorage.getItem('datauser')
let userData = jwtDecoder(tokenUser)
export default {
  name: 'PageIndex',
  data () {
    return {
      dialog: false,
      header: 1,
      position: 'bottom',
      idUser: userData._id,
      events: [],
      link: 'http://dettacare-event.pptik.id/',
      linkBanner: 'http://dettacare-event.pptik.id/data/banner/',
      slide: 1,
      slideGambar: [],
      linkActive: '',
      images: [],
      keyword: ''
    }
  },
  async created () {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.get('event/get_event')
          .then(resolve => {
            this.events = resolve.data.data
          })
        await this.$axios.get('article/getallpromosi')
          .then(res => {
            this.images = res.data
          })
      } catch (error) {
        console.log(error)
      }
    })
  },
  methods: {
    fNull () {
      // return this.$refs.search.$refs.input
      console.log(this.$refs.search.blur())
    },
    detailpromosi (id) {
      this.$router.push('promosidetail/' + id)
    },
    parseImg (listGambar) {
      var gambar = JSON.parse(listGambar)
      return gambar[0]
    },
    detail (id) {
      this.$router.push('detailevent/' + id)
    },
    getFullDate (date) {
      var newDate = new Date(date)
      let month = '' + (newDate.getMonth() + 1)
      var listMonth = [ 'Januari', 'Februar', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'Desember' ]
      let tgl = '' + (newDate.getDate())
      let year = newDate.getFullYear()
      return tgl + ' ' + listMonth[month - 1] + ' ' + year
    },
    async addToCart (idEvent, lokasi, tittle) {
      const formData = new FormData()
      formData.append('id', this.idUser)
      formData.append('idEvent', idEvent)
      let data = {
        id: this.idUser,
        _id: idEvent,
        lokasi: lokasi,
        namaEvent: tittle
      }
      try {
        await this.$axios.post('users/addtocart', data)
          .then(res => {
            if (res.data.error) {
              this.showNotif('Gagal', 'red')
            } else {
              let cartNow = LocalStorage.getItem('cart')
              let verf = this.find_in_object(cartNow, { _id: idEvent })
              if (verf.length > 0) {
                this.showNotif('Sudah Ada Dikeranjang', 'warning')
              } else {
                this.showNotif('Ditambahkan Ke Keranjang Anda', 'green')
                cartNow.push({
                  _id: idEvent,
                  lokasi: lokasi,
                  namaEvent: tittle
                })
                LocalStorage.set('cart', cartNow)
              }
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
    find_in_object (myObject, myCriteria) {
      return myObject.filter(function (obj) {
        return Object.keys(myCriteria).every(function (c) {
          return obj[c] === myCriteria[c]
        })
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
    share (idEvent) {
      this.dialog = true
      this.linkActive = 'detailevent/' + idEvent
    }
  },
  computed: {
    computedList: function () {
      if (this.keyword === '') {
        return this.events
      } else {
        let vm = this
        return this.events.filter(function (item) {
          return item.tittle.toLowerCase().indexOf(vm.keyword.toLowerCase()) !== -1
        })
      }
    }
  }
}
</script>
