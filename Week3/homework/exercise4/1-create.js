'use strict';

const {MongoClient} = require('mongodb');

async function main(){

    const uri = "mongodb://localhost:27017" ;  

    const client = new MongoClient(uri);

    try {
        await client.connect();
        await createListing(client, "world", "city", 
            {
                Name: "Mersin",
                CountryCode: "TR",
                District: 3,
                Population: 1700000
            }
        );
    } finally {
        await client.close();
    }
}

main().catch(console.error);

// Created function to add collection to custom db and custom collection. 
async function createListing(client, db, collection, city){
    const result = await client.db(db).collection(collection).insertOne(city);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}