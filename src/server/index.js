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
            'SELECT sfid, name, photourl, phone, website, industry FROM salesforce.Account order by name ASC;',
            (err, data) => {
                if (err) console.log(err);
                accounts = data.rows.map(accRecord => {
                    return {
                        sfid: accRecord.sfid,
                        name: accRecord.name,
                        phone: accRecord.phone,
                        website:
                            String(accRecord.website).substring(0, 4) !== 'http'
                                ? accRecord.website != null &&
                                    accRecord.website !== ''
                                    ? 'http://' + accRecord.website
                                    : ''
                                : accRecord.website,
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
            "SELECT sfid, name, photourl, phone, website, industry FROM salesforce.Account WHERE sfid = '" +
            req.params.id +
            "' LIMIT 1;",
            (err, data) => {
                if (err) console.log(err);
                res.json(data.rows[0]);
            }
        );
    });
    app.get('/chartValueJson', (req, res) => {
        res.json({
            "width": 400,
            "color": "blue",
            "percent": 43,
            "centerLabel": "Available",
            "centerValue": 4,
            "donutWidth": 50,
            "valueSize": 60,
            "labelSize": 40,
            "labelYPos": 50
        });
    })
    app.get('/deleteaccount/:id', (req, res) => {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });
        client.connect();
        client.query(
            "DELETE FROM salesforce.Account WHERE sfid = '" +
            req.params.id +
            "' ;",
            (err, data) => {
                if (err) console.log(err);
                res.json(data);
            }
        );
    });

    app.post('/saveupdate', (req, res) => {
        var query = '';
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: true
        });
        client.connect();
        if (
            req.body.sfid != null &&
            req.body.sfid !== '' &&
            req.body.sfid !== undefined
        ) {
            query = `UPDATE salesforce.Account SET name = '${req.body.name}', website = '${req.body.website}',
                     phone = '${req.body.phone}', industry = '${req.body.industry}' WHERE sfid = '${req.body.sfid}'`;
        } else {
            query = `INSERT INTO salesforce.Account(sfid, name, website, phone, industry) VALUES
                    ('${Math.random() * Math.pow(10, 17)}', '${
                req.body.name
                }', '${req.body.website}', '${req.body.phone}', '${
                req.body.industry
                }');`;
        }
        client.query(query, (err, data) => {
            if (err) console.log(err);
            res.redirect('/');
        });
    });
};
