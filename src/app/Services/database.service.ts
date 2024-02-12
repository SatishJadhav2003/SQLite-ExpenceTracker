import { Injectable } from '@angular/core';
import {
  SQLiteConnection,
  CapacitorSQLite,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Table } from '../shared/table';

const DB_Name = 'expencetracker';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  constructor() {}
  async initializePlugin() {
    try {
        // Establish connection with SQLite
        this.db = await this.sqlite.createConnection(
            DB_Name,
            false,
            'no-encryption',
            1,
            false
        );

        // Open SQLite database
        await this.db.open();

        console.log("SQLite connection opened successfully");
    } catch (error) {
        console.error("Error initializing SQLite plugin:", error);
        throw error; // Rethrow the error to handle it at a higher level
    }
}

  // async creatTable(name: string, columns: Table[]) {
  //   let query = `CREATE TABLE IF NOT EXIST ${name}(`;
  //   for (let i = 0; i < columns.length; i++) {
  //     query = query + ' ' + columns[i].colName + ' ' + columns[i].colType;
  //     if (columns[i].isPrimaryKey) {
  //       query = query + ' PRIMARY KEY AUTOINCREMENT ';
  //     }
  //     if (columns[i].notNull) {
  //       query = query + ' NOT NULL';
  //     }
  //     if (columns[i].isDefault) {
  //       query = query + ' DEFAULT ' + columns[i].defaultValue;
  //     }
  //     if (i !== columns.length-1) {
  //       query = query + ',';
  //     }
  //   }
  //   query = query + ');';
  //   console.log(query);
  //    const result =  await this.db.execute(query).catch((err)=>{
  //     alert(err);
  //     console.log(err)
  //    });
  //    console.log("+++++++++++++++++++++++++++++++++++++++++")
  //    console.log(result)
  //    return result;
  // }

  async createTable(name: string, columns: Table[]) {
    let query = `CREATE TABLE IF NOT EXISTS ${name} (`;

    for (let i = 0; i < columns.length; i++) {
        query += `${columns[i].colName} ${columns[i].colType}`;

        if (columns[i].isPrimaryKey) {
            query += ' PRIMARY KEY AUTOINCREMENT';
        }

        if (columns[i].notNull) {
            query += ' NOT NULL';
        }

        if (columns[i].isDefault && columns[i].defaultValue) {
            query += ` DEFAULT ${columns[i].defaultValue}`;
        }

        if (i !== columns.length - 1) {
            query += ', ';
        }
    }

    query += ');';
    console.log(query);

    try {
        const result = await this.db.execute(query);
        console.log("Table created successfully");
        return result;
    } catch (error) {
        console.error("Error creating table:", error);
        throw error;
    }
}

}
