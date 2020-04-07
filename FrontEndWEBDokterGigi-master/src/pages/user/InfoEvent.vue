<template>
  <q-page padding>
    <q-card class="my-card bg-white text-black q-mt-sm">
      <q-card-section class="bg-grey-2">
        <div class="text-h6 text-blue-grey-14">Data Peserta Seminar</div>
      </q-card-section>
      <div class="row">
        <div class="col-md-3 col-sm-4 q-pa-md row items-start col-xs-6">
          <q-card class="my-card">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-card-section class="bg-white text-center">
                  <q-icon name="people" color="warning" style="font-size: 2rem;"/>
                </q-card-section>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-card-section class="bg-warning text-center text-white">
                  {{ jumlahPeserta }} User
                  Registered
                </q-card-section>
              </div>
            </div>
          </q-card>
        </div>
        <div class="col-md-3 col-sm-4 q-pa-md row items-start col-xs-6">
          <q-card class="my-card">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-card-section class="bg-white text-center">
                  <q-icon name="check_circle" color="positive" style="font-size: 2rem;"/>
                </q-card-section>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-card-section class="bg-positive text-center text-white">
                  {{ verfUser }} User
                  Confirmed
                </q-card-section>
              </div>
            </div>
          </q-card>
        </div>
        <div class="col-md-3 col-sm-4 q-pa-md row items-start col-xs-6">
          <q-card class="my-card">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-card-section class="bg-white text-center">
                  <q-icon name="warning" color="negative" style="font-size: 2rem;"/>
                </q-card-section>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-card-section class="bg-negative text-center text-white">
                  {{ unverf }} User
                  Unconfirmed
                </q-card-section>
              </div>
            </div>
          </q-card>
        </div>
        <div class="col-md-3 col-sm-4 q-pa-md row items-start col-xs-6">
          <q-card class="my-card">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-card-section class="bg-white text-center">
                  <q-icon name="fas fa-money-bill-alt" color="teal" style="font-size: 2rem;"/>
                </q-card-section>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-card-section class="bg-teal text-center text-white">
                  Rp. {{ formatNumber(totalPemasukan) }},-
                  Pemasukan
                </q-card-section>
              </div>
            </div>
          </q-card>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 q-ml-md">
          Untuk Smartphone Silahkan Buka Melalui WPS OFFICE
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 col-xs-12">
          <div class="q-pl-md q-pb-md">
            <downloadexcel
              :data = "json_data"
              name="absensi_seminar.csv"
              type="csv">
              <q-btn color="secondary" flat icon="cloud_download" label="Download Absen" />
            </downloadexcel>
          </div>
          <q-table
            title="List Peserta"
            :data="data"
            :columns="columns"
            row-key="id"
            :pagination.sync="pagination"
            :loading="loading"
            :filter="filter"
            @request="onRequest"
            binary-state-sort
          >
            <template v-slot:top-right>
              <q-input  dense outlined rounded debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="no_ktp" :props="props">{{ props.row.no_ktp }}</q-td>
                <q-td key="nama_peserta" :props="props">{{ props.row.nama_lengkap }}</q-td>
                <q-td key="no" :props="props">{{ props.row.no_kta }}/{{ props.row.no_str }}/{{ props.row.no_ktm }}</q-td>
                <q-td key="alamat_responden" :props="props">{{ props.row.alamat_koresponden }}</q-td>
                <q-td key="status" :props="props">
                  <!-- {{ getStatus(props.row._id) }} -->
                  <q-chip :color="getStatus(props.row._id)[1]" text-color="white" :icon-right="getStatus(props.row._id)[2]">
                    {{ getStatus(props.row._id)[0] }}
                  </q-chip>
                </q-td>
                <q-td key="action" :props="props">
                  <div class="row q-col-gutter-xl">
                    <div class="col-md-3 offset-md-2">
                      <q-btn round color="secondary" @click="openModal(props.row._id)"  icon="info" />
                    </div>
                    <!-- <div class="col-md-3">
                      <q-btn round color="red"  icon="close" />
                    </div> -->
                  </div>
                </q-td>
              </q-tr>
            </template>

          </q-table>
        </div>
      </div>
    </q-card>
    <q-dialog v-model="card">
      <q-card style="width: 400px; max-width: 80vw;">
        <q-img :src="link+selectedBuktiBayar" placeholder-src="statics/default-placeholder-1024x1024-570x321.png">
          <div v-if="selectedBuktiBayar !== null" class="absolute-bottom text-subtitle1 text-center q-pa-xs">
            Bukti Pembayaran <q-btn @click="secondDialog = true" flat color="white" round icon="fas fa-search-plus"/>
          </div>
        </q-img>
        <div v-if="selectedBuktiBayar == null" class="text-subtitle1 text-center">
          User Tidak/Belum Mengirim Bukti Pembayaran
        </div>

        <q-card-section>

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ selectedNamalengkap }}</div>
          </div>

          <div class="row no-wrap items-center">
            <div class="col text-h6">{{ selectedJenisPembayaran }} - Rp. {{ selectedBiayaSeminar }},-</div>
          </div>

        </q-card-section>

        <q-separator />
        <q-card-section>
          <div class="text-h6">Mengikuti Hand On</div>
        </q-card-section>
        <q-card-section>
          <div class="text-subtitle1">List Hand On</div>
          <div v-for="(handOn, i) in selectedHandOn" :key="i" class="text-subtitle2 text-grey">{{ handOn.handOn[0].value }} - {{ capitalized(handOn.ket.jenis) }} - Rp. {{ handOn.ket.biaya }},-</div>
        </q-card-section>

        <q-separator />

        <q-card-section>

          <div class="row no-wrap items-center">
            <div class="col text-h6">Total</div>
            <div class="col text-h6">Rp. {{ totalBayar }},-</div>
          </div>

        </q-card-section>

        <q-separator />
        <q-card-section>
          <div class="text-body">
            Perhatikan kelengkapan pendaftaran user sebelum mengkonfirmasi peserta ! <q-icon name="warning" color="warning" style="font-size: 1.4em;"/>
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat v-close-popup color="negative">Cancle</q-btn>
          <q-btn :disable="selectedBuktiBayar === null" flat color="green" @click="confirm(dataSeminar._id, selectedIdPeserta)">Verifikasi</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="secondDialog"
      transition-show="slide-up"
      maximized
      persistent
      transition-hide="slide-down">
      <q-card>
        <q-card-section class="row items-center">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
        <v-zoomer>
          <img
            :src="link+selectedBuktiBayar"
            style="object-fit: contain; width: 100%; height: 100%;"
          >
        </v-zoomer>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
// import Vue from 'vue'
import jwt from 'jwt-decode'
import JsonExcel from 'vue-json-excel'
export default {
  components: {
    downloadexcel: JsonExcel
  },
  data () {
    return {
      secondDialog: false,
      maximizedToggle: true,
      json_data: [],
      filter: '',
      card: false,
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      },
      columns: [
        { name: 'no_ktp', align: 'center', label: 'No Identitas', field: 'no_ktp' },
        { name: 'nama_peserta', label: 'Nama Peserta', field: 'nama' },
        { name: 'no', label: 'NPA/STR/NPM', field: 'no' },
        { name: 'alamat_responden', label: 'Alamat Responden', field: 'alamat_responden' },
        { name: 'status', align: 'center', label: 'Status', field: 'status' },
        { name: 'action', align: 'center', label: 'Aksi', field: 'action' }
      ],
      data: [],
      dataSeminar: '',
      original: [],
      ket: [],
      jumlahPeserta: '',
      unverf: 0,
      verfUser: 0,
      totalPemasukan: 0,
      link: 'http://dettacare-event.pptik.id/data/event/',
      // if selected
      selectedIdPeserta: '',
      selectedNamalengkap: '',
      selectedJenisPembayaran: '',
      selectedBiayaSeminar: 0,
      selectedHandOn: [],
      totalBayar: 0,
      selectedBuktiBayar: ''

    }
  },
  mounted () {
    // get initial data from server (1st page)
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  async created () {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.get('event/get_detail1/' + this.$route.params.id)
          .then(resolve => {
            this.dataSeminar = resolve.data[0]
            this.original = resolve.data[0].data_peserta
            let token = this.$q.localStorage.getItem('datauser')
            if (resolve.data[0].author[0]._id !== jwt(token)._id) {
              this.$router.replace('/404')
            }
            let exportPeserta = []
            for (let i = 0; i < resolve.data[0].data_peserta.length; i++) {
              // console.log(resolve.data[0].data_peserta[i])
              exportPeserta.push({
                NamaLengkap: resolve.data[0].data_peserta[i].nama_lengkap,
                NoKTP: resolve.data[0].data_peserta[i].no_ktp,
                JenisKelamin: resolve.data[0].data_peserta[i].jenis_kelamin,
                Email: resolve.data[0].data_peserta[i].email,
                NoTelp: resolve.data[0].data_peserta[i].no_telp,
                AlamatRumah: resolve.data[0].data_peserta[i].alamat_rumah,
                AlamatKoresponden: resolve.data[0].data_peserta[i].alamat_koresponden,
                TanggalLahir: resolve.data[0].data_peserta[i].ttl,
                Profesi: resolve.data[0].data_peserta[i].profesi,
                Organisasi: resolve.data[0].data_peserta[i].organisasi,
                Cabang: resolve.data[0].data_peserta[i].cabang_organisasi + ' - ' + resolve.data[0].data_peserta[i].cabang_kota,
                NoKeanggota: 'No STR = ' + resolve.data[0].data_peserta[i].no_str + ' /No KTA = ' + resolve.data[0].data_peserta[i].no_kta + ' /'
              })
            }
            let listHandOn = JSON.parse(resolve.data[0].handon)
            // let listPesertaHandon = []
            for (let index = 0; index < listHandOn.length; index++) {
              // let listPeserta = []
              for (let i = 0; i < resolve.data[0].peserta.length; i++) {
                for (let ip = 0; ip < JSON.parse(resolve.data[0].peserta[i].listHandOn).length; ip++) {
                  console.log(resolve.data[0].peserta[i].listHandOn)
                }
              }
              // listPesertaHandon.push({
              //   dataHandOn: listHandOn[index],
              //   listPeserta: listPeserta
              // })
            }
            // console.log(listHandOn)
            this.json_data = exportPeserta
            this.ket = resolve.data[0].peserta
            this.jumlahPeserta = resolve.data[0].data_peserta.length
            let verUser = 0
            let unVerfUser = 0
            let totalPemasukan = 0
            for (let i = 0; i < resolve.data[0].peserta.length; i++) {
              if (resolve.data[0].peserta[i].status === 'b') {
                unVerfUser += 1
              } else {
                verUser += 1
                totalPemasukan += Number(resolve.data[0].peserta[i].totalBayar)
              }
            }
            this.verfUser = verUser
            this.unverf = unVerfUser
            this.totalPemasukan = totalPemasukan
          })
      } catch (error) {
        console.log(error)
      }
    })
  },
  methods: {
    async load () {
      this.loading = true
      return new Promise(async (resolve, reject) => {
        try {
          await this.$axios.get('event/get_detail1/' + this.$route.params.id)
            .then(resolve => {
              this.dataSeminar = resolve.data[0]
              this.original = resolve.data[0].data_peserta
              this.ket = resolve.data[0].peserta
              this.jumlahPeserta = resolve.data[0].data_peserta.length
              let verUser = 0
              let unVerfUser = 0
              let totalPemasukan = 0
              for (let i = 0; i < resolve.data[0].peserta.length; i++) {
                if (resolve.data[0].peserta[i].status === 'b') {
                  unVerfUser += 1
                } else {
                  verUser += 1
                  totalPemasukan += Number(resolve.data[0].peserta[i].totalBayar)
                }
              }
              this.verfUser = verUser
              this.unverf = unVerfUser
              this.totalPemasukan = totalPemasukan
            })
        } catch (error) {
          console.log(error)
        }
      })
    },
    onRequest (props) {
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      let filter = props.filter

      this.loading = true

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter)

        // get all rows if "All" (0) is selected
        let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage

        // calculate starting row of data
        let startRow = (page - 1) * rowsPerPage

        // fetch data from "server"
        let returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData)

        // don't forget to update local pagination object
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending

        // ...and turn of loading indicator
        this.loading = false
      }, 1500)
    },

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer (startRow, count, filter, sortBy, descending) {
      let data = []

      if (!filter) {
        data = this.original.slice(startRow, startRow + count)
      } else {
        let found = 0
        for (let index = startRow, items = 0; index < this.original.length && items < count; ++index) {
          let row = this.original[index]
          // match filter?
          if (!row['tittle'].includes(filter)) {
            // get a different row, until one is found
            continue
          }
          ++found
          if (found >= startRow) {
            data.push(row)
            ++items
          }
        }
      }

      // handle sortBy
      if (sortBy) {
        data.sort((a, b) => {
          let x = descending ? b : a
          let y = descending ? a : b
          if (sortBy === 'desc') {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          } else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy])
          }
        })
      }

      return data
    },

    // emulate 'SELECT count(*) FROM ...WHERE...'
    getRowsNumberCount (filter) {
      if (!filter) {
        return this.original.length
      }
      let count = 0
      this.original.forEach((treat) => {
        if (treat['tittle'].includes(filter)) {
          ++count
        }
      })
      return count
    },
    getKet (id) {
      var data = this.find_in_object(this.ket, { _id: id })
      return data[0].bukti_pembayaran
    },
    capitalized (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    getStatus (id) {
      var data = this.find_in_object(this.ket, { _id: id })
      if (data[0].status === 'b') {
        return ['Belum Terverifikasi', 'red', 'error']
      } else {
        return ['Terverifikasi', 'green', 'check_circle']
      }
    },
    find_in_object (myObject, myCriteria) {
      return myObject.filter(function (obj) {
        return Object.keys(myCriteria).every(function (c) {
          return obj[c] === myCriteria[c]
        })
      })
    },
    openModal (id) {
      this.card = true
      var ket = this.find_in_object(this.ket, { _id: id })
      var data = this.find_in_object(this.original, { _id: id })
      this.selectedNamalengkap = data[0].nama_lengkap
      this.selectedIdPeserta = data[0]._id
      this.selectedBuktiBayar = ket[0].bukti_pembayaran
      // data keterangan
      let detail = JSON.parse(ket[0].biayaSeminar)
      if (detail.jenisPembayaranSeminar === 'early') {
        this.selectedJenisPembayaran = 'Early Bird'
      } else if (detail.jenisPembayaranSeminar === 'reguler') {
        this.selectedJenisPembayaran = 'Reguler'
      } else if (detail.jenisPembayaranSeminar === 'late') {
        this.selectedJenisPembayaran = 'Late'
      } else {
        this.selectedJenisPembayaran = ''
      }
      this.selectedBiayaSeminar = detail.biaya
      // get hand on
      let listHandOn = JSON.parse(ket[0].listHandOn)
      this.totalBayar = ket[0].totalBayar
      let handOn = JSON.parse(this.dataSeminar.handon)
      var dataHandOn = []
      for (let i = 0; i < listHandOn.length; i++) {
        let dataHandon = {
          ket: listHandOn[i],
          handOn: this.find_in_object(handOn, { id: listHandOn[i].id })
        }
        dataHandOn.push(dataHandon)
      }
      this.selectedHandOn = dataHandOn
    },
    async confirm (idEvent, idPeserta) {
      try {
        await this.$axios.post('event/confirm', {
          id: idEvent,
          idPeserta: idPeserta
        })
          .then(resolve => {
            if (resolve.error) {
              this.showNotif('Gagal', 'red')
            } else {
              this.load()
              this.onRequest({
                pagination: this.pagination,
                filter: undefined
              })
              this.showNotif('Berhasil', 'green')
            }
          })
      } catch (error) {
        this.showNotif('Terjadi Kesalahan', 'red')
      }
      this.card = false
    },
    showNotif (message, jenis) {
      this.$q.notify({
        message: message,
        color: jenis,
        timeout: 2000,
        actions: [{ icon: 'close', color: 'white' }]
      })
    },
    formatNumber (num) {
      return (
        num
          .toFixed(0) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'))
    }
  }
}
</script>
