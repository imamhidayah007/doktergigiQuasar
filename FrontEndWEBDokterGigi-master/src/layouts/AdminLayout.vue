<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-grey-2"
      elevated>
      <q-toolbar>
        <q-btn
          flat
          color="black"
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title></q-toolbar-title>
        <q-btn  flat >
          <q-avatar size="48px">
            <img src="statics/doctor.png">
          </q-avatar>
          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            <q-list style="min-width: 100px">
              <!-- <q-item clickable>
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Profile</q-item-label>
                </q-item-section>
              </q-item> -->
              <q-item clickable @click="logout" active-class="text-secondary">
                <q-item-section avatar>
                  <q-icon name="fas fa-sign-out-alt" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="secondary"
    >
      <q-list>
        <q-item clickable v-ripple class="bg-grey-2 shadow-4">
          <q-item-section avatar>
            <q-avatar>
              <img src="statics/doctor.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1" class="text-h5">ADMIN VELLID</q-item-label>
          </q-item-section>
        </q-item>
        <q-item-label header>Admin</q-item-label>
        <q-item clickable tag="a" to="/admin" exact active-class="text-secondary">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-item clickable tag="a" to="/addbanner" exact active-class="text-secondary">
          <q-item-section avatar>
            <q-icon name="add_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tambah Banner</q-item-label>
          </q-item-section>
        </q-item> -->
        <q-item clickable tag="a" to="/addpromosi" exact active-class="text-secondary">
          <q-item-section avatar>
            <q-icon name="add_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tambah Promosi</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/listpromosi" exact active-class="text-secondary">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>List Promosi</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
