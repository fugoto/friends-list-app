const Sequelize = require('sequelize')
// DATABASE_URL from heroku once created
const databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/friends-list'
const db = new Sequelize(databaseUrl, {
    logging: false,
    operatorsAliases: false,
})
const { STRING, INTEGER } = Sequelize

const Friends = db.define('friends', {
    name: {
        type: STRING,
        unique: true
    },
    rating: {
        type: INTEGER,
        defaultValue: 5
    }
})

module.exports = { db, Friends }