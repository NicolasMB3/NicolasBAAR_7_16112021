module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {});

  Like.associate = (models) => {
  // FOREIGN KEY
  // See https://openclassrooms.com/fr/courses/6971126-implementez-vos-bases-de-donnees-relationnelles-avec-sql/7142296-ajoutez-une-relation-un-a-plusieurs for more informations
  // Peer-to-peer
    Like.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    Like.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Like;
};