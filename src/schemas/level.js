const { model, Schema } = require("mongoose");

const guildStats = new Schema({
    
    ignoreXP: String,
    xp: {
        type: Boolean,
        default: false
    },
    xpTimeout: {
        type: Number,
        default: 60000
    },
    xpLevelUp: {
        message: {
            type: String,
            default: "Congrats {mention} 🎉 on reaching {level} level 🎉"
        },
        channel: {
            type: String,
            default: 0
        },
        enable: {
            type: Boolean,
            default: true
        }
    },
    xpEate: {
        type: Number,
        default: 1
    },
    xpLimit: {
        up: {
            type: Number,
            default: 20
        },
        down: {
            type: Number,
            default: 5
        },
    },
    levelRewardMessage: {
        success: {
            type: String,
            default: "Congrats {mention} on reaching {level}, and you got **{role}** role as a reward"
        },
        fail: {
            type: String,
            default: "Congrats {mention} on reaching {level}, you were supposed to get **{role}** reward but I was unable to give you the role"
        },
    },
    levelReward: Object,
})

module.exports = model("GuildConfig", guildStats);