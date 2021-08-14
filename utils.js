/**
 * Helper file to perform file/database actions (implements abstraction)
 */

const fs = require('fs')

function loadUsers(){
    try{
        const data = fs.readFileSync('users.json', 'utf8')
        return JSON.parse(data)
    }
    catch{
        return []
    }
}

function saveUsers(users){
    fs.writeFileSync('users.json', JSON.stringify(users))
}

function createUser(user){
    let users = loadUsers()
    users.push(user)
    saveUsers(users)
}

function searchUserByName(name){
    const users = loadUsers()
    for (const user of users){
        if(user.name == name){
            return user
        }
    }
    return null
}

function searchUserByContact(contact){
    const users = loadUsers()
    for (const user of users){
        if(user.contact == contact){
            return user
        }
    }
    return null
}

function loadTokens(){
    try{
        const data = fs.readFileSync('tokens.json', 'utf8')
        return JSON.parse(data)
    }
    catch{
        return []
    }
}

function saveTokens(tokens){
    fs.writeFileSync('tokens.json', JSON.stringify(tokens))
}

function saveToken(token){
    const tokens = loadTokens()
    tokens.push(token)
    saveTokens(tokens)
}

function checkRefreshToken(token){
    const tokens = loadTokens()
    for(const item of tokens){
        if(item == token)
            return true
    }
    return false
}

function deleteRefreshToken(token){
    const tokens = loadTokens()
    const newTokens = tokens.filter(item => item != token)
    saveTokens(newTokens)
}

module.exports = {
    createUser,
    searchUserByName,
    searchUserByContact,
    saveToken,
    checkRefreshToken,
    deleteRefreshToken
}