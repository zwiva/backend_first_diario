const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Railway y Vercel necesitan este ajuste para conexiones SSL
  },
});

app.get('/', async (req, res) => {
  res.send('Hola mundo')
});

app.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Base de datos conectada: ${result.rows[0].now}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

app.listen(port, () => {
 console.log(`Servidor ejecutándose en el puerto ${port}`);
});

module.exports = app;