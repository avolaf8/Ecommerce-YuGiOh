<script >
import { mapActions, mapState, mapWritableState } from 'pinia';
import { RouterLink, RouterView } from 'vue-router'
import { useAppStore } from './stores/app';

export default {
  computed: {
    ...mapWritableState(useAppStore, ['isAuth'])
  },
  created() {
    if (localStorage.access_token)
      this.isAuth = true
  }
}
</script>

<template>
  <RouterView />
</template>

<style></style>
