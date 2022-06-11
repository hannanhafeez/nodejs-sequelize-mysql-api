module.exports = (sequelize, Sequelize, DataTypes) => {
    const SensorValue = sequelize.define(
        "sensorvalues", // Model name
        {
            // Model attributes
            sensorvalue_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            sensor_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            sensorvalue: {
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

    return SensorValue;
};