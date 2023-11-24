<<<<<<< HEAD
const { Sequelize, DataTypes } = require('sequelize'); // pour l'auto-complete
=======
const {Sequelize, DataTypes} = require('sequelize'); // pour l'auto-complete
>>>>>>> 600b8cee0884b6a4db4ac936a996d9dc92342eaf

/**
 * 
 * @param {Sequelize} sequelize 
<<<<<<< HEAD
 * @param {Products} DataTypes 
=======
 * @param {DataTypes} DataTypes 
>>>>>>> 600b8cee0884b6a4db4ac936a996d9dc92342eaf
 * @returns 
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Products', {
    ProductId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ProductName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    QuantityPerUnit: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    UnitPrice: {
      type: DataTypes.DECIMAL(19,4),
      allowNull: true,
      defaultValue: 0
    },
    UnitsInStock: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    UnitsOnOrder: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    ReorderLevel: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    Discontinued: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'Products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ProductName",
        fields: [
          { name: "ProductName" },
        ]
      },
      {
        name: "Products_pkey",
        unique: true,
        fields: [
          { name: "ProductId" },
        ]
      },
    ]
  });
};
