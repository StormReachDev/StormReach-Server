// Imports:
import mongoose from 'mongoose';
import ErrorHandler from './errorHandler.js';

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    }
    try {
      this.connection = await mongoose.connect(process.env.DATABASE_URL);
      console.log(
        `✅ MongoDB connected successfully → Host: ${this.connection.connection.host}`,
      );
      return this.connection;
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB →', error.message);
      new ErrorHandler(error.message, 500);
      process.exit(1);
    }
  }
}

const initializeDatabase = new Database();
export default initializeDatabase;
