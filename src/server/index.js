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
                        website: (String(accRecord.website).substring(0, 4) !== 'http') ? ((accRecord.website != null)
                            ? 'http://' + accRecord.website : '') : accRecord.website,
                        industry: accRecord.industry,
                        photourl: accRecord.photourl
                    };
                });
                res.json(accounts);
                client.end();
            }
        );
    });

    app.get('/getaccountforedit/:id', (req, res) => {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });
        client.connect();
        client.query(
            'SELECT sfid, name, photourl, phone, website, industry FROM salesforce.Account WHERE sfid = \'' + req.params.id + '\' LIMIT 1;',
            (err, data) => {
                if (err) console.log(err);
                res.json(data.rows[0]);
            }
        )
        
    });

    app.get('/deleteaccount/:id', (req, res) => {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });
        client.connect();
        client.query(
            'DELETE FROM salesforce.Account WHERE sfid = \''+req.params.id+'\' ;',
            (err, data) => {
                if (err) console.log(err);
                res.json(data);
            }
        )
    })
};
