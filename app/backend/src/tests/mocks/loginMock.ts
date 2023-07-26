import * as bcrypt from 'bcryptjs'
import jwtUtil from '../../utils/jwt.util'

const hashedPassword = bcrypt.hashSync('123456',10)

const loginBody = {
  email: "tfc@projeto.com",
  password: '123456'
}

const newUser = {
  id: 1,
  username: 'user',
  role: 'user',
  email: "tfc@projeto.com",
  password: hashedPassword
}

const loginBodyWithoutEmail = {
  password: '123456'
}

const loginBodyWithoutPassword = {
  email: 'tfc@projeto.com'
}

const loginInvalidEmail = {
  email: "tf.a.sa.b@c@projeto.com",
  password: '123456'
}

const loginInvalidPassword = {
  email: 'tfc@projeto.com',
  password: '01'
}

const token = jwtUtil.sign({id: newUser.id, email: newUser.email})

export default {
  loginBody,
  token,
  newUser,
  loginBodyWithoutEmail,
  loginBodyWithoutPassword,
  loginInvalidEmail,
  loginInvalidPassword
}