<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <q-card class="my-card bg-white text-black" padding>
          <q-card-section>
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
                <div class="text-h6 text-blue-grey-14">Daftar List Promosi</div>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td key="tittle" :props="props">{{ sliceText(props.row.tittle) }}</q-td>
                  <q-td key="deskripsi" :props="props">{{ sliceText(props.row.deskripsi) }}</q-td>
                  <q-td key="action" :props="props">
                    <q-card-actions align="around" class="row q-col-gutter-md no-wrap">
                      <div class="col">
                        <q-btn round color="secondary" :to="`/detailpromosi/`+props.row._id"  icon="fas fa-eye">
                          <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                            <div class="text-white text-caption">View</div>
                          </q-tooltip>
                        </q-btn>
                      </div>
                      <div class="col">
                        <q-btn round color="primary" :to="`/editpromosi/`+props.row._id" icon="edit">
                          <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                            <div class="text-white text-caption">Edit Post</div>
                          </q-tooltip>
                        </q-btn>
                      </div>
                      <div class="col">
                        <q-btn @click="hapus(props.row.imageName, props.row._id)" round color="negative"  icon="close">
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
      filter: '',
      base: 'dettacare-event.pptik.id/data/banner/',
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      },
      columns: [
        { name: 'tittle', align: 'center', label: 'Judul', field: 'tittle' },
        { name: 'deskripsi', align: 'center', label: 'Deskripsi', field: 'deskripsi' },
        { name: 'action', align: 'center', label: 'Action', field: 'action' }
      ],
      data: [],
      original: []
    }
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  async created () {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await this.$axios.get('article/getallpromosi')
        resolve(this.original = data.data)
      } catch (error) {
        reject(error)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
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
    upload () {
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('tittle', this.tittle)
      formData.append('deskripsi', this.deskripsi)
      formData.append('konten', this.konten)
      try {
        this.$axios.post('article/post', formData)
          .then(res => {
            if (res.data.error) {
              this.showNotif('Gagal', 'negative')
            } else {
              this.showNotif('Berhasil Menambah Gambar', 'positive')
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
    selectFile (event) {
      event.preventDefault()
      const preview = event.target.files[0]
      const url = URL.createObjectURL(preview)

      this.file = this.$refs.file.$refs.input.files[0]
      this.url_tampil = url
    },
    hapus (gambar, id) {
      try {
        this.$axios.post('article/delete/' + id, {
          gambar: gambar
        })
          .then(res => {
            if (res.data.error) {
              this.showNotif('Gagal', 'negative')
            } else {
              this.showNotif('Berhasil', 'positive')
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
