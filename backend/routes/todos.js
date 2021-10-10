const Router = require("express");

const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos");
const router = Router();

router.post("/api", createTodo);

router.get("/api", getTodos);

router.patch("/api/:id", updateTodo);

router.delete("/api/:id", deleteTodo);

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
