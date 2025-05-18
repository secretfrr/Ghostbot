const { model, Schema } = require('mongoose')

let deletemsglogSchema = new Schema({
    Guild: String,
    Channel: String,
}, { versionKey: false })

module.exports = model('deletemsglog', deletemsglogSchema)