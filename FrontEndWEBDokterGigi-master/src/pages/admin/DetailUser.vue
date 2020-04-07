<template>
  <q-page padding>

    <div class="row">
      <div class="col-md-12 col-xs-12">
        <q-card class="my-card bg-white text-black">
          <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-card-section class="text-blue-grey-14">
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-img
                        :src="link+data.file_ktp"
                        style="width: 100%"
                        placeholder-src="statics/default-placeholder-1024x1024-570x321.png"
                      >
                        <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                          Gambar KTP - {{ data.no_ktp }}
                        </div>
                      </q-img>
                      <div v-if="data.file_ktp === null || data.file_ktp === undefined" class="q-pt-xs">User Tidak/Belum mengupload Foto KTP</div>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list v-if="data.profesi === 'Dokter' || data.profesi === 'Dokter Gigi' || data.profesi === 'Dokter Spesialis' || data.profesi === 'Dokter Gigi' || data.profesi === 'Dokter Gigi Spesialis' ">
                  <q-item>
                    <q-item-section>
                      <q-img
                        :src="link+data.file_str"
                        style="width: 100%"
                        placeholder-src="statics/default-placeholder-1024x1024-570x321.png"
                      >
                        <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                          Gambar STR - 34234234
                        </div>
                      </q-img>
                      <div v-if="data.file_str === null || data.file_str === undefined" class="q-pt-xs">User Tidak/Belum mengupload Foto STR</div>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-img
                        :src="link+data.file_kta"
                        style="width: 100%"
                        placeholder-src="statics/default-placeholder-1024x1024-570x321.png"
                      >
                        <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                          Gambar KTA - 3333234
                        </div>
                      </q-img>
                      <div v-if="data.file_kta === null || data.file_kta === undefined" class="q-pt-xs">User Tidak/Belum mengupload Foto KTA</div>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-list v-if="data.profesi === 'Mahasiswa Kedokteran' || data.profesi === 'Mahasiswa Kedokteran Gigi' ">
                  <q-item>
                    <q-item-section>
                      <q-img
                        src="https://cdn.quasar-framework.org/img/parallax2.jpg"
                        style="width: 100%"
                      >
                        <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                          Gambar KTM - {{ data.no_ktm }}
                        </div>
                      </q-img>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <q-card-section class="text-blue-grey-14">
                <q-list padding>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-blue-grey-14 text-h6">Detail User</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator/>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="secondary" name="person" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-blue-grey-14 text-h6">{{ data.nama_lengkap }}</q-item-label>
                      <q-item-label class="text-blue-grey-14 text-caption1">Nama Lengkap</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset="item" />
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="secondary" name="credit_card" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-blue-grey-14 text-h6">{{ data.no_ktp }}</q-item-label>
                      <q-item-label class="text-blue-grey-14 text-caption1">No KTP</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset="item" />
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="secondary" name="location_on" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-blue-grey-14 text-h6">{{ data.alamat_rumah }}</q-item-label>
                      <q-item-label class="text-blue-grey-14 text-caption1">Alamat Rumah</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset="item" />
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="secondary" name="location_on" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-blue-grey-14 text-h6">{{ data.alamat_koresponden }}</q-item-label>
                      <q-item-label class="text-blue-grey-14 text-caption1">Alamat Koresponden</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset="item" />
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="secondary" name="call" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-blue-grey-14 text-h6">{{ data.no_telp }}</q-item-label>
                      <q-item-label class="text-blue-grey-14 text-caption1">No Telp</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset="item" />
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="secondary" name="mail" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-blue-grey-14 text-h6">
                        {{ data.email }}
                        <q-chip color="teal" text-color="white" dense icon-right="done">
                          Verified
                        </q-chip>
                      </q-item-label>
                      <q-item-label class="text-blue-grey-14 text-caption1">Email</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset="item" />
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="secondary" name="people" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-blue-grey-14 text-h6">{{ data.organisasi }}</q-item-label>
                      <q-item-label class="text-blue-grey-14 text-caption1">Organisasi</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset="item" />
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="secondary" name="pin_drop" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-blue-grey-14 text-h6">{{ data.cabang_organisasi + ' - ' + data.cabang_kota }}</q-item-label>
                      <q-item-label class="text-blue-grey-14 text-caption1">Cabang Provinsi/Kota</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-blue-grey-14 text-caption1">Mohon untuk mengecek data sebelum mengkonfirmasi user.</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-btn @click="confirmUser" class="bg-secondary text-white" rounded flat label="Confirm"/>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </div>
          </div>
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
      data: [],
      link: 'http://dettacare-event.pptik.id/data/user/'
    }
  },
  async created () {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await this.$axios.get('users/getuser/' + this.$route.params.id)
        resolve(this.data = data.data[0])
      } catch (error) {
        reject(error)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    async confirmUser () {
      try {
        await this.$axios.post('users/confirmuser', {
          id: this.data._id
        })
          .then(res => {
            if (res.data.error) {
              this.showNotif('Gagal', 'red')
            } else {
              this.showNotif('Berhasil Di Konfirmasi', 'green')
              this.$router.replace('/admin')
            }
          })
      } catch (error) {
        this.showNotif('Gagal', 'red')
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
