module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      // Remplace this value (bug image when replace need to be fix)
      defaultValue: 'http://localhost:5000/images/default/default.jpg',
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Post);
    User.hasMany(models.Comment);
    User.hasMany(models.Like);
  };

  return User;
};