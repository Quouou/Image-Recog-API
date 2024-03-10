const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const saltRounds = 10;
const knex = require('knex')


const register = require('./controllers/register');
const signIn = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const app = express()

const db = knex({
    client: 'pg',
    connection: {
      host : 'dpg-cnmql88l6cac73fdbaug-a',
      port : 5432,
      user : 'image_recog_db_user',
      password : 'YGc0Ri99K3b34U5ftkb47flzoDuRAvSj',
      database : 'image_recog_db'
    }
  });

app.use(bodyParser.json())
app.use(cors()) 


app.get('/', (req, res)=> { res.send(db.users) })

app.post('/signin', (req,res) => {signIn.handleSignIn(req,res,db,bcrypt,saltRounds)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)})

app.put('/image', (req,res) => {image.handleImage(req,res,db)})

app.listen(process.env.PORT || 3000,() =>{
    console.log(`app is running on ${process.env.PORT}`)
})