const pool = require('../conexao')
const jwt = require('jsonwebtoken')
const senhajwt = require('../senhajwt')
const { query } = require('express')
const bcrypt = require('bcrypt')
const { obterIdToken } = require('./funcoes')

const detalharUsuario = async (req, res) => {
    const id = obterIdToken(req.headers)
    try {
        const { rows, rowCount } = await pool.query('select * from usuarios where id = $1', [id])
        const { senha: _, ...usuarioLogado } = rows[0]
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' })
        }
        return res.status(200).json(usuarioLogado)
    } catch (error) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado!' })
    }
}
const atualizarUsuario = async (req, res) => {
    try {
        const id = obterIdToken(req.headers)
        const { nome, email, senha } = req.body
        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' })
        }
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const { rows, rowCount } = await pool.query('select * from usuarios where email ilike $1', [email])
        if (rowCount > 1) {
            return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." })
        }
        await pool.query('update usuarios  set nome=$1,email=$2,senha =$3 where id=$4', [nome, email, senhaCriptografada, id])
        return res.status(204).json()
    } catch (error) {
        res.status(500).json({ mensagem: 'Aconteceu um erro inesperado' })
    }
}
const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' })
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10)
    try {
        const { rows, rowCount } = await pool.query('select *from usuarios where email ilike $1', [email])
        if (rowCount >= 1) {
            return res.status(400).json({ mensagem: "O e-mail informado já está sendo utilizado por outro usuário." })
        }
        const requisicaoQuery = await pool.query('insert into usuarios (nome, email, senha) values ($1, $2 ,$3)', [nome, email, senhaCriptografada])
        const usuario = {
            nome: nome,
            email: email,
        }
        return res.status(201).json(usuario)
    } catch (error) {
        res.status(500).json({ mensagem: 'Aconteceu um erro inesperado' })
    }

}
const loginUsuario = async (req, res) => {
    const { email, senha } = req.body
    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' })
    }
    try {
        const { rows, rowCount } = await pool.query('select *from usuarios where email ilike $1', [email])
        if (rowCount < 1) {
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }
        const compararSenha = await bcrypt.compare(senha, rows[0].senha)
        if (!compararSenha) {
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }
        const token = jwt.sign({ id: rows[0].id }, senhajwt, { expiresIn: '4h' })
        const { senha: _, ...usuarioLogado } = rows[0]
        const usuario = usuarioLogado
        return res.status(200).json({ usuario, token })

    } catch (error) {
        return res.status(500).json({ mensagem: 'Aconteceu um erro inesperado' })
    }

}





module.exports = {
    atualizarUsuario,
    detalharUsuario,
    cadastrarUsuario,
    loginUsuario
}