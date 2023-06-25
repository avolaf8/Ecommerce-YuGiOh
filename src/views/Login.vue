<script>
import { mapActions, mapState } from 'pinia';
import { useAppStore } from '../stores/app'

export default{
    data(){
        return{
            email:'',
            password:''
        }
    },
    computed:{
      ...mapState(useAppStore, ['isAuth'])
    },
    methods:{
        ...mapActions(useAppStore, ['login']),
        loginHandler(){
            this.login({
                email:this.email,
                password: this.password
            })
        }
    },
    created(){

    }
}
</script>

<template>
  <div class="section__intro u-s-m-b-60">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="section__text-wrap">
            <h1 class="section__heading u-c-secondary">ALREADY REGISTERED?</h1>
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
              <h1 class="gl-h1">I'M NEW CUSTOMER</h1>
              <span class="gl-text u-s-m-b-30">By creating an account with our store, you will
                be able to move through the checkout process faster, store shipping
                addresses, view and track your orders in your account and more.</span>
              <div class="u-s-m-b-15">
                <a class="l-f-o__create-link btn--e-transparent-brand-b-2" @click.prevent="$router.push('/register')" >CREATE AN ACCOUNT</a>
              </div>
              <h1 class="gl-h1">SIGNIN</h1>
              <span class="gl-text u-s-m-b-30">If you have an account with us, please log
                in.</span>
              <form class="l-f-o__form" @submit.prevent="loginHandler" method="POST">
                <!-- <div class="gl-s-api">
                  <div class="u-s-m-b-15">
                    <button class="gl-s-api__btn gl-s-api__btn--fb" type="button"><i class="fab fa-facebook-f"></i>
                      <span>Signin with Facebook</span></button>
                  </div>
                  <div class="u-s-m-b-15">
                    <button class="gl-s-api__btn gl-s-api__btn--gplus" type="button"><i class="fab fa-google"></i>
                      <span>Signin with Google</span></button>
                  </div>
                </div> -->
                <div class="u-s-m-b-30">
                  <label class="gl-label" for="login-email">E-MAIL *</label>
                  <input class="input-text input-text--primary-style" type="email" id="login-email" v-model="email"
                    placeholder="Enter E-mail">
                </div>
                <div class="u-s-m-b-30">
                  <label class="gl-label" for="login-password">PASSWORD *</label>
                  <input class="input-text input-text--primary-style" type="password" id="login-password" v-model="password"
                    placeholder="Enter Password">
                </div>
                <div class="gl-inline">
                  <div class="u-s-m-b-30">
                    <button class="btn btn--e-transparent-brand-b-2" type="submit">LOGIN</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>