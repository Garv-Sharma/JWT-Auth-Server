// configuration to use .env file
require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')

const { 
    createUser,
    searchUserByName,
    searchUserByContact,
    saveToken,
    checkRefreshToken,
    deleteRefreshToken
} = require('./utils')

const expiryTime = '30s'
// time can be in seconds (e.g. 60s) or minutes (e.g. 10m) depending on application/use-case

const app = express()
app.use(express.json())     // bodyParser based middleware

function generateAccessToken(user){
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: expiryTime})      
}

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"]     // contains Bearer {token}
    if(!authHeader){
        return res.sendStatus(401)      // Unauthorized
    }
    const token = authHeader.split(" ")[1]
    if(token == null){
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err){
            return res.sendStatus(403)      // Forbidden (token not valid)
        }
        // req.user = user
        next()
    })
}

app.post('/createUser', (req, res) => {
    // creating a new user (no authentication required, no token generated)
    createUser(req.body)
    return res.sendStatus(201)
})

app.post('/login', (req, res) => {
    // whenever a user logs in, give JWTs (assuming user is already authenticated with username/password or some other strategy)
    const username = req.body.username
    const user = { name: username }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFFRESH_KEY)
    saveToken(refreshToken)
    return res.json({
        accessToken: accessToken,
        refreshToken: refreshToken
    })
})

// used to refresh accessToken
app.post('/getToken', (req, res) => {
    const refreshToken = req.body.token
    if(refreshToken == null)
        return res.sendStatus(401)
    if(!checkRefreshToken(refreshToken))
        return res.sendStatus(403)
    
    // verify the refresh token
    jwt.verify(refreshToken, process.env.REFFRESH_KEY, (err, user) => {
        if(err){
            return res.sendStatus(403)      // User is logged out, token no more valid
        }
        const accessToken = generateAccessToken({name: user.name})
        return res.json({
            accessToken: accessToken
        })
    })
})

app.get('/searchUsers', authenticateToken, (req, res) => {
    // only authorized users can access this resource
    // either or both can be used to search users:
    const searchName = req.query.name
    const searchContact = req.query.contact
    let result = []
    if(searchName != undefined){
        const user = searchUserByName(searchName)
        if(user != null)
            result.push(user)
    }
    if(searchContact != undefined){
        for(const user of result){
            if(user.contact == searchContact)
                return res.json(result)     // same user returned, send & exit
        }
        const user = searchUserByContact(searchContact)
        if(user != null)
            result.push(user)
    }
    return res.json(result)
})

app.delete('/logout', (req, res) => {
    // delete user's refreshToken to prevent new accessToken from being issued & expiring access after some time
    const refreshToken = req.body.token
    deleteRefreshToken(refreshToken)
    return res.sendStatus(204)
})

// Server:
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})