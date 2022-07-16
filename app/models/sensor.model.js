module.exports = (sequelize, Sequelize, DataTypes) => {
    const Sensor = sequelize.define(
        "sensor", // Model name
        {
            // Model attributes
            sensor_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            project_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        
            sensor_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lat: {
                type: DataTypes.STRING,
                allowNull: true,

            },
            lng: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            upperthreashold: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lowerthreashhold: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sensor_type: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            topic: {
                type: DataTypes.STRING,
                allowNull: true,

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

    return Sensor;
};