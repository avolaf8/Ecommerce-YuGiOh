const { User, PushCart } = require("../models/index");
const { compare } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");
const axios = require("axios");
const nodemailer = require("../helpers/nodemailer");
const midtransClient = require("midtrans-client");
// const { OAuth2Client } = require('google-auth-library');

class Controller {
  static async register(req, res) {
    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      nodemailer(user.email)
      res.status(201).json({
        message: "Input data User succeed",
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: { email },
      });
      if (!user || !compare(password, user.password)) {
        throw { name: "Invalid login" };
      } else {
        const { id, email } = user;
        let token = sign({
          id,
          email,
        });
        res.status(200).json({
          access_token: token,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async fetchProduct(req, res) {
    try {
      const { data } = await axios({
        methods: "GET",
        url: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
        params: { limit: '20', offset: '0', num: '20' },
      });
      res.status(200).json(data);
      // console.log(data.data[0].card_sets[0].set_name);
      // console.log(data.data[0].card_sets[0].set_rarity_code);
      // console.log(data.data[0].desc);
      // console.log(data.data[0].card_images[0].image_url);
      // console.log(data.data[0].card_prices[0].ebay_price);
    } catch (error) {
      console.log(error);
    }
  }
  static async handlerAddCart(req, res) {
    try {
      const UserId = req.user.id;
      const ProductId = req.params.ProductId;
      const thirdAPI = req.body.thirdAPI
      const data = await PushCart.create({
        UserId,
        ProductId,
        thirdAPI,
        status: "unpaid",
      });
      res.status(201).json({
        message: "add to cart",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchPushCart(req, res) {
    try {
      console.log(req,`<<<<<<<<`);
      const UserId = req.User.id;
      const data = await PushCart.findAll({
        where: {
          UserId, status: 'unpaid'
        }
      });
      if (!data) {
        throw { name: "Data not found" }
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async deletedCart(req, res) {
    try {
      const id = req.params.id
      await PushCart.destroy({
        where: {
          id
        }
      })
      res.status(200).json({
        message: "Delete success"
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "error",
      });
    }
  }
  static async handlerPayment(req, res) {
    try {
      const UserId = req.user.id
      await PushCart.update(
        {
          status: "paid",
        },
        {
          where: {
            UserId
          },
        }
      );
      res.status(200).json({
        message: "Your recipest detail will be send for a minute ",
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async dropPoint(req, res, next) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'https://api.rajaongkir.com/starter/city',
        headers: {
          key: '3fd869122f5ade787398fd022c83c2c5'
        },
      })
      res.status(200).json(data)
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error"
      })
    }
  }

  static async shippingCoast(req, res, next) {
    try {
      let courier = "jne"
      const { destination } = req.query;
      const form = {
        origin: '153',
        destination,
        weight: 50,
        courier
      }
      const { data } = await axios({
        method: 'POST',
        url: 'https://api.rajaongkir.com/starter/cost',
        data: form,
        headers: {
          key: '3fd869122f5ade787398fd022c83c2c5'
        }
      })
      // console.log(data.rajaongkir.results[0].costs[0].cost[0].value);
      const result = data.rajaongkir.results[0].costs[0].cost[0].value
      res.status(201).json(result)
    } catch (error) {
      console.log(error);
    }
  }
  //Mid-server-w2-T5IHDdsWjaT1plqPWy3Lj
  //SB-Mid-server-VBl-8d24APFXR7gRTsNYCiXx
  //SB-Mid-client-28cXgmGqpH9TrYH3
  static async paymentGetWay(req, res, next) {
    try {
      const amount = req.query.amount;
      const UserId = req.user.id;
      const findPushCart = await PushCart.findOne({
        where: {
          UserId
        },
      });
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: 'SB-Mid-client-28cXgmGqpH9TrYH3',
      });

      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION_" + Math.floor(100 + Math.random() * 666),
          gross_amount: `${amount * 15000}`,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: req.user.username,
          email: req.user.email,
        },
      };
      let token = await snap.createTransaction(parameter);
      res.status(201).json(token);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller

try {
  
} catch (error) {
  
}