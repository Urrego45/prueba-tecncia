import { pool } from '../db.js';

export const getTasks = async (req, res) => {
  
  try {

    const [findTasks] = await pool.query(
      "SELECT * FROM tasks WHERE id_user = ?",
      [req.user.id]
    )

    return res.json(findTasks)
      
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const createTask = async (req, res) => {
  const { title, description } = req.body
  try {

    const save = await pool.query(
      "INSERT INTO tasks (id_user, title, description) VALUES (?, ?, ?)",
      [req.user.id, title, description]
    )

    res.json({
      id: save.insertId,
      title: title,
      description: description
    })

      
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateTask = async (req, res) => {
  const { title, description } = req.body

  try {
    await pool.query(
      "UPDATE tasks set title = ?, description = ? WHERE id = ?",
      [title, description, req.params.id]
    )

    res.json({ message: "Tarea actualizada." })
      
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteTask = async (req, res) => {
  try {

    await pool.query(
      "DELETE FROM tasks  WHERE id = ?",
      [req.params.id]
    )

    res.json({ message: "Tarea eliminada." })
      
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
