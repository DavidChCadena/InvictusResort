const express = require('express')
const port = 3000
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors())

const bcrypt = require("bcryptjs")
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'invictus_resort_database',
  password: 'david2021',
  port: 5432,
})

app.get('/', (req,res) =>{
  res.json({name:'David', age:'22'})
})

app.post('/', jsonParser,(req, res) =>{
  const value = req.body[0]["id_hotel"]
  const hab = req.body[0]["habitaciones"]  
  hab.forEach(element => console.log(element["id"]))
  res.send(value)
})

app.get('/clientes', (req, res) => {
  pool.query('SELECT id, nombre as name FROM clientes', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)    
  })
})

app.post('/login',jsonParser,(req, res) =>{
    const id = req.body[0]["user"]     
    const pass = req.body[0]["password"]  
    pool.query('SELECT id worker, contrasenia pass, upper(telefono) car \
                FROM trabajadores \
                WHERE id = $1',[id] ,(error, results) => {
        if (error) throw error        
        if(results.rows.length == 0) {
            res.send("0")
        }else{
          if (pass == results.rows[0]["pass"]){
            if(results.rows[0]["car"] == 'ADMINISTRADOR'){
              res.send("200")
            }else if (results.rows[0]["car"] == 'RECEPCIONISTA'){
              res.send("201")
            }            
          }else{
            res.send("1")
          }            
        }
      })
})

app.post('/register',jsonParser,(req, res) =>{
  const name = req.body[0]["name"]
  const sname = req.body[0]["lastname"]
  const id = req.body[0]["id"]
  const phone = req.body[0]["phone"]
  pool.query("select id         \
              from clientes     \
              where id = $1",[id],(error, results) => {
    if (error) throw error        
    if(results.rows.length != 0) {
      console.log("Error")
      res.send("1")        
    }else{      
      const fullname = name + ' ' + sname
      pool.query("insert into clientes(id, nombre, telefono)  \
                  values ($1, upper($2), $3)", [id, fullname, phone], (error, results)=>{
                    if (error) throw error
                    console.log(results)
                    res.send("0")
                  })
    }    
  })
})

app.get('/rooms',jsonParser,(req, res) =>{
    pool.query("select hb.id as IdHabitacion, ht.nombre,   \
              estado as disponibilidad, tipo as tipoHabitacion, valor as precio \
              from habitaciones hb, hoteles ht             \
              where ht.id = hb.id_hotel", (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)    
  })
})

app.get('/reserveList', jsonParser, (req,res) =>{
  pool.query("select r.id as idreserva, nombre as titular \
  from clientes c, reservas r           \
  where r.id_cliente = c.id", (error, results) =>{
    if (error) {
      throw error
    }
    res.status(200).json(results.rows) 
  })
})

app.post('/reservation', jsonParser, (req,res) =>{
  console.log(req.body)
  const id_cliente = req.body[0]["id"]
  const id_trabajador = req.body[0]["id_trabajador"]
  const fecha_inicio = req.body[0]["checkIn"]
  const fecha_fin = req.body[0]["checkOut"]
  const id_habitacion = req.body[0]["idRoom"]

  pool.query("insert into reservas(fecha_inicio, fecha_fin, id_cliente, id_trabajador) \
              values($1, $2, $3, 1036219263)", [fecha_inicio, fecha_fin, id_cliente], (error, results) => {
                if (error) throw error
                    console.log(results)                    
              })
  res.send("Almacenada")                  
  })

app.post('/delReserve',jsonParser,(req, res) =>{
  const id = req.body[0]["idReserve"]
    
  pool.query("delete from reservas where id = $1",[id],(error, results) => {
    if (error) throw error
    console.log(results) 
  })
  res.send("Eliminada")
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
