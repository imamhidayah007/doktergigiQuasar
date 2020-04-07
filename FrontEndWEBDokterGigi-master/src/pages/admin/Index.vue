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
            <q-btn @click="refresh" color="secondary" flat round class="q-mb-md" icon="refresh" />
            <div class="text-blue-grey-14 text-h5">Data User</div>
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
              <q-td key="namaLengkap" :props="props">{{ props.row.nama_lengkap }}</q-td>
              <q-td key="noKtp" :props="props">{{ props.row.no_ktp }}</q-td>
              <q-td key="alamatRumah" :props="props">{{ props.row.alamat_rumah }}</q-td>
              <q-td key="email" :props="props">{{ props.row.email }}</q-td>
              <q-td key="noTelp" :props="props">{{ props.row.no_telp }}</q-td>
              <q-td key="profesi" :props="props">{{ props.row.profesi }}</q-td>
              <q-td key="action" :props="props" align="around">
                <q-btn round color="secondary" :to="`/getdetailuser/`+props.row._id"  icon="info" class="q-mr-xs">
                  <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Detail User</div>
                  </q-tooltip>
                </q-btn>
                <q-btn round color="negative" @click="confirm = true" icon="close">
                  <q-tooltip content-class="bg-blue-grey-14" transition-show="flip-right" transition-hide="flip-left" anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    <div class="text-white text-caption">Delete User</div>
                  </q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>

        </q-table>
      </div>
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" text-color="warning" />
            <span class="q-ml-sm">Apakah anda yakin menghapus data ?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Yes" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
      confirm: false,
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      },
      columns: [
        { name: 'namaLengkap', align: 'center', label: 'Nama Lengkap', field: 'namaLengkap' },
        { name: 'noKtp', align: 'center', label: 'No KTP', field: 'noKtp' },
        { name: 'alamatRumah', align: 'center', label: 'Alamat (Rumah)', field: 'alamatRumah' },
        { name: 'email', align: 'center', label: 'Email', field: 'email' },
        { name: 'noTelp', align: 'center', label: 'No Telp', field: 'noTelp' },
        { name: 'profesi', align: 'center', sortable: true, label: 'Profesi', field: 'profesi' },
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
    return new Promise(async (resolve, reject) => {
      try {
        var data = await this.$axios.get('users/getalluser')
        resolve(this.original = data.data)
        // 0 -> unverf - 1 -> verf
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
      return new Promise(async (resolve, reject) => {
        try {
          var data = await this.$axios.get('users/getalluser')
          resolve(this.original = data.data)
          // 0 -> unverf - 1 -> verf
        } catch (error) {
          reject(error)
        }
      }).catch(err => {
        console.log(err)
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
      }, 1000)
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
          if (!row['nama_lengkap'].includes(filter)) {
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
        if (treat['nama_lengkap'].includes(filter)) {
          ++count
        }
      })
      return count
    }
  }
}
</script>
