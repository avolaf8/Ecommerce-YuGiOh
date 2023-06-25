<script>
import { mapActions, mapState } from 'pinia';
import { useAppStore } from '../stores/app';

export default {
  computed: {
    ...mapState(useAppStore, ['isAuth'])
  },
  methods: {
    ...mapActions(useAppStore, ['logout']),
    logoutHandler() {
      this.logout({
      })
    }
  }
}
</script>

<template>
  <header class="header--style-2">
    <nav class="primary-nav-wrapper">
      <div class="container">
        <div class="primary-nav">
          <a class="main-logo" @click.prevent="$router.push('/')">
            <img src="../assets/images/logo/logo-2.png" alt=""></a>
          <form class="main-form">
            <label for="main-search"></label>
            <input class="input-text input-text--border-radius input-text--style-2" type="text" id="main-search"
              placeholder="Search">
            <button class="btn btn--icon fas fa-search main-search-button" type="submit"></button>
          </form>
          <div class="menu-init" id="navigation">
            <div class="ah-lg-mode">
              <span class="ah-close">✕ Close</span>
              <ul class="ah-list ah-list--design1 ah-list--link-color-white">
                <a class="mini-cart-shop-link" v-if="isAuth" @click.prevent="$router.push('/checkout')"><i
                    class="fas fa-shopping-bag"></i></a>
                <li class="has-dropdown" data-tooltip="tooltip" data-placement="left" title="Account">
                  <a><i class="far fa-user-circle"></i></a>
                  <span class="js-menu-toggle"></span>
                  <ul style="width:120px">

                    <li>
                      <a href="signup.html" @click.prevent="$router.push('/register')"><i
                          class="fas fa-user-plus u-s-m-r-6"></i>
                        <span>Signup</span></a>
                    </li>
                    <li>
                      <a href="signin.html" v-if="!isAuth" @click.prevent="$router.push('/login')"><i
                          class="fas fa-lock u-s-m-r-6"></i>
                        <span>Signin</span></a>
                    </li>
                    <li>
                      <a href="signup.html" v-if="isAuth" @click.prevent="logoutHandler">
                        <i class="fas fa-lock-open u-s-m-r-6"></i>
                        <span>Signout</span></a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  </nav>
</header></template>