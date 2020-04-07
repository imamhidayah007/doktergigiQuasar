<template>
  <q-page padding>

      <div class="row">
        <div class="col-md-12 col-xs-12">
          <q-table
            :data="data"
            :columns="columns"
            row-key="id"
            :pagination.sync="pagination"
            :loading="loading"
            :filter="filter"
            @request="onRequest"
            binary-state-sort
          >
            <template v-slot:top-left>
              <div class="text-h6 text-blue-grey-14">Daftar Kegaitan Yang Anda Buat</div>
            </template>
            <template v-slot:top-right>
              <q-input  dense outlined rounded debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="tittle" :props="props">{{ sliceText(props.row.tittle) }}</q-td>
                <q-td key="kategori" :props="props">{{ props.row.kategori }}</q-td>
                <q-td key="tgl_mulai" :props="props">{{ props.row.tgl_mulai }}</q-td>
                <q-td key="tgl_selesai" :props="props">{{ props.row.tgl_selesai }}</q-td>
                <q-td key="lokasi" :props="props" class="ellipsis">{{ sliceText(props.row.lokasi) }}</q-td>
                <q-td key="kouta" :props="props">{{ props.row.kouta }}</q-td>
                <q-td key="action" :props="props">
                  <q-card-actions align="around" class="row q-col-gutter-md no-wrap">
                    <div class="col">
                      <q-btn round color="secondary" :to="`/info/`+props.row._id"  icon="people">
                        <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                          <div class="text-white text-caption">Lihat Peserta</div>
                        </q-tooltip>
                      </q-btn>
                    </div>
                    <div class="col">
                      <q-btn :disable="props.row.peserta.length >= 1" round color="primary" :to="`/edit/`+props.row._id" icon="edit">
                        <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                          <div class="text-white text-caption">Edit Kegiatan</div>
                        </q-tooltip>
                      </q-btn>
                    </div>
                    <div class="col">
                      <q-btn @click="hapus(props.row.pamflet, props.row._id)" v-if="props.row.peserta.length < 1" round color="red"  icon="close">
                        <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                          <div class="text-white text-caption">Hapus Kegiatan</div>
                        </q-tooltip>
                      </q-btn>
                      <q-btn disable v-if="props.row.peserta.length >= 1" round color="red"  icon="close">
                        <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                          <div class="text-white text-caption">Hapus Kegiatan</div>
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </q-card-actions>
                </q-td>
              </q-tr>
            </template>

          </q-table>
        </div>
      </div>

  </q-page>
</template>

<style>
</style>

<script>
import { LocalStorage } from 'quasar'
import JwtDecode from 'jwt-decode'
export default {
  name: 'PageIndex',
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      },
      columns: [
        { name: 'tittle', align: 'center', label: 'Nama Acara', field: 'tittle' },
        { name: 'kategori', align: 'center', label: 'Kategori', field: 'kategori' },
        { name: 'tgl_mulai', align: 'center', label: 'TanggalMulai', field: 'tgl_mulai' },
        { name: 'tgl_selesai', align: 'center', label: 'Tanggal Selesai', field: 'tgl_selesai' },
        { name: 'lokasi', align: 'center', label: 'Lokasi', field: 'lokasi' },
        { name: 'kouta', align: 'center', label: 'Kuota', field: 'kouta' },
        { name: 'action', align: 'center', label: 'Action', field: 'action' }
      ],
      data: [],
      original: []
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
    const data = LocalStorage.getItem('datauser')
    const decode = JwtDecode(data)
    return new Promise(async (resolve, reject) => {
      try {
        var data = await this.$axios.get('event/get_event1/' + decode._id)
        resolve(this.original = data.data)
      } catch (error) {
        reject(error)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    async refresh () {
      this.loading = true
      const data = LocalStorage.getItem('datauser')
      const decode = JwtDecode(data)
      return new Promise(async (resolve, reject) => {
        try {
          await this.$axios.get('event/get_event1/' + decode._id)
            .then(resolve => {
              this.original = resolve.data
            })
        } catch (error) {
          console.log(error)
        }
      }).catch(reject => {
        console.log(reject)
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
    sliceText (text) {
      if (!text) return ''
      text.toString()
      if (text.length < 20) {
        return text
      } else {
        return text.substr(0, 18) + '...'
      }
    },
    async hapus (listImage, id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Apakah Anda Yakin Menghapus ?',
        cancel: 'Tidak',
        persistent: true,
        ok: 'Ya'
      }).onOk(async () => {
        try {
          await this.$axios.post('event/delete/' + id, {
            imageName: listImage
          }).then(res => {
            if (res.data.error) {
              this.showNotif('terjadi Kesalahan', 'red')
            } else {
              this.refresh()
              this.onRequest({
                pagination: this.pagination,
                filter: undefined
              })
              this.showNotif('Berhasil Hapus Event', 'green')
            }
          })
        } catch (error) {
          console.log(error)
        }
      })
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
