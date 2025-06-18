import sqlite3 from "sqlite3";
import { execute } from "./sql.js";

const DB_FILE = 'habbit-tracker.db'
const db = new sqlite3.Database(DB_FILE);

const createTable = async () => {
  try {
    await execute(
      db,
      `CREATE TABLE IF NOT EXISTS habbits (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        frequency STRING NOT NULL,
        status STRING NOT NULL)` // status and frequency could have been enumerable like limited options to choose from 
    );
  } catch (error) {
    console.log(error);
  } finally {
    // db.close();
  }
};

// createTable();

const addHabbit = async (name, frequency, status = 'PENDING') => {
  try {
    const sql = `INSERT INTO habbits(name, frequency, status) VALUES(?, ?, ?)`;
    await execute.insert(db, sql, [name, frequency, status])
    console.log('Succesfuly added the habbit record!');
  } catch (err) {
    console.log(err);
  } finally {
    // db.close();
  }
}

// addHabbit('reddit', 'daily')

const fetchAll = async () => {
  try {
    const sql = `SELECT * FROM habbits`
    const habbits = await execute.fetchAll(db, sql)
    // console.log(habbits);
    return habbits
  } catch (error) {
    console.log(error);
  } finally {
    // db.close()
  }
}

// fetchAll()

const updateStatus = async (id, status) => {
  try {
    const sql = `UPDATE habbits SET status = ? where id =?`
    await execute.update(db, sql, [status, id])
  } catch (error) {
    console.error(error)
  } finally {
    // db.close()
  }
}

// createTable()
// addHabbit('reddit', 'daily')
// addHabbit('cricket', 'weekly')
// addHabbit('twitter', 'daily')
// addHabbit('substack', 'biweekly')
// fetchAll()
// updateHabbitStatus(1, 'COMPLETE')
// fetchAll()

const closeDB = () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing DB:', err);
    } else {
      console.log('Database connection closed.');
    }
  });
};

export {createTable, addHabbit, fetchAll, updateStatus, closeDB}