<template>
  <q-page>
    <div class="row">
      <div class="col-md-8 col-xs-12">
        <q-list>
          <q-item class="bg-grey-2 q-pt-lg q-pb-lg">
            <q-item-section>
              <q-item-label class="text-blue-grey-14 text-h6 text-bold">List Keranjang Anda</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list v-for="cart in cartList" :key="cart._id" class="bg-grey-2 q-mt-xs">
          <q-item>
            <q-item-section avatar>
              <q-icon name="shopping_cart" color="grey-7"/>
            </q-item-section>
            <q-item-section>
              <q-item clickable :to="`/detailevent/${cart._id}`">
                <q-item-section>
                  <q-item-label class="text-blue-grey-14 text-h6">{{ sliceText(cart.namaEvent) }}</q-item-label>
                  <q-item-label class="text-blue-grey-14 text-body">{{ sliceText(cart.lokasi) }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-item-section>
            <q-item-section side top>
              <q-btn icon="delete" @click="deleteCart(cart._id)" flat round class="text-negative"/>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
  </div>
  </q-page>
</template>

<style>
</style>

<script>
import jwtDecoder from 'jwt-decode'
import { LocalStorage } from 'quasar'
let tokenUser = LocalStorage.getItem('datauser')
let userData = jwtDecoder(tokenUser)
export default {
  data () {
    return {
      cartList: []
    }
  },
  async created () {
    let cartList = LocalStorage.getItem('cart')
    this.cartList = cartList
  },
  methods: {
    async deleteCart (id) {
      try {
        await this.$axios.post('users/deletecart', {
          id: userData._id,
          idCart: id
        }).then(res => {
          let cartList = this.cartList
          cartList.splice(cartList.indexOf(cartList._id))
          LocalStorage.set('cart', cartList)
          this.showNotif('Item Dihapus', 'green')
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
      if (text.length < 20) {
        return text
      } else {
        return text.substr(0, 18) + '...'
      }
    }
  }
}
</script>
