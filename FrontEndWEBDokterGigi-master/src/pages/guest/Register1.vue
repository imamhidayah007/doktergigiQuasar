<template>
  <q-page padding class="items-center justify-center">
      <div class="row">
        <div class="col-md-4 offset-md-4 col-xs-12 q-pb-lg q-pl-md q-pr-md q-pt-sm">
          <q-card class="my-card bg-white text-black">
            <q-card-section class="text-center">
              <img src="statics/doctor.png" style="height: 100px;max-width: 150px;"/>
            </q-card-section>
            <q-card-section>
              <div class="text-secondary text-center text-h4">Register Your Account</div>
            </q-card-section>
            <q-card-section>
              <q-input :rules="[val => !!val || 'Isi Username']" v-model="username" label="Username">
                <template v-slot:append>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input type="number" v-model="no_ktp" label="No KTP" class="q-pt-md">
                <template v-slot:append>
                  <q-icon name="credit_card" />
                </template>
              </q-input>
              <q-input type="password" class="q-pt-md" v-model="password" label="Password">
                <template v-slot:append>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input :rules="[ val => val == password || 'Password Tidak Sama']" type="password" class="q-pt-md" v-model="password_ulang" label="Password Ulang">
                <template v-slot:append>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <q-input type="text" v-model="nama_lengkap" label="Nama Lengkap" class="q-pt-md">
                <template v-slot:append>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-select
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="jenisKelamin"
                :options="listJenis"
                label="Jenis Kelamin"/>
              <q-input type="email" v-model="email" label="Email" class="q-pt-md">
                <template v-slot:append>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input type="number" v-model="no_telp" label="No Telp" class="q-pt-md">
                <template v-slot:append>
                  <q-icon name="call" />
                </template>
              </q-input>
              <q-input type="text" v-model="alamat_rumah" label="Alamat Rumah" class="q-pt-md">
                <template v-slot:append>
                  <q-icon name="location_on" />
                </template>
              </q-input>
              <q-input type="text" v-model="alamat_koresponden" label="Alamat Responden" class="q-pt-md">
                <template v-slot:append>
                  <q-icon name="location_on" />
                </template>
              </q-input>
              <q-input label="Tanggal Lahir" v-model="ttl" mask="date" :rules="['date']" class="q-pt-md">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="ttl" :breakpoint="600">
                      <q-date v-model="ttl" filled ref="dateDialog"  @input="$refs.ttl.hide()"/>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-select
                transition-show="flip-up"
                transition-hide="flip-down"
                v-model="profesi"
                :options="profesis"
                label="Profesi"/>
              <div v-if="profesi == 'Dokter' ||
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
              </div>
              <div v-if="profesi == 'Mahasiswa Kedokteran' ||
                        profesi == 'Mahasiswa Kedokteran Gigi'
              ">
                <q-input type="text" v-model="npm" label="NPM" class="q-pt-md">
                  <template v-slot:append>
                    <q-icon name="card" />
                  </template>
                </q-input>
              </div>
              <q-select v-model="organisasi" :options="list_organisasi" label="Organisasi" class="q-pt-md"/>
              <q-select
                v-model="cabang_organisasi"
                @input="selectKota(cabang_organisasi)"
                :options="list_cabang_organisasi"
                label="Cabang Provinsi Organisasi"
                class="q-pt-md"
                options-cover
                transition-show="scale"
                transition-hide="scale"
                />
              <q-select
                transition-show="scale"
                transition-hide="scale"
                v-model="cabang_kota"
                :options="list_cabang_kota"
                label="Cabang Kabupaten/Kota"
                options-cover
                class="q-pt-md q-pb-md"/>
              Upload Foto KTP
              <q-input
                @change="selectFile('ktp')"
                type="file"
                ref="ktp"
              />
              <div v-if="profesi == 'Dokter' ||
                profesi == 'Dokter Spesialis' ||
                profesi == 'Dokter Gigi' ||
                profesi == 'Dokter Gigi Spesialis'"
                class="q-pt-md"
              >
                Upload Foto STR
                <q-input
                  @change="selectFile('str')"
                  type="file"
                  ref="str"
                  class="q-pb-md"
                />
                Upload Foto KTA
                <q-input
                  @change="selectFile('kta')"
                  type="file"
                  ref="kta"
                />
              </div>
              <div v-if="profesi == 'Mahasiswa Kedokteran' ||
                profesi == 'Mahasiswa Kedokteran Gigi'"
                class="q-pt-md"
              >
                Upload Foto KTM
                <q-input
                  @change="selectFile('ktm')"
                  type="file"
                  ref="ktm"
                />
              </div>
            </q-card-section>
            <q-card-section class="q-pb-lg">
              <div class="row q-col-gutter-xs">
                <div class="col-md-4 col-xs-12 col-sm-12  offset-md-5">
                  <q-btn class="full-width" rounded flat to="/login" color="secondary" label="Login" />
                </div>
                <div class="col-md-3 col-xs-12 col-sm-12">
                  <q-btn class="full-width" rounded :loading="loading" color="secondary" @click="register()" label="Register" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
  </q-page>
</template>

<style>
</style>

<script>
import ListProvKota from '../../statics/api/ListProvKota'
export default {
  name: 'PageIndex',
  data () {
    return {
      username: '',
      no_ktp: '',
      password: '',
      password_ulang: '',
      nama_lengkap: '',
      jenisKelamin: '',
      listJenis: ['Laki-Laki', 'Perempuan'],
      ttl: null,
      email: '',
      no_telp: '',
      alamat_rumah: '',
      alamat_koresponden: '',
      profesi: '',
      profesis: [
        'Dokter',
        'Dokter Spesialis',
        'Dokter Gigi',
        'Dokter Gigi Spesialis',
        'Mahasiswa Kedokteran',
        'Mahasiswa Kedokteran Gigi'
      ],
      loading: false,
      no_kta: '',
      no_str: '',
      npm: '',
      list_organisasi: [
        'PDGI',
        'IDI'
      ],
      organisasi: '',
      cabang_organisasi: '',
      list_cabang_organisasi: ListProvKota,
      cabang_kota: '',
      list_cabang_kota: null,
      ktp: '',
      str: '',
      kta: '',
      ktm: '',
      bool_ktp: false,
      bool_str: false,
      bool_kta: false,
      bool_ktm: false
    }
  },
  methods: {
    selectKota (prov) {
      this.cabang_kota = ''
      this.list_cabang_kota = prov.kota
    },
    selectFile (jenis) {
      if (jenis === 'ktp') {
        this.ktp = this.$refs.ktp.$refs.input.files[0]
        this.bool_ktp = true
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
    async register () {
      this.simulateProgress()
      if (this.password !== this.password_ulang) {
        this.showNotif('Password Harus Sama', 'red')
      } else if (this.username === '') {
        this.showNotif('Username Tidak Boleh Kosong', 'red')
      } else {
        const formData = new FormData()
        formData.append('image', this.ktp, 'ktp')
        formData.append('image', this.str, 'str')
        formData.append('image', this.kta, 'kta')
        formData.append('image', this.ktm, 'ktm')
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
        formData.append('no_ktm', this.npm)
        formData.append('organisasi', this.organisasi)
        formData.append('cabang_organisasi', this.cabang_organisasi.value)
        formData.append('cabang_kota', this.cabang_kota)

        try {
          await this.$axios
            .post('users/register', formData)
            .then(res => {
              console.log(res.data)
              if (res.data.error === true) {
                this.showNotif(res.data.msg, 'red')
              } else {
                this.showNotif('Berhasil Daftar', 'green')
                this.$router.replace('/login')
              }
            })
            .catch(err => {
              console.log(err)
            })
        } catch (error) {
          console.log(error)
        }

        this.username = ''
        this.no_ktp = ''
        this.password = ''
        this.password_ulang = ''
        this.nama_lengkap = ''
        this.ttl = ''
        this.email = ''
        this.no_telp = ''
        this.alamat_rumah = ''
        this.alamat_koresponden = ''
        this.profesi = ''
        this.no_kta = ''
        this.no_str = ''
        this.npm = ''
        this.organisasi = ''
        this.cabang_organisasi = ''
        this.ktp = ''
        this.str = ''
        this.kta = ''
        this.ktm = ''
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
    simulateProgress () {
      // we set loading state
      this.loading = true
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this.loading = false
      }, 1000)
    }
  }
}
</script>
