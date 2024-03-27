import { theWordDatabase } from "../../../infra/database/typeorm/data-source";

export const setupDatabase = () =>
    theWordDatabase
        .initialize()
        .then((conn : any) =>
            console.log(`Connected on database: ${conn.driver.database}`)
        );