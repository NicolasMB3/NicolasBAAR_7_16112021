module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    
    message: {
      type: DataTypes.STRING,
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

  // FOREIGN KEY
  // See https://openclassrooms.com/fr/courses/6971126-implementez-vos-bases-de-donnees-relationnelles-avec-sql/7142296-ajoutez-une-relation-un-a-plusieurs for more informations
  // One-to-peer (un à plusieur)
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