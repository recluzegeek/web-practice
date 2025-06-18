import express from 'express'
import { createTable, addHabbit, fetchAll, closeDB, updateStatus } from './db.js'

const app = express ();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log("Server Listening on PORT:", PORT);
  await createTable()
  console.log("DB TABLE CREATED!");
});

app.get('/habbits', async (_, res) => {
    const habbits = await fetchAll()
    console.log(habbits);
    return res.json(habbits)
})

app.post('/habbit/create', async (req, res) => {
    console.log(req.body);
    const {name, frequency, status} = req.body
    try {
        await addHabbit(name, frequency, status)
        res.status(200).send('Record ADDED Successfully!')
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }   
})

app.put('/habbit/update', async (req, res) => {
    const {id, status} = req.body
    try {
        await updateStatus(id, status)
        res.status(200).send('Record Updated Successfully!')
    } catch (error) {
        console.log(error);
        res.status(500).send('Unable to Update Record!')
    }
})

const gracefulShutdown = () => {
  console.log('Shutdown signal received, closing database...');
  closeDB();
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
