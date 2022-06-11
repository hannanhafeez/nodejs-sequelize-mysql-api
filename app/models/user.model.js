module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define(
        "user", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                unique: false
            },
            firstname: {
                type: DataTypes.STRING,
                unique: false
            },
            lastname: {
                type: DataTypes.STRING,
                unique: false
            },
            phonenumber: {
                type: DataTypes.STRING,
                unique: false
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            company: {
                type: DataTypes.STRING
            }
        }, {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return User;
};