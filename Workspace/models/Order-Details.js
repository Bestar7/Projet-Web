const Sequelize = require('sequelize');

/**
 * 
 * @param {Sequelize.Sequelize} sequelize 
 * @param {Order-Details} DataTypes 
 * @returns 
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order-Details', {
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Orders',
        key: 'OrderId'
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'ProductId'
      }
    },
    UnitPrice: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: false,
      defaultValue: 0
    },
    Quantity: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 1
    },
    Discount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Order-Details',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "OrderId",
        fields: [
          { name: "OrderId" },
        ]
      },
      {
        name: "OrdersOrder_Details",
        fields: [
          { name: "OrderId" },
        ]
      },
      {
        name: "PK_Order_Details",
        unique: true,
        fields: [
          { name: "OrderId" },
          { name: "ProductId" },
        ]
      },
      {
        name: "ProductId",
        fields: [
          { name: "ProductId" },
        ]
      },
      {
        name: "ProductsOrder_Details",
        fields: [
          { name: "ProductId" },
        ]
      },
    ]
  });
};
