module.exports = (sequelize, Sequelize, DataTypes) => {
    const Project = sequelize.define(
        "project", // Model name
        {
            // Model attributes
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            project_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lat: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            lng: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            alert_user: {
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

    return Project;
};