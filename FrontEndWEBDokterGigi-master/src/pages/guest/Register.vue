<template>
  <q-page class="q-pt-md" padding>
    <div class="row justify-center q-pt-md">
      <div class="col-md-6 col-xs-12">
        <q-card class="my-card bg-white text-black">
          <q-card-section class="text-center">
            <img src="statics/doctor.png" style="height: 100px;max-width: 150px;"/>
          </q-card-section>
          <q-card-section>
            <div class="text-secondary text-center text-h4">Daftarkan Akun Anda</div>
          </q-card-section>
          <q-card-section>
            <div class="row justify-center">
              <div class="col-md-12 col-xs-12">
                <q-stepper
                  v-model="step"
                  ref="stepper"
                  alternative-labels
                  color="secondary"
                  active-color="secondary"
                  animated
                  flat
                  header-nav
                  vertical
                  >
                  <q-step
                    :name="1"
                    title="General"
                    icon="settings"
                    color="secondary"
                    :done="step > 1"
                  >
                  <div class="text-blue-grey-14 text-h6">Field Yang Wajib Diisi !</div>
                    <q-input :rules="[val => !!val || 'Isi Username']" v-model="username" label="Username">
                      <template v-slot:append>
                        <q-icon name="person" />
                      </template>
                    </q-input>
                    <q-input :rules="[val => !!val || 'Isi Password']" type="password" class="q-pt-md" v-model="password" label="Password">
                      <template v-slot:append>
                        <q-icon name="lock" />
                      </template>
                    </q-input>
                    <q-input :rules="[ val => val == password || 'Password Tidak Sama', val => !!val || 'Ketik Ulang Password']" type="password" class="q-pt-md" v-model="password_ulang" label="Password Ulang">
                      <template v-slot:append>
                        <q-icon name="lock" />
                      </template>
                    </q-input>
                    <q-input :rules="[val => !!val || 'Isi Nama Lengkap']" type="text" v-model="nama_lengkap" label="Nama Lengkap" class="q-pt-md">
                      <template v-slot:append>
                        <q-icon name="person" />
                      </template>
                    </q-input>
                    <q-input :rules="[val => !!val || 'Isi Email']" type="email" v-model="email" label="Email" class="q-pt-md">
                      <template v-slot:append>
                        <q-icon name="email" />
                      </template>
                    </q-input>
                  </q-step>

                  <q-step
                    :name="2"
                    title="Biodata, Kontak Dan Alamat"
                    caption="Optional"
                    active-color="secondary"
                    done-color="secondary"
                    icon="location_on"
                    :done="step > 2"
                    :disable="cekStep1"
                  >
                    <div class="text-blue-grey-14 text-h6">Anda Bisa Melewati Langkah Ini</div>
                    <q-select
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      v-model="jenisKelamin"
                      :options="listJenis"
                      label="Jenis Kelamin"/>
                    <q-input @click="$refs.ttl.show()" label="Tanggal Lahir" v-model="ttl" mask="date" :rules="['date']" class="q-pt-md">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="ttl" :breakpoint="600">
                            <q-date v-model="ttl" filled ref="dateDialog"  @input="$refs.ttl.hide()"/>
                          </q-popup-proxy>
                        </q-icon>
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
                  </q-step>

                  <q-step
                    :name="3"
                    title="Profesi Dan Organisasi"
                    active-color="secondary"
                    icon="people"
                    :disable="cekStep1"
                  >
                    <div class="text-blue-grey-14 text-h6">Anda Bisa Melewati Langkah Ini</div>
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
                      "/>
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
                  </q-step>

                  <q-step
                    :name="4"
                    title="Nomor Identitas"
                    active-color="secondary"
                    icon="credit_card"
                    :disable="cekStep1"
                  >
                    <div class="text-blue-grey-14 text-h6">Anda Bisa Melewati Langkah Ini</div>
                    <q-input type="number" v-model="no_ktp" label="No KTP" class="q-pt-md">
                      <template v-slot:append>
                        <q-icon name="credit_card" />
                      </template>
                    </q-input>
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
                  </q-step>

                  <q-step
                    :name="5"
                    title="Upload File Identitas"
                    active-color="secondary"
                    icon="credit_card"
                    :disable="cekStep1"
                  >
                    <div class="text-blue-grey-14 text-h6">Anda Bisa Melewati Langkah Ini</div>
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
                  </q-step>

                  <template v-slot:navigation>
                    <q-stepper-navigation>
                      <q-btn v-if="step === 1 || step === 5" @click="step === 5 ? fixed = true : $refs.stepper.next()" :disable="cekStep1" color="secondary" rounded :label="step === 5 ? 'Kirim Data' : 'Continue'" />
                      <q-btn color="secondary" to="/login" rounded flat label="Back To Login" class="q-ml-xs"/>
                      <q-btn v-if="step > 1" flat color="secondary" rounded @click="$refs.stepper.previous()" label="Back Step" class="q-ml-sm" />
                      <q-btn v-if="step > 1 && step < 5" flat color="secondary" rounded @click="$refs.stepper.next()" label="Lewati" class="float-right q-ml-sm" />
                    </q-stepper-navigation>
                  </template>
                </q-stepper>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="fixed" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p v-for="(n, i) in 15" :key="n">{{ i+1 }}. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" @click="register"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import ListProvKota from '../../statics/api/ListProvKota'
export default {
  name: 'PageIndex',
  data () {
    return {
      fixed: false,
      step: 1,
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
        if (this.organisasi === '') {
          formData.append('cabang_organisasi', '')
        } else {
          formData.append('cabang_organisasi', this.cabang_organisasi.value)
        }
        formData.append('cabang_kota', this.cabang_kota)

        try {
          await this.$axios
            .post('users/register', formData)
            .then(res => {
              if (res.data.error === true) {
                this.showNotif(res.data.msg, 'red')
              } else {
                this.showNotif('Berhasil Daftar', 'green')
                this.$router.replace('/successregister/' + res.data.token)
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
    selectKota (prov) {
      this.cabang_kota = ''
      this.list_cabang_kota = prov.kota
    },
    simulateProgress () {
      // we set loading state
      this.loading = true
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this.loading = false
      }, 1000)
    },
    showNotif (message, jenis) {
      this.$q.notify({
        message: message,
        color: jenis,
        timeout: 2000,
        actions: [{ icon: 'close', color: 'white' }]
      })
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
    }
  },
  computed: {
    cekStep1: function () {
      if (this.username === '' || this.password === '' || this.password_ulang === '' || this.nama_lengkap === '' || this.email === '') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
