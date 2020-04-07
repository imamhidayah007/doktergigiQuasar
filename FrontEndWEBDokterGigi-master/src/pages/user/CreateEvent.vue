<template>
  <q-page padding>
      <div class="row">
        <div class="col-md-8 col-xs-12">
          <q-card flat class="bg-white text-black">
            <q-card-section>
              <div class="text-h5 text-blue-grey-14">Buat Kegiatan</div>
            </q-card-section>
            <q-card-section>
              <q-select v-model="kategori" :options="kategories" label="Pilih Jenis Event" />
              <q-input type="number" v-model="skp" label="SKP"/>
              <q-input v-model="tittle" label="Judul Kegiatan"/>
              <br>
              <div class="row">
                <div class="col-md-5 col-xs-12">
                  <q-input label="Tanggal Mulai" v-model="startDate" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="startDate" :breakpoint="600">
                          <q-date v-model="startDate" filled ref="dateDialog"  @input="$refs.startDate.hide()"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-6 col-xs-12">
                  <q-input label="Tanggal Selesai" v-model="endDate" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="endDate" :breakpoint="600">
                          <q-date v-model="endDate" filled ref="dateDialog"  @input="$refs.endDate.hide()"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5 col-xs-12">
                  <q-input label="Jam Mulai" v-model="startTime" mask="time" :rules="['time']">
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy ref="startTime">
                          <q-time
                            v-model="startTime"
                            @input="$refs.startTime.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-6 col-xs-12">
                  <q-input label="Jam Selesai" v-model="endTime" mask="time" :rules="['time']">
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy ref="endTime">
                          <q-time
                            v-model="endTime"
                            @input="$refs.endTime.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 col-xs-12">
                  <q-toggle
                    v-model="s1"
                    checked-icon="check"
                    color="green"
                    unchecked-icon="clear"
                    :label="s1 ? 'Limited' : 'Unlimited'"
                  />
                </div>
                <div class="col-md-4 col-xs-12">
                  <q-input :readonly="!s1" type="number" v-model="kouta" label="Limit Peserta"/>
                </div>
              </div>
              <q-select
                v-model="prov"
                @input="selectKota(prov)"
                :options="list_prov"
                label="Provinsi"
                class="q-pt-md"
                options-cover
                transition-show="scale"
                transition-hide="scale"
                />
              <q-select
                transition-show="scale"
                transition-hide="scale"
                v-model="kota"
                :options="list_kota"
                label="Kabupaten/Kota"
                options-cover
                class="q-pt-md q-pb-md"/>
              <q-input type="text" v-model="lokasi" label="Lokasi"/><br>
              <q-input
                v-model="deskripsi"
                type="textarea"
                outlined
                label="Deskripsi"
              />
              <div class="row q-mb-lg">
                <div class="col-md-5 col-xs-12">
                  <q-input label="Batas Early Bird" v-model="startEarlyBird" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="startEarlyBird" :breakpoint="600">
                          <q-date v-model="startEarlyBird" filled ref="dateDialog"  @input="$refs.startEarlyBird.hide()"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-6 col-xs-12">
                  <q-input prefix="Rp." type="number" label="Biaya Registrasi Early Bird" v-model="biaya_early_bird" />
                </div>
              </div>
              <div class="row q-mb-lg">
                <div class="col-md-5 col-xs-12">
                  <q-input label="Batas Reguler" v-model="startReguler" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="startReguler" :breakpoint="600">
                          <q-date v-model="startReguler" filled ref="dateDialog"  @input="$refs.startReguler.hide()"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-6 col-xs-12">
                  <q-input prefix="Rp." type="number" label="Biaya Registrasi Reguler" v-model="biaya_reguler" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-5 col-xs-12">
                  <q-input label="Batas Late" v-model="startLate" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="startLate" :breakpoint="600">
                          <q-date v-model="startLate" filled ref="dateDialog"  @input="$refs.startLate.hide()"/>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-6 col-xs-12">
                  <q-input prefix="Rp." type="number" label="Biaya Registrasi Late" v-model="biaya_ots" />
                </div>
              </div>
              <br>
              <div>
                Daftar Narasumber
              </div>
              <div
                v-for="(narasumber,i) in narasumbers"
                :key="narasumber.id_narasumber"
                class="row q-col-gutter-md"
              >
                <div class="col-md-10 col-xs-10">
                  <q-input type="text" :label="`Nama Narasumber `+(i+1)" v-model="narasumber.value" />
                </div>
                <div class="col-md-1 col-md-offset-1">
                  <q-btn round color="red" flat icon="close" @click="deleteNarasumber(narasumber.id)"/>
                </div>
              </div>
              <br>
              <q-btn color="secondary" flat rounded @click="addnarasumber" icon="add_box" label="Tambah Narasumber" />
              <br>
              <br>
              <div v-for="(item, index) in items" :key="item.id">
                <div class="row q-col-gutter-xs">
                  <div class="col-md-11 col-xs-11">
                    <q-input type="text" :label="`Hands On `+(index+1)" v-model="item.value" />
                  </div>
                  <div class="col-md-1 col-xs-1">
                    <q-btn round color="red" flat icon="close" @click="deleteItem(item.id)"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col md-12 col-xs-12">
                    <q-input type="number" :label="`SKP Hand On `+(index+1)" v-model="item.skp_hand_on" />
                  </div>
                </div>
                <br>
                <div class="row">
                  <div class="col-md-3 col-xs-12">
                    <q-toggle
                      v-model="item.s1"
                      checked-icon="check"
                      color="green"
                      unchecked-icon="clear"
                      :label="item.s1 ? 'Limited' : 'Unlimited'"
                    />
                  </div>
                  <div class="col-md-4 col-xs-12">
                    <q-input :readonly="!item.s1" type="number" v-model="item.kouta" label="Limit Peserta Hand On"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-5 col-xs-12">
                    <q-input label="Jam Mulai" v-model="item.start_hand_on" mask="time" :rules="['time']">
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy ref="start_hand_on">
                            <q-time
                              v-model="item.start_hand_on"
                              @input="$refs.start_hand_on[index].hide()"
                            />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-1"></div>
                  <div class="col-md-6 col-xs-12">
                    <q-input label="Jam Selesai" v-model="item.end_hand_on" mask="time" :rules="['time']">
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy ref="end_hand_on">
                            <q-time
                              v-model="item.end_hand_on"
                              @input="$refs.end_hand_on[index].hide()"
                            />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-5 col-xs-12">
                    <q-input label="Batas Early Bird" v-model="item.batas_early_bird" mask="date" :rules="['date']">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="batas_early_bird" :breakpoint="600">
                            <q-date v-model="item.batas_early_bird" filled ref="dateDialog"  @input="$refs.batas_early_bird[index].hide()"/>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-1"></div>
                  <div class="col-md-6 col-xs-12">
                    <q-input prefix="Rp." type="number" label="Biaya Early Bird" v-model="item.biaya_early_bird"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-5 col-xs-12">
                    <q-input label="Batas Reguler" v-model="item.batas_reguler" mask="date" :rules="['date']">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="batas_reguler" :breakpoint="600">
                            <q-date v-model="item.batas_reguler" filled ref="dateDialog"  @input="$refs.batas_reguler[index].hide()"/>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-1"></div>
                  <div class="col-md-6 col-xs-12">
                    <q-input prefix="Rp." type="number" label="Biaya Reguler" v-model="item.biaya_reguler"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-5 col-xs-12">
                    <q-input label="Batas Reguler" v-model="item.batas_late" mask="date" :rules="['date']">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="batas_late" :breakpoint="600">
                            <q-date v-model="item.batas_late" filled ref="dateDialog"  @input="$refs.batas_late[index].hide()"/>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-1"></div>
                  <div class="col-md-6 col-xs-12">
                    <q-input prefix="Rp." type="number" label="Biaya Late" v-model="item.biaya_late"/>
                  </div>
                </div>
              </div>
              <br>
              <q-btn color="secondary" flat rounded @click="addItem" icon="add_box" label="Tambah Hands On" />
              <br>
              <br>
              <div
                v-for="(cp,i) in cps"
                :key="cp.id"
                class="row q-col-gutter-md"
              >
                <div class="col-md-10 col-xs-10">
                  <q-input type="number" :label="`Contact Person `+(i+1)" v-model="cp.value" />
                </div>
                <div class="col-md-1 col-md-offset-1">
                  <q-btn round color="red" flat icon="close" @click="deletecp(cp.id)"/>
                </div>
              </div>
              <br>
              <q-btn color="secondary" flat rounded @click="addcp" icon="add_box" label="Tambah Contact Person" />
              <br><br>
              <div
                v-for="(rek) in rekening"
                :key="rek.id"
                class="row q-col-gutter-md"
              >
                <div class="col-md-10 col-xs-10">
                  <q-input type="number" label="No Rekening" v-model="rek.no_rek" />
                  <q-input type="text" label="Nama Bank" v-model="rek.nama_bank" />
                  <q-input type="text" label="Atas Nama" v-model="rek.an_no_rek" />
                  <br>
                </div>
                <div class="col-md-1 col-md-offset-1">
                  <q-btn round color="red" flat icon="close" @click="deletenorek(rek.id)"/>
                </div>
              </div>
              <br>
              <q-btn color="secondary" flat rounded @click="addnorek" icon="add_box" label="Tambah Rekening" />
              <br><br>
              Tambah Gambar
              <q-input
                @change="selectFile"
                multiple
                type="file"
                ref="file"
              />
              <br>
              <div class="row" v-for="(p,i) in pamflet_tampil" :key="p">
                <q-img
                  :src="p"
                  style="width: 100%"
                >
                  <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                    {{ `Gambar Pamflet `+(i+1) }}
                    <q-btn color="red-8" round flat icon="fas fa-trash-alt" @click="deleteimage(i)"/>
                  </div>
                </q-img>
              </div>
              <br>
              <q-btn color="secondary" rounded @click="sendfile" label="Simpan" />
            </q-card-section>
          </q-card>
        </div>
      </div>

  </q-page>
</template>

<style>
</style>

<script>
import { LocalStorage } from 'quasar'
import JwtDecode from 'jwt-decode'
import ListProvKota from '../../statics/api/ListProvKota'
export default {
  name: 'PageIndex',
  data () {
    return {
      tittle: null,
      valid: true,
      skp: null,
      startDate: null,
      endDate: null,
      startEarlyBird: null,
      startLate: null,
      startTime: null,
      endTime: null,
      lokasi: '',
      biaya_early_bird: '',
      biaya_reguler: '',
      biaya_ots: '',
      startReguler: '',
      narasumbers: [
        {
          value: '',
          id_narasumber: 1
        }
      ],
      file: [],
      startDateMenu: '',
      endDateMenu: '',
      startRegulerMenu: '',
      startEarlyBirdMenu: '',
      startLateMenu: '',
      startTimeMenu: '',
      endTimeMenu: '',
      modal: false,
      cps: [
        {
          value: null,
          id_cp: 1
        }
      ],
      email: '',
      items: [],
      kategories: ['Seminar', 'Workshop', 'Baksos', 'Hands On'],
      kategori: '',
      enabled: false,
      unlimited: false,
      deskripsi: '',
      s1: false,
      rekening: [
        {
          no_rek: '',
          an_no_rek: '',
          nama_bank: '',
          id: Math.ceil(Math.random() * 1000000)
        }
      ],
      kouta: '',
      pamflet_tampil: [],
      prov: '',
      list_prov: ListProvKota,
      kota: '',
      list_kota: null
    }
  },
  methods: {
    addnarasumber () {
      this.narasumbers.push({
        value: '',
        id_narasumber: Math.ceil(Math.random() * 1000000)
      })
    },
    deleteNarasumber (id) {
      this.narasumbers.splice(id, 1)
    },
    addItem () {
      this.items.push({
        value: '',
        skp_hand_on: '',
        s1: '',
        kouta: '',
        batas_early_bird: null,
        biaya_early_bird: '',
        batas_reguler: null,
        biaya_reguler: '',
        batas_late: null,
        biaya_late: '',
        start_hand_on: '',
        end_hand_on: '',
        id: Math.ceil(Math.random() * 1000000)
      })
    },
    deleteItem (id) {
      this.items.splice(this.items.id, 1)
    },
    addcp () {
      this.cps.push({
        value: '',
        id_cp: Math.ceil(Math.random() * 1000000)
      })
    },
    deletecp (id) {
      this.cps.splice(id, 1)
    },
    addnorek () {
      this.rekening.push({
        no_rek: '',
        an_no_rek: '',
        nama_bank: '',
        id: Math.ceil(Math.random() * 1000000)
      })
    },
    deletenorek (id) {
      this.rekening.splice(this.rekening.id, 1)
    },
    selectFile (event) {
      event.preventDefault()
      const preview = event.target.files[0]
      const url = URL.createObjectURL(preview)

      this.file.push(this.$refs.file.$refs.input.files[0])
      this.pamflet_tampil.push(url)
    },
    deleteimage (id) {
      this.file.splice(id, 1)
      this.pamflet_tampil.splice(id, 1)
    },
    async sendfile () {
      // const data_user = JSON.parse(localStorage.usertoken);
      const formData = new FormData()
      var batas
      if (this.s1 === false) {
        batas = 'Unlimited'
      } else {
        batas = this.kouta
      }

      for (let i = 0; i < this.file.length; i++) {
        formData.append('file', this.file[i])
      }

      formData.append('kategori', this.kategori)
      formData.append('skp', this.skp)
      formData.append('tittle', this.tittle)
      formData.append('tgl_mulai', this.startDate)
      formData.append('tgl_selesai', this.endDate)
      formData.append('jam_mulai', this.startTime)
      formData.append('jam_selesai', this.endTime)
      formData.append('kouta', batas)
      formData.append('lokasi', this.lokasi)
      formData.append('provinsi', this.prov)
      formData.append('kota', this.kota)
      formData.append('deskripsi', this.deskripsi)
      formData.append('batas_early_bird', this.startEarlyBird)
      formData.append('biaya_early_bird', this.biaya_early_bird)
      formData.append('batas_reguler', this.startReguler)
      formData.append('biaya_reguler', this.biaya_reguler)
      formData.append('batas_late', this.startLate)
      formData.append('biaya_late', this.biaya_ots)
      formData.append('narasumber', JSON.stringify(this.narasumbers))
      formData.append('cp', JSON.stringify(this.cps))
      formData.append('rekening', JSON.stringify(this.rekening))
      const data = LocalStorage.getItem('datauser')
      const decode = JwtDecode(data)

      formData.append('author', decode._id)
      formData.append('handon', JSON.stringify(this.items))

      try {
        await this.$axios.post('event/upload', formData)
          .then(resolve => {
            if (resolve.data.error === false) {
              this.showNotif('Berhasil Input', 'green')
              setTimeout(() => {
                this.$router.replace('/')
              }, 2100)
            } else {
              this.showNotif('Gagal Input', 'red')
            }
          })
      } catch (error) {
        console.log(error)
        this.showNotif('Terjadi Kesalahan Jaringan', 'red')
      }
    },
    selectKota (prov) {
      this.kota = ''
      this.prov = prov.value
      this.list_kota = prov.kota
    },
    showNotif (message, jenis) {
      this.$q.notify({
        message: message,
        color: jenis,
        timeout: 2000,
        actions: [{ icon: 'close', color: 'white' }]
      })
    },
    closeDialog () {
      this.$refs.qDateProxy1.hide()
    }
  }
}
</script>
