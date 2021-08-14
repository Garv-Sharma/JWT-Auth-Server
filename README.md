ABOUT:
* This is a sample implementation of a JWT based authorization server which grants authenticated users a token to access system resources (or endpoints) & make requests. It uses 2 JSON web tokens - accessToken & refreshToken
* When a user logs in both tokens are given to the user (user authentication using login credentials is not implemented here)
* For making requests to the server (e.g.: /searchUsers), the user sends accessToken as authorization header.
* The accessToken has a short expiry duration after which it will become invalid. Logged in users will use the refreshToken to generate new accessToken for themselves to get access. The accessToken is not stored on the server but the refreshToken is stored on the server. It does not expire but will be deleted from server when user logs out so that logged out user cannot use their refreshToken to generate any more accessToken. Hence user (or any unexpected requestor having any token will not be able to access resources) after logging out.
* The Secret Key for signing the JWT is generated using the 'crypto' library
* Use https://jwt.io/#debugger-io to visualize JWT payload

Assumptions:
* The user will be authenticated using a different strategy before being given JWTs
* The secret keys are usually placed in a safe location like a Key Vault or Key Management Service
* The refreshToken should be stored in a safe location like a database or Redis cache. For this application, we are storing it in a local file 'tokens.json'
* 'users.json' is a sample file used to simulate contents of a user's database

HTTP Status codes sent by server:
* 200 - /login      - OK
* 201 - /createUser - Created
* 204 - /logout     - No content
* 401 - /getToken, /searchUsers   - Unauthorized (missing token in header)
* 403 - /getToken, /searchUsers   - Forbidden (token invalid/expired)

External/Third-party packages used:
* Express.js (https://www.npmjs.com/package/express)
* dotenv (https://www.npmjs.com/package/dotenv)
* jsonwebtoken (https://www.npmjs.com/package/jsonwebtoken)
* (request is a dev dependency)

How to run the application:
* Ensure NodeJS is installed in system
* Clone the code repository into a project folder
* Open a terminal at the project folder
* Run: "npm install" to install dependencies
* Run: "node index.js"
* Refer apiCall.js for sample API requests to the server
