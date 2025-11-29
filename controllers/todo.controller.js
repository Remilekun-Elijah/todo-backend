import TodoModel from "../models/todo.model.js";

export const createTodo = (req, res) => {
  // validate the request body
  if (req.body.name === "") {
    return res.status(400).json({
      message: "Todo name is required",
      success: false,
    });
  } else {
    // extract the data from the request body
    const payload = req.body;

    // store the data in the database
    TodoModel.create(payload)
      .then((doc) => {
        res.status(201).json({
          message: "Todo created successfully",
          data: doc,
          success: true,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error creating todo",
          error: error.message,
          success: false,
        });
      });
  }
};

export const deleteAllTodos = async (req, res) => {
  try {
    // delete all todos from the database
    const data = await TodoModel.deleteMany({});

    res.status(200).json({
      message: "All todos deleted successfully",
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    // fetch all the todos from the database
    const todos = await TodoModel.find().sort({ completed: 1 });

    res.status(200).json({
      message: "Todos retrieved successfully",
      data: todos,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const updateTodoUsingPut = async function (req, res) {
  try {
    if (
      ["", undefined, null].includes(req.body.name) ||
      ["", undefined, null].includes(req.body.completed)
    ) {
      return res.status(400).json({
        message: "Todo name or completed are required",
        success: false,
      });
    }

    const id = req.params.id;
    const payload = req.body;

    // find the todo in the database using its id
    const todo = await TodoModel.findById(id);

    if (todo === null) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
      });
    } else {
      const updatedTodo = await TodoModel.findByIdAndUpdate(id, payload, {
        new: true,
      });

      res.status(200).json({
        message: "Todo updated successfully",
        data: updatedTodo,
        success: true,
      });
      // const obj = Object.assign(todo, payload);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const updateTodoUsingPatch = async function (req, res) {
  try {
    const id = req.params.id;
    const payload = req.body;

    // find the todo in the database using its id
    const todo = await TodoModel.findByIdAndUpdate(id, payload, { new: true });

    if (todo === null) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
      });
    } else {
      res.status(200).json({
        message: "Todo updated successfully",
        data: todo,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getSingleTodo = async function (req, res) {
  try {
    const id = req.params.id;
    // find the todo in the database using its id
    const todo = await TodoModel.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
      });
    } else {
      res.status(200).json({
        message: "Todo retrieved successfully",
        data: todo,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const deleteSingleTodo = async function (req, res) {
  try {
    const id = req.params.id;
    // find the todo in the database using its id
    const todo = await TodoModel.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
