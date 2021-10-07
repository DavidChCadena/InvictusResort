const express = require('express')
const port = 3000
const app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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
  pool.query('SELECT id, nombre FROM clientes', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)    
  })
})

app.post('/login',jsonParser,(req, res) =>{
    const id = req.body[0]["id_trabajador"]     
    const pass = req.body[0]["contrasenia"]  
    pool.query('SELECT id_trabajador worker, contrasenia_trabajador pass, cargo_trabajador charge\
                FROM trabajadores \
                WHERE id_trabajador = $1',[id] ,(error, results) => {
        if (error) throw error        
        if(results.rows.length == 0) {
            res.send("Error de usuario")
        }else{
            bcrypt.compare(pass, results.rows[0]["pass"], (err, coinciden) => {
                if (err) {
                    console.log("--Error comprobando:", err);
                } else {                    
                    if(coinciden){
                        console.log("--Ha iniciado sesión: " + id);
                        res.send("Bienvenido")
                    } else {
                        res.send("Error contraseña")
                    }
                }
            });
        }
      })
})

app.post('/register',jsonParser,(req, res) =>{
  const name = req.body[0]["name"]
  const sname = req.body[0]["secondName"]
  const id = req.body[0]["id"]
  const phone = req.body[0]["phone"]
  pool.query("select id         \
              from clientes     \
              where id = $1",[id],(error, results) => {
    if (error) throw error        
    if(results.rows.length != 0) {
      res.send("Id ya existe")        
    }else{      
      const fullname = name + ' ' + sname
      pool.query("insert into clientes(id, nombre, telefono)  \
                  values ($1, upper($2), $3)", [id, fullname, phone], (error, results)=>{
                    if (error) throw error
                    console.log(results)
                    res.send("Usuario añadido")
                  })
    }    
  })
})

app.post('/rooms',jsonParser,(req, res) =>{
  const id_hotel = req.body[0]["id_hotel"]
  pool.query("select hb.id, ht.nombre, estado, tipo, valor \
              from habitaciones hb, hoteles ht             \
              where ht.id = hb.id_hotel                    \
              and ht.id = $1",[id_hotel], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)    
  })
})

app.post('/reservation', jsonParser, (req,res) =>{
  const id_hotel = req.body[0]["id_hotel"]  
  const id_cliente = req.body[0]["id_cliente"]
  const id_trabajador = req.body[0]["id_trabajador"]
  const fecha_inicio = req.body[0]["fecha_inicio"]
  const fecha_fin = req.body[0]["fecha_fin"]
  const id_habitacion = req.body[0]["id_habitacion"]
  const comodidades = req.body[0]["comodidades"]

})

//Encriptar contraseñas (cadenaAEnctriptar, nRecorridos)
/*bcrypt.hash("barbara", 10, (err, palabraSecretaEncriptada) => {
	if (err) {
		console.log("Error hasheando:", err);
	} else {
		console.log("Y hasheada es: " + palabraSecretaEncriptada);
	}
});*/


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
