<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <q-card :flat="$q.platform.is.mobile" class="bg-white text-black">
          <q-card-section :hidden="$q.platform.is.mobile" class="bg-grey-2">
            <q-list>
              <q-item>
                <q-item-section>
                  <div class="text-h6 text-blue-grey-14">User Profile</div>
                </q-item-section>
                <q-item-section side top>
                  <div class="text-h6 text-blue-grey-14">
                    <q-btn @click="basic = true" icon="edit" color="secondary" round/>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section class="text-blue-grey-14">
            <q-list padding>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-blue-grey-14 text-h6">{{ nama_lengkap }}</q-item-label>
                  <q-item-label class="text-blue-grey-14 text-caption1">{{ profesi }}</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption>
                    <q-chip
                      :color="verfStatus == 0 ? 'negative' : 'secondary'"
                      text-color="white"
                      :label="verfStatus == 0 ? 'Belum Terverifikasi' : 'Terverifikasi'"
                      :icon-right="verfStatus !== 0 ?
                      'check_circle' : 'close'"
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced />

              <q-item>
                <q-item-section avatar>
                  <q-icon color="secondary" name="call" />
                </q-item-section>
                <q-item-section>{{ no_telp }}</q-item-section>
              </q-item>

              <q-separator spaced inset="item" />

              <q-item>
                <q-item-section avatar>
                  <q-icon color="secondary" name="email" />
                </q-item-section>
                <q-item-section>
                  <div>{{ email }}</div>
                  <div v-if="emailStatus === 0 || emailStatus === 'null' " class="text-negative">Verifikasi Email Anda Segera!</div>
                </q-item-section>
              </q-item>

              <q-separator spaced inset="item" />

              <q-item>
                <q-item-section avatar>
                  <q-icon color="secondary" name="location_on" />
                </q-item-section>
                <q-item-section>
                  <div class="text-h7">{{ alamat_rumah }}</div>
                  <div class="text-caption text-blue-grey-13">Alamat Rumah</div>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                </q-item-section>
                <q-item-section>
                  <div class="text-h7">{{ alamat_koresponden }}</div>
                  <div class="text-caption text-blue-grey-13">Alamat Koresponden</div>
                </q-item-section>
              </q-item>

              <q-separator spaced inset="item" />

              <q-item>
                <q-item-section avatar>
                  <q-icon color="secondary" name="people" />
                </q-item-section>
                <q-item-section>
                  <div class="text-h7">{{ organisasi }}</div>
                  <div class="text-caption text-blue-grey-13">{{ cabang_organisasi }} - {{ cabang_kota }}</div>
                </q-item-section>
              </q-item>

              <q-separator spaced inset="item" />

              <q-item>
                <q-item-section avatar>
                </q-item-section>
                <q-item-section>
                  <q-btn rounded @click="prompt = true" color="secondary" dense>Ubah Password</q-btn>
                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
        </q-card>
        <q-dialog v-model="basic" transition-show="scale" transition-hide="scale">
          <div class="row">
            <div class="col-md-12">
              <q-card style="width: 500px; max-width: 80vw;" class="q-pa-xs">
                <q-card-section class="row items-center">
                  <div class="text-h6">Update User Profile</div>
                  <q-space></q-space>
                  <q-btn icon="close" class="fixed-rigth" flat round dense v-close-popup />
                </q-card-section>
                <q-separator spaced/>
                <q-card-section >
                  <q-input type="number" v-model="no_ktp" label="No KTP"/>
                </q-card-section>

                <q-card-section >
                  <q-input type="text" v-model="email" label="Email"/>
                </q-card-section>

                <q-card-section >
                  <q-input type="number" v-model="no_telp" label="No Telp"/>
                </q-card-section>

                <q-card-section >
                  <q-input type="text" v-model="alamat_rumah" label="Alamat Rumah"/>
                </q-card-section>

                <q-card-section >
                  <q-input type="text" v-model="alamat_koresponden" label="Alamat Koresponden"/>
                </q-card-section>

                <q-card-section>
                  <q-input label="Tanggal Lahir" @click="ck()" class="cursor-pointer" v-model="ttl" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="ttl" :breakpoint="600">
                          <q-date v-model="ttl" filled ref="dateDialog"  @input="$refs.ttl.hide()"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-card-section>

                <q-card-section>
                  <q-select
                  v-model="profesi"
                  :options="profesis"
                  label="Profesi"/>
                </q-card-section>

                <q-card-section v-if="profesi == 'Dokter' ||
                  profesi == 'Dokter Spesialis' ||
                  profesi == 'Dokter Gigi' ||
                  profesi == 'Dokter Gigi Spesialis'
                ">
                  <q-input type="text" v-model="no_kta" label="No Kta" class="q-pt-md">
                    <template v-slot:append>
                      <q-icon name="card" />
                    </template>
                  </q-input>
                  <q-input type="text" v-model="no_str" label="No STR" class="q-pt-md">
                    <template v-slot:append>
                      <q-icon name="card" />
                    </template>
                  </q-input>
                </q-card-section>

                <q-card-section v-if="profesi == 'Mahasiswa Kedokteran' ||
                  profesi == 'Mahasiswa Kedokteran Gigi'
                  ">
                  <q-input type="text" v-model="no_ktm" label="NPM" class="q-pt-md">
                    <template v-slot:append>
                      <q-icon name="card" />
                    </template>
                  </q-input>
                </q-card-section>

                <q-card-section>
                  <q-select v-model="organisasi" :options="list_organisasi" label="Organisasi" class="q-pt-md"/>
                </q-card-section>

                <q-card-section>
                  <q-select v-model="cabang_organisasi" @input="selectKota(cabang_organisasi)" :options="list_cabang_organisasi" label="Cabang Provinsi Organisasi" class="q-pt-md"/>
                </q-card-section>

                <q-card-section>
                  <q-select
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    v-model="cabang_kota"
                    :options="list_cabang_kota"
                    label="Cabang Kabupaten/Kota"
                    class="q-pt-md q-pb-md"/>
                </q-card-section>

                <q-card-section>
                  Ubah Foto KTP
                  <q-input
                    @change="selectFile('ktp')"
                    type="file"
                    ref="ktp"
                  />
                </q-card-section>

                <q-card-section>
                  <q-img :src="link+file_ktp"></q-img>
                </q-card-section>

                <q-card-section v-if="profesi == 'Dokter' ||
                  profesi == 'Dokter Spesialis' ||
                  profesi == 'Dokter Gigi' ||
                  profesi == 'Dokter Gigi Spesialis'"
                  class="q-pt-md"
                >
                  Ubah Foto STR
                  <q-input
                    @change="selectFile('str')"
                    type="file"
                    ref="str"
                    class="q-pb-md"
                  />
                  <q-img :src="link+file_str"></q-img>
                  Ubah Foto KTA
                  <q-input
                    @change="selectFile('kta')"
                    type="file"
                    ref="kta"
                  />
                  <q-img :src="link+file_kta"></q-img>
                </q-card-section>

                <q-card-section v-if="profesi == 'Mahasiswa' ||
                  profesi == 'Mahasiswa Kedokteran'"
                  class="q-pt-md"
                >
                  Ubah Foto KTM
                  <q-input
                    @change="selectFile('ktm')"
                    type="file"
                    ref="ktm"
                    class="q-pb-md"
                  />
                  <q-img :src="link+file_ktm"></q-img>
                </q-card-section>

                <q-card-section >
                  Harap isi data di atas dengan benar sebelum mengubah data.
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Batal" color="primary" v-close-popup />
                  <q-btn flat @click="update" label="Simpan" color="primary" v-close-popup />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-dialog>
        <q-dialog v-model="prompt">
          <q-card style="width: 500px; max-width: 80vw;">
            <q-card-section>
              <div class="text-h6">Update Password</div>
            </q-card-section>

            <q-card-section>
              <q-input :rules="[val => !!val || 'Isi Password Sekarang']" type="password" v-model="passwordLama" autofocus label="Password Sekarang" @keyup.enter="prompt = false" />
              <q-input :rules="[val => !!val || 'Isi Password']" type="password" v-model="passwordBaru" label="Password Baru" @keyup.enter="prompt = false" />
              <q-input :rules="[ val => val == passwordBaru || 'Password Tidak Sama', val => !!val || 'Ketik Ulang Password']" type="password" v-model="ketikPasswordBaru" label="Password Baru" @keyup.enter="prompt = false" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Batal" v-close-popup />
              <q-btn flat label="Simpan" @click="updatePassword()"/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
  </div>
  </q-page>
</template>

<style>
</style>

<script>
import jwtDecoder from 'jwt-decode'
// import { LocalStorage } from 'quasar'
// let tokenUser = LocalStorage.getItem('datauser')
// let userData = jwtDecoder(tokenUser)
import ListProvKota from '../../statics/api/ListProvKota'
export default {
  name: 'PageIndex',
  data () {
    return {
      prompt: false,
      id: '',
      username: '',
      verfStatus: 0,
      email: '',
      emailStatus: '',
      nama_lengkap: '',
      no_telp: '',
      alamat_rumah: '',
      alamat_koresponden: '',
      ttl: '',
      profesi: '',
      no_kta: '',
      no_str: '',
      no_ktm: '',
      no_ktp: '',
      organisasi: '',
      cabang_organisasi: '',
      cabang_kota: '',
      file_ktp: '',
      file_str: '',
      file_kta: '',
      file_ktm: '',
      basic: false,
      fixed: false,
      profesis: [
        'Dokter',
        'Dokter Spesialis',
        'Dokter Gigi',
        'Dokter Gigi Spesialis',
        'Mahasiswa Kedokteran',
        'Mahasiswa Kedokteran Gigi'
      ],
      list_organisasi: [
        'PDGI',
        'IDI'
      ],
      list_cabang_organisasi: ListProvKota,
      ktp: '',
      str: '',
      kta: '',
      ktm: '',
      bool_ktp: false,
      bool_str: false,
      bool_kta: false,
      bool_ktm: false,
      link: 'http://dettacare-event.pptik.id/data/user/',
      list_cabang_kota: null,
      passwordLama: '',
      passwordBaru: '',
      ketikPasswordBaru: ''
    }
  },
  async created () {
    let token = this.$q.localStorage.getItem('datauser')
    let userData = jwtDecoder(token)
    this.id = userData._id
    this.verfStatus = userData.verfStatus
    this.username = userData.username
    this.email = userData.email
    this.emailStatus = userData.emailStatus
    this.nama_lengkap = userData.nama_lengkap
    this.no_telp = userData.no_telp
    this.alamat_rumah = userData.alamat_rumah
    this.alamat_koresponden = userData.alamat_koresponden
    this.ttl = userData.ttl
    this.profesi = userData.profesi
    this.no_kta = userData.no_kta
    this.no_str = userData.no_str
    this.no_ktm = userData.no_ktm
    this.no_ktp = userData.no_ktp
    this.organisasi = userData.organisasi
    this.cabang_organisasi = userData.cabang_organisasi
    this.cabang_kota = userData.cabang_kota
    this.file_ktp = userData.file_ktp
    this.file_str = userData.file_str
    this.file_kta = userData.file_kta
    this.file_ktm = userData.file_ktm
  },
  methods: {
    selectKota (prov) {
      this.cabang_organisasi = prov.value
      console.log(this.cabang_organisasi)
      this.cabang_kota = ''
      this.list_cabang_kota = prov.kota
    },
    selectFile (jenis) {
      if (jenis === 'ktp') {
        this.ktp = this.$refs.ktp.$refs.input.files[0]
        this.bool_ktp = true
        console.log(this.ktp)
      } else if (jenis === 'str') {
        console.log(this.str)
        this.str = this.$refs.str.$refs.input.files[0]
        this.bool_str = true
      } else if (jenis === 'kta') {
        this.kta = this.$refs.kta.$refs.input.files[0]
        this.bool_kta = true
      } else {
        this.ktm = this.$refs.ktm.$refs.input.files[0]
        this.bool_ktm = true
      }
    },
    async update () {
      const formData = new FormData()
      formData.append('image', this.ktp, 'ktp')
      if (this.profesi === 'Dokter' || this.profesi === 'Dokter Spesialis ' || this.profesi === 'Dokter Gigi' || this.profesi === 'Dokter Gigi Spesialis') {
        formData.append('image', this.str, 'str')
        formData.append('image', this.kta, 'kta')
      } else {
        formData.append('ktm', this.ktm, 'ktm')
      }
      formData.append('id', this.id)
      formData.append('username', this.username)
      formData.append('no_ktp', this.no_ktp)
      formData.append('password', this.password)
      formData.append('nama_lengkap', this.nama_lengkap)
      formData.append('jenisKelamin', this.jenisKelamin)
      formData.append('email', this.email)
      formData.append('no_telp', this.no_telp)
      formData.append('alamat_rumah', this.alamat_rumah)
      formData.append('alamat_koresponden', this.alamat_koresponden)
      formData.append('ttl', this.ttl)
      formData.append('profesi', this.profesi)
      formData.append('no_kta', this.no_kta)
      formData.append('no_str', this.no_str)
      formData.append('no_ktm', this.no_ktm)
      formData.append('organisasi', this.organisasi)
      formData.append('cabang_organisasi', this.cabang_organisasi)
      formData.append('cabang_kota', this.cabang_kota)
      try {
        await this.$axios.post('users/updateprofile', formData)
          .then(res => {
            if (res.data.error) {
              this.showNotif('Gagal Update', 'negative')
            } else {
              this.$q.localStorage.set('datauser', res.data.data)
              this.showNotif('Data telah diperbarui', 'green')
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
    async updatePassword () {
      if (this.passwordBaru !== this.ketikPasswordBaru) {
        this.showNotif('Ketik Ulang Password Baru Dengan Benar', 'negative')
      } else {
        try {
          await this.$axios.post('users/changepassword', {
            passwordNow: this.passwordLama,
            newPassword: this.passwordBaru,
            id: this.id
          }).then(res => {
            if (res.data.error) {
              this.showNotif(res.data.msg, 'negative')
            } else {
              this.showNotif(res.data.msg, 'positive')
              this.prompt = false
              this.passwordLama = ''
              this.passwordBaru = ''
              this.ketikPasswordBaru = ''
            }
          }).catch(err => {
            this.showNotif(err, 'negative')
          })
        } catch (error) {
          this.showNotif('Terjadi Kesalahan', 'negative')
          this.prompt = false
          this.passwordLama = ''
          this.passwordBaru = ''
          this.ketikPasswordBaru = ''
        }
      }
    },
    ck () {
      this.$refs.ttl.show()
    }
  }
}
</script>
