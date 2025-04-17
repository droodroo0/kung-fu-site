import { DataSource } from "typeorm"
import { User } from "./domain/user/entities/user.entity"
import { CreateUserTable1700000000000 } from "./migrations/1700000000000-CreateUserTable"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "kungfu_db",
    synchronize: false,
    logging: true,
    entities: [User],
    migrations: [CreateUserTable1700000000000],
    subscribers: [],
})

// Initialize the data source
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    }) 