module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    first_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  };

  return Comment;
};