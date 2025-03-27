import { DataTypes, Model, Sequelize } from 'sequelize';

export class Product extends Model {
  public id!: string;
  public name!: string;
  public collection!: 'Kids' | 'Women' | 'Men' | 'Others';
  public sizes!: ('XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL')[];
  public subCategories!: string[];
  public imageUrls!: string[];
  public description!: string;
  public price!: number;
  public stock!: number;
  public purchased!: number;
  public saved!: number;
}

export function initProduct(sequelize: Sequelize) {
  Product.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      collection: {
        type: DataTypes.ENUM('Kids', 'Women', 'Men', 'Others'),
        allowNull: false,
      },
      sizes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      subCategories: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      imageUrls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER, 
        allowNull: false
      },
      purchased: {
        type: DataTypes.INTEGER, 
      },
      saved: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      timestamps: true,
    }
  );
}

export default Product;