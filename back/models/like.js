module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {});

  Like.associate = (models) => {
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