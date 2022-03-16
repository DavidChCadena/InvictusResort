const express = require('express')
const cors = require('cors');
const port = 3000
const app = express()
app.use(cors());
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
  const value = req.body[0]["name"]
  res.send(value)
})

app.get('/clientes', (req, res) => {
  pool.query('SELECT * FROM clientes', (error, results) => {
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

//Encriptar contraseñas (cadenaAEnctriptar, nRecorridos)
/*bcrypt.hash("barbara", 10, (err, palabraSecretaEncriptada) => {
	if (err) {
		console.log("Error hasheando:", err);
	} else {
		console.log("Y hasheada es: " + palabraSecretaEncriptada);
	}
});*/


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
