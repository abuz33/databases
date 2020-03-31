'use strict';

const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017" ;  

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await findListingByName(client, "world", "city", "Mersin");
        await findListingByCountryCode(client, "world", "city", "TR");
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function findListingByName(client, db, collection, city) {
    const result = await client.db(db).collection(collection).findOne({ Name: city });

    if (result) {
        console.log(`Found a listing in the collection with the name '${city}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${city}'`);
    }
}

async function findListingByCountryCode(client, db, collection, code) {
    const result = await client.db(db).collection(collection).findOne({ CountryCode: code });

    if (result) {
        console.log(`Found a listing in the collection with the country code '${code}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the country code '${code}'`);
    }
}