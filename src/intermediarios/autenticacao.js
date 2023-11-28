const jwt = require('jsonwebtoken')
const pool = require('../conexao')
const senhajwt = require('../senhajwt')

const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }
    const token = authorization.split(' ')[1]
    try {
        const tokenUsuario = jwt.verify(token, senhajwt)
        const userID = tokenUsuario.id
        req.usuario = userID
        next()
    } catch (error) {
        return res.status(401).json({ mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado." })
    }

}

module.exports = verificarUsuarioLogado