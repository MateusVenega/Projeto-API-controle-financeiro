const jwt = require('jsonwebtoken')
const senhajwt = require('../senhajwt')
function obterIdToken(req, res) {
    const { authorization } = req
    const token = authorization.split(' ')
    const tokenUsuario = jwt.verify(token[1], senhajwt)
    const id = tokenUsuario.id
    return id

}

module.exports = {
    obterIdToken
}