<script>
import { mapActions } from 'pinia';
import { useAppStore } from '../stores/app';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',

    }
  },
  methods: {
    ...mapActions(useAppStore, ['register']),
    registerHandler() {
      this.register({
        email: this.email,
        password: this.password,
        username: this.username,
      })
    }
  }
}
</script>

<template>
  <div class="u-s-p-b-60">
    <div class="section__intro u-s-m-b-60">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section__text-wrap">
              <h1 class="section__heading u-c-secondary">CREATE AN ACCOUNT</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section__content">
      <div class="container">
        <div class="row row--center">
          <div class="col-lg-6 col-md-8 u-s-m-b-30">
            <div class="l-f-o">
              <div class="l-f-o__pad-box">
                <h1 class="gl-h1">PERSONAL INFORMATION</h1>
                <form class="l-f-o__form" @submit.prevent="registerHandler">
                  <!-- <div class="gl-s-api">
                    <div class="u-s-m-b-15">
                      <button class="gl-s-api__btn gl-s-api__btn--fb" type="button"><i class="fab fa-facebook-f"></i>
                        <span>Signup with Facebook</span></button>
                    </div>
                    <div class="u-s-m-b-30">
                      <button class="gl-s-api__btn gl-s-api__btn--gplus" type="button"><i class="fab fa-google"></i>
                        <span>Signup with Google</span></button>
                    </div>
                  </div> -->
                  <div class="u-s-m-b-30">
                    <label class="gl-label" for="reg-fname">USERNAME *</label>
                    <input class="input-text input-text--primary-style" type="text" id="reg-fname" v-model="username"
                      placeholder="First Name">
                  </div>
                  <div class="u-s-m-b-30">
                    <label class="gl-label" for="reg-email">E-MAIL *</label>
                    <input class="input-text input-text--primary-style" type="text" id="reg-email" v-model="email"
                      placeholder="Enter E-mail">
                  </div>
                  <div class="u-s-m-b-30">
                    <label class="gl-label" for="reg-password">PASSWORD *</label>
                    <input class="input-text input-text--primary-style" type="text" id="reg-password" v-model="password"
                      placeholder="Enter Password">
                  </div>
                  <div class="u-s-m-b-15">
                    <button class="btn btn--e-transparent-brand-b-2" type="submit">CREATE</button>
                  </div>
                  <a class="gl-link" @click.prevent="$router.push('/login')" >Return to Store</a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>