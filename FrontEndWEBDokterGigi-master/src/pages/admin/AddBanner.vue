<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <q-card class="my-card bg-white text-black">
          <q-carousel
            animated
            v-model="header"
            arrows
            navigation
            navigation-icon="minimize"
            infinite
            swipeable
            style="width:100%;height:100%;"
            >
            <q-carousel-slide class="img-responsive" :ratio="0" v-for="(image, i) in images" :name="(i+1)"  :key="image._id">
              <q-img spinner-color="teal" :src="linkBanner+image.imageName" placeholder-src="statics/default-placeholder-1024x1024-570x321.png"/>
            </q-carousel-slide>
          </q-carousel>
        </q-card>
      </div>
    </div>
    <div class="row q-mt-lg">
      <div class="col-md-12 col-xs-12">
        <q-card class="my-card bg-white text-black">
          <q-card-section>
            <div class="text-h6">Update Gambar Banner</div>
            <q-input type="file" ref="file"/>
            <q-btn class="q-mt-md" @click="upload()" color="secondary" icon="cloud_upload" label="Upload" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col-md-12 col-xs-12">
        <q-card class="my-card bg-white text-black">
          <q-card-section>
            <div class="text-h6">List Gambar Saat Ini</div>
          </q-card-section>
          <q-img class="q-mb-md" spinner-color="teal" v-for="(image, i) in images" :key="i" :src="linkBanner+image.imageName" placeholder-src="statics/default-placeholder-1024x1024-570x321.png">
            <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
              <q-btn icon="delete" @click="deleteImage(i, image._id)" flat round color="negative"/>
            </div>
          </q-img>
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
      header: 1,
      data: [],
      file: '',
      linkBanner: 'http://dettacare-event.pptik.id/data/banner/',
      images: []
    }
  },
  async created () {
    return new Promise(async (resolve, reject) => {
      try {
        await this.$axios.get('banner/getbanner')
          .then(res => {
            this.images = res.data
          })
      } catch (error) {
        console.log(error)
      }
    })
  },
  methods: {
    deleteImage (index, objectId) {
      var imageUpdate
      var imageDelete = this.images[index]
      if (this.images.length <= 1) {
        imageUpdate = []
        this.images = imageUpdate
      } else {
        this.images.splice(index, 1)
      }
      try {
        this.$axios
          .post('banner/deletebanner/' + objectId, {
            image_delete: imageDelete
          })
          .then(res => {
            if (res.data.error) {
              this.showNotif('Gagal', 'negative')
            } else {
              this.showNotif('Gambar Di Hapus', 'positive')
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
    upload () {
      let file = this.$refs.file.$refs.input.files[0]
      const formData = new FormData()
      formData.append('image', file)
      try {
        this.$axios.post('banner/uploadbanner', formData)
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
