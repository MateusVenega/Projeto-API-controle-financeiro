const pool = require('../conexao')
const jwt = require('jsonwebtoken')
const senhajwt = require('../senhajwt')
const { query } = require('express')
const bcrypt = require('bcrypt')
const verificarUsuarioLogado = require('../intermediarios/autenticacao')

const listarCategorias = async (req, res) => {
    try {
        const { rows } = await pool.query('select * from categorias')
        return res.status(200).json(rows)
    } catch (error) {

    }
}
module.exports = {
    listarCategorias,
}