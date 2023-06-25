<!-- <script>
import axios from 'axios';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useAppStore } from '../stores/app';

export default {
  props: ['checkout'],
  computed: {
    ...mapState(useAppStore, ['isAuth']),
    ...mapWritableState(useAppStore, ['subtotal'])

  },
  data() {
    return {
      informProduct: {}
    }
  },
  methods: {
    ...mapActions(useAppStore, ['removeItem']),
    removeHandler() {
      this.removeItem(this.checkout.id)
    }
  },
  async created() {
    const { data } = await axios.get(this.checkout.ProductId)
    this.informProduct = data
    this.subtotal += +this.informProduct.price
  }
}
</script>

<template>
  <div class="section__content">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
          <div class="table-responsive">
            <table class="table-p">
              <tbody>
                <tr>
                  <td>
                    <div class="table-p__box">
                      <div class="table-p__img-wrap">
                        <img class="u-img-fluid"  alt="">
                      </div>
                      <div class="table-p__info">
                        <span class="table-p__name">
                          <a href="product-detail.html">{{ product }}</a></span>
                        <span class="table-p__category">
                          <a href="shop-side-version-2.html">Electronics</a></span>
                        <ul class="table-p__variant-list">
                          <li>
                            <span>Size: 22</span>
                          </li>
                          <li>
                            <span>Color: Red</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="table-p__price">${{ product.card_prices[0].ebay_price }}</span>
                  </td>
                  <td>
                    <div class="table-p__input-counter-wrap">
                      <div class="input-counter">
                        <span class="input-counter__minus fas fa-minus"></span>
                        <input class="input-counter__text input-counter--text-primary-style" type="text" value="1"
                          data-min="1" data-max="1000">
                        <span class="input-counter__plus fas fa-plus"></span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="table-p__del-wrap">
                      <a class="far fa-trash-alt table-p__delete-link" href="#"></a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->