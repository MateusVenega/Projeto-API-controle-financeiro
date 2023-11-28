const express = require('express')
const { detalharUsuario, atualizarUsuario, cadastrarUsuario, loginUsuario } = require('./controladores/usuarios')
const verificarUsuarioLogado = require('./intermediarios/autenticacao')
const { deletarTransacao, listarTransacao, detalharTransacao, cadastrarTransacao, atualizarTransacao } = require('./controladores/transacoes')
const { listarCategorias } = require('./controladores/categorias')
const rotas = express()


rotas.post('/usuario', cadastrarUsuario)
rotas.post('/login', loginUsuario)
rotas.use(verificarUsuarioLogado)

rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', atualizarUsuario)
rotas.get('/transacao', listarTransacao)
rotas.get('/categoria', listarCategorias)
rotas.get('/transacao/:id', detalharTransacao)
rotas.post('/transacao', cadastrarTransacao)
rotas.delete('/transacao/:id', deletarTransacao)
rotas.put('/transacao/:id', atualizarTransacao)
module.exports = rotas