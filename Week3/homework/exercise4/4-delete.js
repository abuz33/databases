'use strict';

const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017";

    const client = new MongoClient(uri);

    try {
        
        await client.connect();

        await deleteListingByName(client, "world", "city", "Mersin");
        
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function deleteListingByName(client, db, collection, city) {
    const found = await client.db(db).collection(collection).findOne({ Name: city });
    if(found) {
        const result = await client.db(db).collection(collection).deleteOne({ Name: city });
        console.log(`${result.deletedCount} document(s) was/were deleted.`);
    } else {
        console.log(`City by the name ${city} not found.`);
    }
    
}