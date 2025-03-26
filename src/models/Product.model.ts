import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../lib/sequelize';

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
  public createdAt!: Date;
  public updatedAt!: Date;
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
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      purchased: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
      },
      saved: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
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