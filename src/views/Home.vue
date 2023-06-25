<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "../stores/app";
import Card from '../components/Card.vue'
import Navbar from '../components/Navbar.vue'
import Header from '../components/Header.vue'

export default {
  components: {
    Navbar,
    Header,
    Card
  },
  computed: {
    ...mapState(useAppStore, ["products"]),
  },
  methods: {
    ...mapActions(useAppStore, ["fetchProduct"]),
  },
  created() {
    this.fetchProduct();
  },
}
</script>

<template>
  <Navbar />
  <Header />
  <div class="section__content">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="filter__grid-wrapper u-s-m-t-30">
            <div class="row">
              <Card v-for="product in products.data" :key="product.id" :product="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
