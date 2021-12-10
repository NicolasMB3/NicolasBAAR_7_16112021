module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    
    message: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },   
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    like: {
      type: DataTypes.INTEGER
    },
    dislike: {
      type: DataTypes.INTEGER
    } 
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    Post.hasMany(models.Comment);
  };

  return Post;
};
