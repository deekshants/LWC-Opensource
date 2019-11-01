/* eslint-disable no-unused-vars */
const { Client } = require('pg');
require('dotenv').config();
module.exports = app => {
    // put your express app logic here
    app.get('/accounts', (req, res) => {
        var accounts = [];
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });

        client.connect();

        client.query(
            'SELECT sfid, name, photourl, phone, website, industry FROM salesforce.Account;',
            (err, data) => {
                if (err) console.log(err);
                accounts = data.rows.map(accRecord => {
                    return {
                        id: accRecord.sfid,
                        name: accRecord.name,
                        phone: accRecord.phone,
                        website: accRecord.website,
                        industry: accRecord.industry,
                        photourl: accRecord.photourl
                    };
                });
                console.log(JSON.stringify(accounts));
                res.json(accounts);
                client.end();
            }
        );
    });
};
