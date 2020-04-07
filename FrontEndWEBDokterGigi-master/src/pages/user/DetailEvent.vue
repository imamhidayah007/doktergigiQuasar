<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <q-card :flat="$q.platform.is.mobile" class="my-card bg-white text-black">
          <div class="row">
            <div class="col-md-6 col-xs-12">
              <q-card-section class="text-blue-grey-14">
                <q-carousel
                  animated
                  v-model="indexPamflet"
                  navigation
                  infinite
                  swipeable
                  arrows
                  :fullscreen.sync="fullscreen"
                  control-color="blue-grey-14"
                  ref="carousel"
                  style="height:100%;"
                >
                  <q-carousel-slide :ratio="0" v-for="(p, i) in pamflet_tampil" :name="(i+1)" :key="i+1">
                    <q-img spinner-color="teal" :src="link+p" placeholder-src="statics/default-placeholder-1024x1024-570x321.png"/>
                  </q-carousel-slide>
                  <template v-slot:control>
                    <q-carousel-control
                      position="bottom-right"
                      :offset="[18, 18]"
                    >
                      <q-btn
                        push round dense color="white" text-color="primary"
                        :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                        @click="fullscreen = !fullscreen"
                      />
                    </q-carousel-control>
                  </template>
                </q-carousel>
              </q-card-section>
            </div>
            <div class="col-md-6 col-xs-12 q-pr-sm q-mt-md">
              <q-tabs
                v-model="tab"
                dense
                class="bg-white text-blue-grey-14"
                active-color="secondary"
                indicator-color="secondary"
                align="justify"
              >
                <q-tab name="general" label="General" />
                <q-tab name="biaya" label="Biaya" />
                <q-tab name="handon" label="Hands On" />
                <q-tab name="kontak" label="Kontak" />
              </q-tabs>

              <q-tab-panels v-model="tab" animated class="text-blue-grey-14">
                <q-tab-panel name="general">
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-blue-grey-14 text-h6">{{ tittle }}</q-item-label>
                        <q-item-label class="text-blue-grey-14 text-subtitle1">{{ kategori }} ({{ skp + ' SKP' }})</q-item-label>
                        <q-item-label class="text-blue-grey-14 text-caption1">Oleh {{ dataAuthor.nama_lengkap }}<q-chip dense :color="getStatus(dataAuthor.verfStatus)[1]" :label="getStatus(dataAuthor.verfStatus)[0]" text-color="white" :icon-right="getStatus(dataAuthor.verfStatus)[2]"/></q-item-label>
                        <q-item-label v-if="dataAuthor.verfStatus === 0" class="text-negative text-subtitle1">Berbahaya mendaftar pada kegiatan yang dibuat oleh user yang belum terverifikasi !</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="secondary" name="event" />
                      </q-item-section>
                      <q-item-section>{{ startDate }} - {{ endDate }}</q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="secondary" name="access_time" />
                      </q-item-section>
                      <q-item-section>{{ startTime }} - {{ endTime }}</q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="secondary" name="location_on" />
                      </q-item-section>
                      <q-item-section>
                        <div>{{ lokasi }}</div>
                        <div class="text-caption">{{ provinsi + ' - ' + kota }}</div>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="secondary" name="people" />
                      </q-item-section>
                      <q-item-section>
                        <div class="text-h7">{{ kouta }} Kuota</div>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="secondary" name="record_voice_over" />
                      </q-item-section>
                      <q-item-section>
                        <div class="text-h7" v-for="narasumber in narasumbers" :key="narasumber.id">
                          {{ narasumber.value }}
                        </div>
                      </q-item-section>
                    </q-item>

                    <q-card-section>
                      <div class="row q-col-gutter-xs">
                        <div class="col-md-6 col-xs-12 col-sm-12 q-pb-md">
                          <q-btn icon="shopping_cart" class="full-width" @click="addToCart(id, lokasi, tittle)" rounded flat color="secondary" label="Tambah Keranjang" />
                        </div>
                        <div class="col-md-6 col-xs-12 col-sm-12">
                          <q-btn class="full-width" rounded color="secondary" @click="verfRegist()" label="Daftar Sekarang" />
                        </div>
                      </div>
                    </q-card-section>

                  </q-list>
                </q-tab-panel>

                <q-tab-panel name="biaya">
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-blue-grey-14 text-h6">Detail Kategori Dan Biaya Pendaftaran</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="fab fa-earlybirds" color="secondary"></q-icon>
                      </q-item-section>
                      <q-item-section>
                        <div class="text-h6">Early Bird Rp. {{ biaya_early_bird }} ,-</div>
                        <div class="text-h7 text-blue-grey-13">Batas Early Bird {{ startEarlyBird }}</div>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="payment" color="secondary"></q-icon>
                      </q-item-section>
                      <q-item-section>
                        <div class="text-h6">Reguler Rp. {{ biaya_reguler }} ,-</div>
                        <div class="text-h7 text-blue-grey-13">Batas Reguler {{ startReguler }}</div>
                      </q-item-section>
                    </q-item>

                    <q-item>
                      <q-item-section avatar>
                        <q-icon name="far fa-calendar-times" color="secondary"></q-icon>
                      </q-item-section>
                      <q-item-section>
                        <div class="text-h6">Late Rp. {{ biaya_late }} ,-</div>
                        <div class="text-h7 text-blue-grey-13">Batas Late {{ startLate }}</div>
                      </q-item-section>
                    </q-item>

                  </q-list>
                </q-tab-panel>

                <q-tab-panel name="handon">
                  <q-list v-for="(h, i) in handon" :key="i" class="rounded-borders">
                    <q-expansion-item
                      expand-separator
                      class="text-h6"
                      :label="h.value"
                      :caption="`${h.skp_hand_on} Poin SKP`"
                    >
                      <q-list>
                        <q-item>
                          <q-item-section avatar>
                            <q-icon name="access_time" color="secondary"></q-icon>
                          </q-item-section>
                          <q-item-section>
                            <div class="text-subtitle2">{{ h.start_hand_on }} - {{ h.end_hand_on }}</div>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section avatar>
                            <q-icon name="people" color="secondary"></q-icon>
                          </q-item-section>
                          <q-item-section>
                            <div class="text-subtitle2">{{ h.kouta }} Kouta</div>
                          </q-item-section>
                        </q-item>

                        <q-item>
                          <q-item-section avatar>
                            <q-icon name="fab fa-earlybirds" color="secondary"></q-icon>
                          </q-item-section>
                          <q-item-section>
                            <div class="text-subtitle2">Early Bird Rp. {{ h.biaya_early_bird }} ,-</div>
                            <div class="text-caption text-blue-grey-13">Batas Early Bird {{ getFullDate(h.batas_early_bird) }}</div>
                          </q-item-section>
                        </q-item>

                        <q-item>
                          <q-item-section avatar>
                            <q-icon name="payment" color="secondary"></q-icon>
                          </q-item-section>
                          <q-item-section>
                            <div class="text-subtitle2">Reguler Rp. {{ h.biaya_reguler }} ,-</div>
                            <div class="text-caption text-blue-grey-13">Batas Reguler {{ getFullDate(h.batas_reguler) }}</div>
                          </q-item-section>
                        </q-item>

                        <q-item>
                          <q-item-section avatar>
                            <q-icon name="far fa-calendar-times" color="secondary"></q-icon>
                          </q-item-section>
                          <q-item-section>
                            <div class="text-subtitle2">Late Rp. {{ h.biaya_reguler }} ,-</div>
                            <div class="text-caption text-blue-grey-13">Batas Late {{ getFullDate(h.batas_reguler) }}</div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-expansion-item>
                  </q-list>
                </q-tab-panel>

                <q-tab-panel name="kontak">
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="text-blue-grey-14 text-h6">List No Rekening</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item v-for="rek in rekening" :key="rek.id">
                      <q-item-section avatar>
                        <q-icon color="secondary" name="fas fa-money-check" />
                      </q-item-section>
                      <q-item-section>
                        <div class="text-h7">{{ rek.no_rek }} ({{ rek.nama_bank }})</div>
                        <div class="text-caption text-blue-grey-13">Atas Nama {{ rek.an_no_rek }}</div>
                      </q-item-section>
                    </q-item>
                  </q-list>

                  <q-item>
                      <q-item-section>
                        <q-item-label class="text-blue-grey-14 text-h6">List Contact Person</q-item-label>
                      </q-item-section>
                    </q-item>

                  <q-list>
                    <q-item v-for="cp in cps" :key="cp.id">
                      <q-item-section avatar>
                        <q-icon color="secondary" name="call" />
                      </q-item-section>
                      <q-item-section>
                        <div class="text-h7">{{ cp.value }}</div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </q-card>
      </div>
  </div>
  <q-dialog v-model="alert" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6"><q-icon name="warning" color="warning"/> Alert</div>
      </q-card-section>

      <q-card-section>
        Anda Belum melengkapi data diri pendaftaran. Silahkan lengkapi dan kembali mendaftar pada acara ini. Data profil anda sangat penting bagi penyelenggara untuk keperluan rekapitulasi, abseni dan lain sebagainya.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup to="/profile"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="fixed" persistent>
    <q-card>
      <q-card-section>
        <div class="text-negative text-h6"><q-icon name="warning"/> Penting</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <p>Harap dibaca dengan seksama</p>
        <p>1. Periksa kembali data yang akan anda kirim.</p>
        <p>2. Setelah anda mendaftar tidak bisa di lakukan perubahan atau pembatalan.</p>
        <p>3. Pastikan nominal yang anda tranfer sesuai dengan total pembayaran pada aplikasi ini.</p>
        <p>4. Jika terjadi kesalahan harap hubungi pihak penyelenggara.</p>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Tolak" color="primary" v-close-popup />
        <q-btn flat label="Terima" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 500px">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="text-blue-grey-14 text-h6">Detail Registrasi</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-btn icon="close" flat round v-close-popup/>
            </q-item-section>
          </q-item>

        </q-list>
        <q-list link>

          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="jenisPembayaranSeminar" val="early" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Early Bird</q-item-label>
              <q-item-label caption>Rp. {{ biaya_early_bird }},-</q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="jenisPembayaranSeminar" val="reguler" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Reguler</q-item-label>
              <q-item-label caption>Rp. {{ biaya_reguler }},-</q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="jenisPembayaranSeminar" val="late" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Late</q-item-label>
              <q-item-label caption>Rp. {{ biaya_late }},-</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="text-blue-grey-14 text-h6">Daftar Hands On</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
        <q-list link v-for="ho in handon" :key="ho.id">
          <q-item tag="label" @click="addHoList(ho)"  v-ripple>
            <q-item-section avatar>
              <q-checkbox v-model="ho.selected" val="true" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ ho.value }}</q-item-label>
              <q-item-label>{{ ho.skp_hand_on }} Poin SKP</q-item-label>
            </q-item-section>
          </q-item>
          <div v-if="ho.selected" class="row">
            <div class="col-md-4">
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="ho.subHandOn" val="early" color="teal" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Early Bird</q-item-label>
                  <q-item-label caption>Rp. {{ ho.biaya_early_bird }},-</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-md-4">
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="ho.subHandOn" val="reguler" color="teal" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Reguler</q-item-label>
                  <q-item-label caption>Rp. {{ ho.biaya_reguler }},-</q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-md-4">
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio v-model="ho.subHandOn" val="late" color="teal" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Late</q-item-label>
                  <q-item-label caption>Rp. {{ ho.biaya_late }},-</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-list>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon name="fas fa-money-bill-alt" color="green"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6">Rp. {{ total }} ,-</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <q-item-section>
              Upload Bukti Pembayaran
              <q-input
                @change="selectFile()"
                type="file"
                ref="ktp"
              />
            </q-item-section>
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <q-btn rounded @click="sendData()" color="secondary" class="full-width q-pl-xs q-pr-xs" label="Send" />
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
export default {
  data () {
    return {
      fixed: false,
      alert: false,
      fullscreen: false,
      modelCb: false,
      tab: 'general',
      slide: 1,
      id: '',
      tittle: null,
      skp: null,
      startDate: null,
      endDate: null,
      startEarlyBird: null,
      startLate: null,
      startReguler: '',
      startTime: null,
      link: 'http://dettacare-event.pptik.id/data/event/',
      endTime: null,
      lokasi: '',
      provinsi: '',
      kota: '',
      biaya_early_bird: '',
      biaya_reguler: '',
      biaya_late: '',
      narasumbers: [],
      handon: [],
      cps: [],
      email: '',
      items: [],
      kategori: '',
      deskripsi: '',
      s1: false,
      rekening: [],
      kouta: '',
      pamflet_tampil: [],
      pamflet: [],
      dialog: false,
      position: 'bottom',
      dataAuthor: [],
      // data resgister
      kategoriPembayaran: '',
      jenisPembayaranSeminar: '',
      totalBiayaHandOn: [],
      listHandOn: [],
      subHandOn: 0,
      totalBayar: 0,
      bb: '',
      boolBb: false,
      indexPamflet: 1
    }
  },
  created () {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.get('event/get_detail1/' + this.$route.params.id)
          .then(resolve => {
            var data = resolve.data[0]
            this.dataAuthor = data.data_author[0]
            this.id = data._id
            this.tittle = data.tittle
            this.kategori = data.kategori
            this.skp = data.skp
            this.startDate = this.getFullDate(data.tgl_mulai)
            this.endDate = this.getFullDate(data.tgl_selesai)
            this.startTime = data.jam_mulai
            this.endTime = data.jam_selesai
            this.lokasi = data.lokasi
            this.provinsi = data.provinsi
            this.kota = data.kota
            this.kouta = data.kouta
            this.narasumbers = JSON.parse(data.narasumber)
            this.startEarlyBird = this.getFullDate(data.batas_early_bird)
            this.biaya_early_bird = data.biaya_early_bird
            this.startReguler = this.getFullDate(data.batas_reguler)
            this.biaya_reguler = data.biaya_reguler
            this.startLate = this.getFullDate(data.batas_late)
            this.biaya_late = data.biaya_late
            var handon = JSON.parse(data.handon)
            var target = { selected: false }
            for (let i = 0; i < handon.length; i++) {
              Object.assign(handon[i], target)
            }
            this.pamflet_tampil = JSON.parse(data.pamflet)
            this.handon = handon
            let rek = JSON.parse(data.rekening)
            for (let i = 0; i < rek.length; i++) {
              if (rek[i].no_rek !== '' && rek[i].an_no_rek !== '') {
                this.rekening.push(rek[i])
              }
            }
            this.cps = JSON.parse(data.cp)
          })
      } catch (error) {
        console.log(error)
      }
    })
  },
  methods: {
    getFullDate (date) {
      if (date === '' || date === 'null') {
        return '-'
      }
      var newDate = new Date(date)
      let month = '' + (newDate.getMonth() + 1)
      var listMonth = [ 'Januari', 'Februar', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'Desember' ]
      let tgl = '' + (newDate.getDate())
      let year = newDate.getFullYear()
      return tgl + ' ' + listMonth[month - 1] + ' ' + year
    },
    open () {
      this.dialog = true
    },
    hitung () {
      var biaya
      if (this.kategoriPembayaran === 'early') {
        biaya = this.biaya_early_bird
      } else if (this.kategoriPembayaran === 'reguler') {
        biaya = this.biaya_reguler
      } else {
        biaya = this.biaya_late
      }
      this.biayaSeminar = biaya
    },
    addHoList (list) {
      if (!list.selected) {
        this.listHandOn.push(list)
      } else {
        this.listHandOn.splice(this.listHandOn.indexOf(list.id), 1)
      }
    },
    selectFile () {
      this.bb = this.$refs.ktp.$refs.input.files[0]
      this.boolBb = true
    },
    verfRegist () {
      let dataUser = jwtDecoder(this.$q.localStorage.getItem('datauser'))
      if (dataUser.alamat_koresponden === '' ||
          dataUser.alamat_rumah === '' ||
          dataUser.cabang_kota === '' ||
          dataUser.cabang_organisasi === '' ||
          dataUser.email === '' ||
          dataUser.file_ktp === '' ||
          dataUser.nama_lengkap === '' ||
          dataUser.no_ktp === '' ||
          dataUser.no_telp === '' ||
          dataUser.organisasi === '' ||
          dataUser.profesi === '' ||
          dataUser.ttl === 'null') {
        this.alert = true
      } else {
        if (dataUser.profesi === 'Mahasiswa Kedokteran Gigi' || dataUser.profesi === 'Mahasiswa Kedokteran') {
          if (dataUser.no_ktm === '' || dataUser.file_ktm === '' || dataUser.file_ktm === undefined) {
            this.alert = true
          } else {
            this.open()
          }
        } else {
          if (dataUser.no_str === '' || dataUser.file_str === '' || dataUser.file_str === undefined || dataUser.no_kta === '' || dataUser.file_kta === '' || dataUser.file_kta === undefined) {
            this.alert = true
          } else {
            this.open()
          }
        }
      }
    },
    async sendData () {
      let dataUser = jwtDecoder(this.$q.localStorage.getItem('datauser'))
      let idUser = dataUser._id
      var listHandOn = []
      for (let i = 0; i < this.listHandOn.length; i++) {
        var biaya = 0
        if (this.listHandOn[i].subHandOn === 'early') {
          biaya = Number(this.listHandOn[i].biaya_early_bird)
        } else if (this.listHandOn[i].subHandOn === 'reguler') {
          biaya = Number(this.listHandOn[i].biaya_reguler)
        } else if (this.listHandOn[i].subHandOn === 'late') {
          biaya = Number(this.listHandOn[i].biaya_late)
        } else {
          biaya = 0
        }
        listHandOn.push({
          id: this.listHandOn[i].id,
          jenis: this.listHandOn[i].subHandOn,
          biaya: biaya
        })
      }

      let biayaSeminar = 0
      if (this.jenisPembayaranSeminar === 'early') {
        biayaSeminar = this.biaya_early_bird
      } else if (this.jenisPembayaranSeminar === 'reguler') {
        biayaSeminar = this.biaya_reguler
      } else if (this.jenisPembayaranSeminar === 'late') {
        biayaSeminar = this.biaya_late
      } else {
        biayaSeminar = 0
      }
      const formData = new FormData()
      formData.append('image', this.bb)
      formData.append('id', this.id)
      formData.append('listHandOn', JSON.stringify(listHandOn))
      formData.append('id_peserta', idUser)
      formData.append('biayaSeminar', JSON.stringify({ biaya: biayaSeminar, jenisPembayaranSeminar: this.jenisPembayaranSeminar }))
      formData.append('totalBayar', this.total)

      try {
        await this.$axios
          .post('/event/regist_event', formData)
          .then(res => {
            if (res.data.error === false) {
              this.showNotif('Berhasil Daftar', 'green')
              if (this.bb.length < 1) {
                this.showNotif('Mohon Segera Upload Bukti Pembayaran', 'warning')
              }
              setTimeout(() => {
                this.$router.replace('/')
              }, 2100)
            } else {
              this.showNotif('Ada Kesalahan', 'red')
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
    },
    getStatus (status) {
      if (status === 0) {
        return ['Belum Terverifikasi', 'red', 'warning']
      } else {
        return ['Terverifikasi', 'secondary', 'done']
      }
    },
    async addToCart (idEvent, lokasi, tittle) {
      const formData = new FormData()
      let datauser = jwtDecoder(this.$q.localStorage.getItem('datauser'))
      formData.append('id', datauser._id)
      formData.append('idEvent', idEvent)
      let data = {
        id: datauser._id,
        _id: idEvent,
        lokasi: lokasi,
        namaEvent: tittle
      }
      let cartNow = this.$q.localStorage.getItem('cart')
      let verf = this.find_in_object(cartNow, { _id: idEvent })
      if (verf.length > 0) {
        this.showNotif('Sudah Ada Dikeranjang', 'warning')
      } else {
        try {
          await this.$axios.post('users/addtocart', data)
            .then(res => {
              if (res.data.error) {
                this.showNotif('Gagal', 'red')
              } else {
                this.showNotif('Ditambahkan Ke Keranjang Anda', 'green')
                cartNow.push({
                  _id: idEvent,
                  lokasi: lokasi,
                  namaEvent: tittle
                })
                this.$q.localStorage.set('cart', cartNow)
              }
            })
        } catch (error) {
          console.log(error)
        }
      }
    },
    find_in_object (myObject, myCriteria) {
      return myObject.filter(function (obj) {
        return Object.keys(myCriteria).every(function (c) {
          return obj[c] === myCriteria[c]
        })
      })
    }
  },
  computed: {
    total: function () {
      let biaya = 0
      for (let i = 0; i < this.listHandOn.length; i++) {
        if (this.listHandOn[i].subHandOn === 'early') {
          biaya += Number(this.listHandOn[i].biaya_early_bird)
        } else if (this.listHandOn[i].subHandOn === 'reguler') {
          biaya += Number(this.listHandOn[i].biaya_reguler)
        } else if (this.listHandOn[i].subHandOn === 'late') {
          biaya += Number(this.listHandOn[i].biaya_late)
        } else {
          biaya += 0
        }
      }
      if (Number.isNaN(biaya)) {
        biaya = 0
      }

      let biayaSem = 0
      if (this.jenisPembayaranSeminar === 'early') {
        biayaSem = this.biaya_early_bird
      } else if (this.jenisPembayaranSeminar === 'reguler') {
        biayaSem = this.biaya_reguler
      } else if (this.jenisPembayaranSeminar === 'late') {
        biayaSem = this.biaya_late
      } else {
        biayaSem = 0
      }
      return biaya + Number(biayaSem)
    }
  }
}
</script>
