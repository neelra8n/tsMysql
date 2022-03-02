import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Catalog } from './entity/Catalog';
import {CatalogTimeStamp} from './entity/CatalogTimeStamp'


//create connection to database
createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: 'neel',
    database: 'typeorm',
    
    entities: [
        __dirname + "/entity/*.{ts,js}"
    ],
    synchronize: true,
    logging: false
 }).then(async connection => {
    
  let catalog = new Catalog();
  catalog.journal = "Oracle Magazine";
  catalog.publisher = "Oracle Publishing";
  catalog.edition = "March-April 2005";
  catalog.title = "Starting with Oracle ADF";
  catalog.author = "Steve Muench";
  catalog.isPublished = true;

  let timestamp = new CatalogTimeStamp();
  timestamp.firstAdded = "Apr-8-2014-7:06:16-PM-PDT";
  timestamp.firstUpdated = "Apr-8-2014-7:06:20-PM-PDT";
  timestamp.lastUpdated = "Apr-8-2014-7:06:20-PM-PDT";
  timestamp.catalog = catalog;

  let timestampRepo = connection.getRepository(CatalogTimeStamp);
  await timestampRepo.save(timestamp);

  let catalogRepository = connection.getRepository(Catalog);
    await catalogRepository.save(catalog);
  

 }).catch(err => console.log(`error while creating connection ${err}`));
