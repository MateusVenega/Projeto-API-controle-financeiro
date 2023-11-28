const pool = require('../conexao')
const jwt = require('jsonwebtoken')
const senhajwt = require('../senhajwt')
const { obterIdToken } = require('./funcoes')

const listarTransacao = async (req, res) => {
    const id = obterIdToken(req.headers)
    try {
        const { rows } = await pool.query('select * from transacoes where usuario_id = $1', [id])
        const transacoes = rows
        if (transacoes.length <= 0) {
            return res.status(200).json({ mensagem: "Não foram encontradas transações para este usuário!" })
        }
        return res.status(200).json(transacoes)
    } catch (error) {
        return res.status(200).json([])
    }
}
const deletarTransacao = async (req, res) => {
    const id = obterIdToken(req.headers)
    const transacaoId = req.params.id
    try {
        const { rows, rowCount } = await pool.query('select * from transacoes where id=$1 and usuario_id=$2', [transacaoId, id])
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: "Transação não encontrada." })
        }
        await pool.query('delete from transacoes where id=$1', [transacaoId])
        return res.status(204).json()
    } catch (error) {
    }


}

const detalharTransacao = async (req, res) => {
    const id = obterIdToken(req.headers)
    const transacaoId = req.params.id
    try {
        const { rows, rowCount } = await pool.query('select * from transacoes where id=$1 and usuario_id=$2', [transacaoId, id])
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: "Transação não encontrada." })
        }
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro inesperado do Servidor!" })
    }

}
const cadastrarTransacao = async (req, res) => {
    const id = obterIdToken(req.headers)
    const { descricao, valor, data, categoria_id, tipo } = req.body
    const { rows, rowCount } = await pool.query('select * from categorias where id=$1', [categoria_id])
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados." })
    }
    if (rowCount < 1) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada.' })
    }
    try {
        await pool.query('insert into transacoes (descricao, valor, data, categoria_id, tipo,usuario_id) values ($1,$2,$3,$4,$5,$6)',
            [descricao, valor, data, categoria_id, tipo, id])
        const { rows } = await pool.query('select * from transacoes where data=$1', [data])
        return res.status(201).json(rows[0])
    } catch (error) {

    }

}
const atualizarTransacao = async (req, res) => {
    const id = obterIdToken(req.headers)
    const transacaoId = req.params.id
    const { descricao, valor, data, categoria_id, tipo } = req.body
    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados." })
    }
    try {
        let { rows, rowCount } = await pool.query('select * from transacoes where id=$1 and usuario_id=$2', [transacaoId, id])
        if (rowCount < 1) {
            return res.status(404).json({ mensagem: 'transação não encontrada.' })
        }
        let { rows: linha, rowCount: numeroDeLinhas } = await pool.query('select * from categorias where id=$1', [categoria_id])
        if (numeroDeLinhas < 1) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' })
        }
        await pool.query('update  transacoes set descricao=$1, valor=$2, data=$3, categoria_id=$4, tipo=$5 ', [descricao, valor, data, categoria_id, tipo])
        return res.status(200).json()
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    listarTransacao,
    deletarTransacao,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao
}