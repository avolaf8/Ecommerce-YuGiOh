<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "../stores/app";

export default {
  props: ["product"],
  computed: {
    ...mapState(useAppStore, ["isAuth"]),
  },
  methods: {
    ...mapActions(useAppStore, ["handlerAddCart"]),
    addCartHandler() {
      this.handlerAddCart(this.product.id, this.product.thirdAPI, this.product.card_prices[0].ebay_price);
    },
  },
  created() {

  },
};
</script>

<template>
  <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item outwear">
    <div class="product-bs">
      <div class="product-bs__container">
        <div class="product-bs__wrap">
          <a class="aspect aspect--bg-grey aspect--square u-d-block" v-if="isAuth" @click.prevent="addCartHandler">
            <a data-modal="modal" data-modal-id="#add-to-cart"><i class="fas fa-plus-circle"></i></a>
            <img class="aspect__img" :src="product.card_images[0].image_url" alt=""></a>
          <div class="product-r__action-wrap">
          </div>
          <span class="product-bs__name">{{ product.name }}</span>
          <div class="product-bs__rating gl-rating-style"><i class="fas fa-star"></i><i class="fas fa-star"></i><i
              class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>
          </div>
          <span class="product-bs__price">${{ product.card_prices[0].ebay_price }}</span>
        </div>

      </div>
    </div>
  </div>
</template>