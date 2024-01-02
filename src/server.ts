import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(
        `Assinment 4 Server is running on Port = ${`http://localhost:${config.port}`}`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();
