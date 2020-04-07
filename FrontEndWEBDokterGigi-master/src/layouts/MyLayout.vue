<template>
  <q-layout view="LHH lpR FFF">
    <q-header
      :class="leftDrawerOpen ? 'bg-grey-2' : 'bg-white'"
      :elevated="leftDrawerOpen"
      >
      <q-toolbar>
        <q-btn
          flat
          color="black"
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          class="desktop-only"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title shrink class="text-blue-grey-14 text-center text-h6 mobile-only">
          <!-- <q-avatar class="q-mr-md">
            <img src="statics/doctor.png">
          </q-avatar> -->
          <div
            class="q-mt-sm absolute-left"
            v-if="$route.name !== 'CreateEvent' &&
            $route.name !== 'Home' && $route.name !== 'YourEvent' &&
            $route.name !== 'MyEvent' && $route.name !== 'Cart'">
            <q-btn
              @click="$router.back()"
              icon="arrow_back"
              flat
            />
            asd
          </div>
          <div v-else>VELLID</div>
        </q-toolbar-title>
        <q-space/>
        <q-btn  flat >
          <q-avatar size="48px">
            <q-icon class="desktop-only" style="font-size: 1.2em" name="person" color="secondary"/>
            <q-icon class="mobile-only" style="font-size: 0.9em" name="far fa-user" color="blue-grey-14"/>
          </q-avatar>
          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
            auto-close
          >
            <q-list style="min-width: 100px">
              <q-item clickable to="/profile" active-class="text-secondary">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Profile</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable @click="logout()" active-class="text-secondary">
                <q-item-section avatar>
                  <q-icon name="fas fa-sign-out-alt" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="secondary"
      class="desktop-only"
    >
      <q-list>
        <q-item clickable v-ripple class="bg-grey-2 shadow-4">
          <q-item-section avatar>
            <q-avatar>
              <img src="statics/doctor.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1" class="text-h5">VELLID</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label header>Apps</q-item-label>
        <q-item active-class="text-secondary" clickable tag="a" to="/" exact>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Explore Kegiatan</q-item-label>
          </q-item-section>
        </q-item>
        <q-item active-class="text-secondary" clickable tag="a" to="/create_event">
          <q-item-section avatar>
            <q-icon name="add_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Buat Kegiatan</q-item-label>
          </q-item-section>
        </q-item>
        <q-item active-class="text-secondary" clickable tag="a" to="/my_event">
          <q-item-section avatar>
            <q-icon name="event_note" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Kegiatan Anda</q-item-label>
          </q-item-section>
        </q-item>
        <q-item active-class="text-secondary" clickable tag="a" to="/yourevent">
          <q-item-section avatar>
            <q-icon name="event_available" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Kegiatan Yang Diikuti</q-item-label>
          </q-item-section>
        </q-item>
        <q-item active-class="text-secondary" clickable tag="a" to="/keranjang">
          <q-item-section avatar>
            <q-icon name="shopping_cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Keranjang</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container :class="leftDrawerOpen ? 'bg-white' : 'bg-white q-mb-xl'">
      <router-view/>
    </q-page-container>
    <br>
    <q-tabs
      v-model="tab"
      active-color="white"
      no-caps
      dense
      active-bg-color="teal"
      class="bg-white text-secondary fixed-bottom Visible mobile-only"
      >
      <q-route-tab to="/" name="explore" icon="home" label="Home"/>
      <q-route-tab to="/keranjang" name="cart" icon="shopping_cart" label="Cart">
        <q-badge color="red" floating>{{ cart_count }}</q-badge>
      </q-route-tab>
      <q-route-tab to="/create_event" name="addevent" icon="add_box" label="Add"/>
      <q-route-tab to="/my_event" name="yourevent" icon="event_note" label="Event"/>
      <q-route-tab to="/yourevent" name="eventfollow" icon="event_available" label="Jadwal"/>
    </q-tabs>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      tab: 'mails',
      cart_count: 0
    }
  },
  async created () {
    let cartList = this.$q.localStorage.getItem('cart')
    this.cart_count = cartList.length
  },
  methods: {
    logout () {
      this.$q.localStorage.clear('datauser')
      this.$q.sessionStorage.clear('sessionuser')
      // this.$q.sessionStorage.remove('cart')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
