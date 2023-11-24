<<<<<<< HEAD:Workspace/models/Order_Details.js
const { Sequelize, DataTypes } = require('sequelize'); // pour l'auto-complete
=======
const {Sequelize, DataTypes} = require('sequelize'); // pour l'auto-complete
>>>>>>> 600b8cee0884b6a4db4ac936a996d9dc92342eaf:Workspace/models/Order-Details.js

/**
 * 
 * @param {Sequelize} sequelize 
<<<<<<< HEAD:Workspace/models/Order_Details.js
 * @param {Employees} DataTypes 
 * @returns
=======
 * @param {DataTypes} DataTypes 
 * @returns 
>>>>>>> 600b8cee0884b6a4db4ac936a996d9dc92342eaf:Workspace/models/Order-Details.js
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order_Details', {
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    tableName: 'Order_Details',
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
