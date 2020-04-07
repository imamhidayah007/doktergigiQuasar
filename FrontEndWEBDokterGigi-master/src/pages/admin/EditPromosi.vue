<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <q-card class="my-card bg-white text-black" padding>
          <q-card-section>
            <div class="text-h5 text-blue-grey-14">Tambah Promosi</div>
          </q-card-section>
          <q-card-section>
            <q-input label="Tittle" v-model="tittle"/>
            <q-input label="Deskripsi" v-model="deskripsi" class="q-mb-md"/>
            <q-editor
              v-model="konten"
              :dense="$q.screen.lt.md"
              :toolbar="[
                [
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    list: 'only-icons',
                    options: ['left', 'center', 'right', 'justify']
                  },
                  {
                    label: $q.lang.editor.align,
                    icon: $q.iconSet.editor.align,
                    fixedLabel: true,
                    options: ['left', 'center', 'right', 'justify']
                  }
                ],
                ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                ['token', 'hr', 'link', 'custom_btn'],
                ['print', 'fullscreen'],
                [
                  {
                    label: $q.lang.editor.formatting,
                    icon: $q.iconSet.editor.formatting,
                    list: 'no-icons',
                    options: [
                      'p',
                      'h1',
                      'h2',
                      'h3',
                      'h4',
                      'h5',
                      'h6',
                      'code'
                    ]
                  },
                  {
                    label: $q.lang.editor.fontSize,
                    icon: $q.iconSet.editor.fontSize,
                    fixedLabel: true,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'size-1',
                      'size-2',
                      'size-3',
                      'size-4',
                      'size-5',
                      'size-6',
                      'size-7'
                    ]
                  },
                  {
                    label: $q.lang.editor.defaultFont,
                    icon: $q.iconSet.editor.font,
                    fixedIcon: true,
                    list: 'no-icons',
                    options: [
                      'default_font',
                      'arial',
                      'arial_black',
                      'comic_sans',
                      'courier_new',
                      'impact',
                      'lucida_grande',
                      'times_new_roman',
                      'verdana'
                    ]
                  },
                  'removeFormat'
                ],
                ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                ['undo', 'redo']
              ]"
              :fonts="{
                arial: 'Arial',
                arial_black: 'Arial Black',
                comic_sans: 'Comic Sans MS',
                courier_new: 'Courier New',
                impact: 'Impact',
                lucida_grande: 'Lucida Grande',
                times_new_roman: 'Times New Roman',
                verdana: 'Verdana'
              }"
            />
            <q-input @change="selectFile" ref="file" type="file" class="q-mt-md"/>
            *Tambahkan Banner Promosi
            <q-img
              class="q-mt-md"
              :src="url_tampil"
              style="width: 100%"
            >
              <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
                Gambar Banner
              </div>
            </q-img>
            <div>
              <q-btn @click="upload()" label="Save" rounded class="bg-secondary text-white q-mt-md"/>
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
export default {
  name: 'PageIndex',
  data () {
    return {
      konten: '',
      file: '',
      url_tampil: '',
      tittle: '',
      deskripsi: '',
      change: false,
      imageOld: ''
    }
  },
  async created () {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await this.$axios.get('article/getpromosi/' + this.$route.params.id)
        let article = data.data
        this.konten = article.konten
        this.tittle = article.tittle
        this.deskripsi = article.deskripsi
        this.file = article.imageName
        this.url_tampil = 'http://dettacare-event.pptik.id/data/banner/' + article.imageName
        this.imageOld = article.imageName
      } catch (error) {
        reject(error)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    selectFile (event) {
      event.preventDefault()
      const preview = event.target.files[0]
      const url = URL.createObjectURL(preview)

      this.file = this.$refs.file.$refs.input.files[0]
      this.url_tampil = url
      this.change = true
    },
    upload () {
      const formData = new FormData()
      if (this.change) {
        formData.append('image', this.file)
        formData.append('imageOld', this.imageOld)
      } else {
        formData.append('image', null)
        formData.append('imageOld', this.file)
      }
      formData.append('change', this.change)
      formData.append('tittle', this.tittle)
      formData.append('deskripsi', this.deskripsi)
      formData.append('konten', this.konten)
      try {
        this.$axios.post('article/edit/' + this.$route.params.id, formData)
          .then(res => {
            if (res.data.error) {
              this.showNotif('Gagal', 'negative')
            } else {
              this.showNotif('Berhasil Menambah Gambar', 'positive')
              this.$router.replace('/listpromosi')
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
    }
  }
}
</script>
