const mongoose = require("mongoose");

const automods = new mongoose.Schema({
  Guild: String,
  LogChannel: String,
  Timeout: String,
  AntiUnverifiedBot: Boolean,
  AntiSwear: Boolean,
  AntiScam: Boolean,
  AntiLink: Boolean,
  AntiPing: Boolean,
  AntiAltAccount: Boolean,
  AntiCaps: Boolean,
  AntiSpam: Boolean,
  AntiNsfw: Boolean,
});

module.exports = mongoose.model('automods', automods);