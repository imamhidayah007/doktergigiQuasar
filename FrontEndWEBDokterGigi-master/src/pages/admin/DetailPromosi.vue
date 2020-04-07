<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <q-card class="my-card bg-white text-black">
          <q-card-section>
            <div class="text-h5 text-blue-grey-14">Preview Promosi</div>
          </q-card-section>
          <q-card-section>
            <q-img :src="'http://dettacare-event.pptik.id/data/banner/'+data.imageName"/>
          </q-card-section>
          <q-card-section class="row items-center text-h5 text-blue-grey-14">
            {{ data.tittle }}
            <q-space />
            <q-card-actions align="around">
              <a target="_blank" :href="'https://www.facebook.com/sharer/sharer.php?u='+link+linkActive"><q-btn icon="fab fa-facebook" size="xl" flat color="blue-9"/></a>
              <a target="_blank" :href="'https://twitter.com/share?url='+link+linkActive">
                <q-btn icon="fab fa-twitter" size="xl" flat color="light-blue-5"/>
              </a>
              <a target="_blank" :href="'https://api.whatsapp.com/send?text='+link+linkActive">
                <q-btn icon="fab fa-whatsapp-square" size="xl" flat color="green-14"/>
              </a>
            </q-card-actions>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <div class="text-subtitle2 text-blue-grey-14">Deskripsi</div>
            <div class="text-blue-grey-14">{{ data.deskripsi }}</div>
          </q-card-section>
          <q-card-section>
            <div class="text-blue-grey-14" v-html="data.konten"></div>
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
      data: ''
    }
  },
  async created () {
    return new Promise(async (resolve, reject) => {
      try {
        var data = await this.$axios.get('article/getpromosi/' + this.$route.params.id)
        resolve(this.data = data.data)
      } catch (error) {
        reject(error)
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
