'use strict';

const { MongoClient } = require('mongodb');

async function main() {


    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        await updateListingByName(client, 'world', 'city', 'Mersin', {Population: 1790000});


    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function updateListingByName(client, db, collection, city, updatedListing) {
    const found = await client.db(db).collection(collection).findOne({ Name: city });

    if(found) {
        const result = await client.db(db).collection(collection).updateOne({ Name: city }, { $set: updatedListing });

        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    } else {
        console.log(`City by the name ${city} not found.`)
    }
    
}
