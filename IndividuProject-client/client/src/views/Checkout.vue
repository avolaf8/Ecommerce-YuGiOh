<script>
import Navbar from "../components/Navbar.vue";
// import Cart from "../components/Cart.vue";

import { mapActions, mapState, mapWritableState } from "pinia";
import { useAppStore } from "../stores/app";

export default {
  data() {
    return {
      city: '',
      total: 0
    }
  },
  components: {
    Navbar,
    // Cart,
  },
  computed: {
    ...mapWritableState(useAppStore, ["checkout", "subtotal", 'cities', 'coast', 'total']),

  },
  methods: {
    ...mapActions(useAppStore, ["fetchPushCart", "dropPoint", "shippingCoast", 'paymentGetWay']),
    async payment() {
      await this.paymentGetWay();

    },
    async handleShippingCoast() {
      await this.shippingCoast(this.city)
      this.total = Number(this.coast) + Number(this.subtotal)

    }
  },
  created() {
    this.fetchPushCart();
    this.dropPoint()
    this.fee = 0
    this.subtotal = 0
  },
};
</script>

<template>
  <Navbar />
  <pre>{{ cities }}</pre>
  <div v-for="city in cities" :key="city.city_id">{{ city.city_name }}></div>
  <div class="app-content">
    <div class="u-s-p-y-60">
      <div class="section__content">
        <div class="container">
          <div class="breadcrumb">
            <div class="breadcrumb__wrap">
              <ul class="breadcrumb__list">
                <li class="has-separator">
                  <a href="index.html">Home</a>
                </li>
                <li class="is-marked">
                  <a href="cart.html">Cart</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="u-s-p-b-60">
      <div class="section__intro u-s-m-b-60">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section__text-wrap">
                <h1 class="section__heading u-c-secondary">SHOPPING CART</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <Cart v-for="product in checkout" :key="product.id" :checkout="product" /> -->
    </div>
    <div class="u-s-p-b-60">
      <div class="section__content">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
              <div class="row">
                <div class="col-lg-4 col-md-6 u-s-m-b-30">
                  <div class="f-cart__pad-box">
                    <form class="f-cart" @submit.prevent="handleShippingCoast">
                      <h1 class="gl-h1">ESTIMATE SHIPPING AND TAXES</h1>
                      <span class="gl-text u-s-m-b-30">Enter your destination to get a shipping estimate.</span>
                      <div class="u-s-m-b-30">
                        <label class="gl-label" for="shipping-state">TUJUAN*</label>
                        <select v-model="city" class="select-box select-box--primary-style" id="shipping-state">
                          <option disabled selected value="">Kota Tujuan</option>
                          <option v-for="city in cities" :key="city.city_id">{{ city.city_name }}</option>
                        </select>
                      </div>
                      <div class="u-s-m-b-30">
                        <button type="submit">
                          <a class="f-cart__ship-link btn--e-transparent-brand-b-2">CALCULATE
                            SHIPPING</a></button>
                      </div>
                    </form>
                    <span class="gl-text">Note: There are some countries where free shipping is available otherwise our
                      flat rate charges or country delivery charges will be apply.</span>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 u-s-m-b-30">
                  <div class="f-cart__pad-box">
                    <div class="u-s-m-b-30">
                      <table class="f-cart__table">
                        <tbody>
                          <tr>
                            <td>SHIPPING</td>
                            <td>{{ coast }}</td>
                          </tr>
                          <tr>
                            <td>SUBTOTAL</td>
                            <td>{{ this.subtotal }}</td>
                          </tr>
                          <tr>
                            <td>GRAND TOTAL</td>
                            <td>{{ total }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <button @click.prevent="payment" class="btn btn--e-brand-b-2" type="submit"> PROCEED TO
                        CHECKOUT</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>