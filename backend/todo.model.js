const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  description: String,
  responsible: String,
  priority: String,
  completed: Boolean,
});

const ToDo = mongoose.model("ToDo", todoSchema);
/* const task1 = new ToDo({
  description: "task1",
  responsible: "blabla",
  priority: "Low",
  completed: false,
});
 */

module.exports = mongoose.model('ToDo', todoSchema);