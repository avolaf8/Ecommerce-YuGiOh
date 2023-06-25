'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PushCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     PushCart.belongsTo(models.User)
    }
  }
  PushCart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    thirdAPI: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PushCart',
  });
  return PushCart;
};