module.exports = (sequelize, Sequelize, DataTypes) => {
    const People = sequelize.define(
        "people", // Model name
        {
            // Model attributes
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
            },
            companey: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,

            },
            mobileno: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            created_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE
            }
        }, {
            // Options
            timestamps: true,
            underscrored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    );

    return People;
};