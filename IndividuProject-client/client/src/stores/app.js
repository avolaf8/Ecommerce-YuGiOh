import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
const BASE_URL = 'http://localhost:3000'
import axios from 'axios'

export const useAppStore = defineStore('app', {
  state() {
    return {
      isAuth: false,
      products: [],
      checkout: [],
      subtotal: 0,
      pricelist: 0,
      cities: [],
      coast: 0
    }
  },
  actions: {
    checkAuth() {
      this.isAuth = !!localStorage.getItem('access_token')
    },
    async register(form) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/register`,
          data: form
        })
        this.$router.push('/login')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your account has been registered',
          showConfirmButton: false,
          timer: 1500
        })
      }
      catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`,
        })

      }
    },

    async login(form) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/login`,
          data: form
        })
        localStorage.setItem('access_token', data.access_token)
        this.isAuth = true
        this.$router.push('/')
        Swal.fire({
          icon: 'success',
          title: 'Login Succeed',
          showConfirmButton: false,
          timer: 2000
        })
      }
      catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`,
        })
      }
    },

    async logout() {
      try {
        localStorage.clear()
        this.checkAuth()
        this.$router.push('/')
      }
      catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          // text: `${error.response.data.message}`,
        })
      }
    },

    async fetchProduct() {
      try {
        const { data } = await axios({
          methods: 'GET',
          url: `${BASE_URL}/products`,
          // headers:{
          //   access_token: localStorage.getItem('access_token')
          // }
        })
        // console.log(data.data[0].card_sets[0].set_name)
        this.products = data
      }
      catch (error) {
        console.log(error)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`,
        })
      }
    },

    async handlerAddCart(ProductId, thirdAPI, price) {
      try {
        // console.log(price)
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/products/${ProductId}`,
          data: {
            price
          },
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.pricelist += +price
        Swal.fire({
          icon: 'success',
          title: `Success add to cart`,
          showConfirmButton: false,
          timer: 2000
        })
      }
      catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          // text: `${err.response.data.message}`,
        })
      }
    },
    async fetchPushCart() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/cart`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.checkout = data
      }
      catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          // text: `${error.response.data.message}`,
        })
      }
    },

    async deletedCart(id) {
      try {
        const { data } = await axios({
          method: 'DELETE',
          url: `${BASE_URL}/cart/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.fetchPushCart()
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          // text: `${error.response.data.message}`,
        })
      }
    },

    async handlerPayment() {
      try {
        const { data } = await axios({
          method: 'PATCH',
          url: `${BASE_URL}/checkout`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.fetchPushCart()
        this.$router.push('/')

      }
      catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          // text: `${error.response.data.message}`,
        })
      }
    },
    
    async dropPoint() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${BASE_URL}/shipping`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.cities = data.rajaongkir.results
      }
      catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          // text: `${error.response.data.message}`,
        })
      }
    },

    async shippingCoast(query) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/coast?destination=${query}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.coast = Math.round(+data * 6000) 
      }
      catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          // text: `${error.response.data.message}`,
        })
      }
    },

    async paymentGetWay() {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${BASE_URL}/payment?amount=${this.subtotal + this.coast}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        const callback = this.paid

        window.snap.pay(data.token, {
          onSuccess: function (result) {
            callback()
          }
        })
      }
      catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          // text: `${error.response.data.message}`,
        })
      }
    },
  }
})
