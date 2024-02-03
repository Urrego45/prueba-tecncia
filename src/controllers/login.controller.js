import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../libs/jwt.js'
import { pool } from '../db.js';
import { TOKEN_SECRET } from '../config.js';


export const register = async (req, res) => {
  const { username, email, password } = req.body

  try {

    const [findEmail] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    )

    if (findEmail.length > 0) return res.status(400).json({
      message: "this email is already in use"
    })
    
    const passwordHash = await bcrypt.hash(password, 10)

    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUE (?, ?, ?)",
      [username, email, passwordHash]
    )

    const token = await createAccessToken({id: result.insertId})
    res.cookie('token', token)

    res.json({
      username: username,
      email: email,
      password: password
    })
      
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const listUsers = async (req, res) => {

  try {
    const [result] = await pool.query("SELECT * FROM users")
    res.json(result)
      
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const login = async (req, res) => {
  const { email, password } = req.body

  try {

    const [[result]] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    )

    const isMatch = await bcrypt.compare(password, result.password)
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" })

    const token = await createAccessToken({ id: result.id })

    res.cookie('token', token)
    res.json({
      id: result.id,
      username: result.username,
      email: result.email
    })

      
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const logout = async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const verifyToken = async (req, res) => {

  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized"})

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {

    if (error) return res.status(401).json({ message: "Unauthorized" })

    const [[userFound]] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [user.id]
    )

    if (!userFound || userFound.length === 0) return res.status(401).json({ message: "Unauthorized" })

    return res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
    });

  });
};