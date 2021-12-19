const request = require('request')

var options = {
    // uri: "http://localhost:3000/searchUsers?name=John Doe&contact=garv24sharma@gmail.com",
    // uri: "http://localhost:3000/login",
    // uri: "http://localhost:3000/getToken",
    uri: "http://localhost:3000/logout",
    // uri: "http://localhost:3000/createUser",
    // headers: {
    //     "Content-Type":"application/json",
    //     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2FydiBTaGFybWEiLCJpYXQiOjE2Mjg5NDY0MTYsImV4cCI6MTYyODk0NjQ0Nn0.cdnWdcASx9KPqn-tN6SqeDyCjLHJlYexgQDdbIV-Qm4"
    // },
    // body: {
    //     "name": "John Doe",
    //     "gender": "Male",
    // },
    // body: {
    //     "username": "Garv Sharma"
    // },
    body: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2FydiBTaGFybWEiLCJpYXQiOjE2Mjg5NDY0MDF9.fK9ttfiNYKOT8J1vB1rUsnxDmmU3LdwcEl_SQy8XfBw"
    },
    method:"DELETE",
    // method: "GET",
    // method: "POST",
    json: true,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
}

return new Promise(function (resolve, reject) {
    request(options, function (error, res, body) {
        if (!error) 
        {
            console.log(res.statusCode)
            console.log(body)
            resolve()
        } else {
            console.log("error  is", error);  
            reject(error);
        }
    });
});