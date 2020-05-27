const {Parser} = require('json2csv');
const path = require('path')
const fs = require('fs')
const Airtable = require('airtable')

require('dotenv').config()
const API_KEY = process.env.AIRTABLE_API_KEY
const BASE = process.env.AIRTABLE_BASE_ID
const TABLE_NAME = "what's open north brooklyn"
const outputPath = './data/rows.csv'

const json2csvParser = new Parser()

function getAllRecords(base, tableName) {
    return new Promise((resolve, reject) => {
        let records = [];
        base(tableName)
            .select()
            .eachPage(
                (partialRecords, fetchNextPage) => {
                    records = [...records, ...partialRecords];
                    fetchNextPage();
                },
                err => {
                    if (err) {
                        reject(err);
                    }
                    resolve(records);
                }
            )
    })
}

function setupDirectory(dir) {
    // Create the folder data if it doens't exist
    if (!fs.existsSync(dir)) {
        try {
            fs.mkdirSync(dir);
            console.log(' \tCreated ' + dir)
        } catch (e) {
            throw error
        }
    } else {
        console.log(' \tdata dir already exists, skipping creation')
    }
}

async function main() {
    const directory = __dirname + '/data';
    console.log(' :: Setting up directory structure')
    setupDirectory(directory)

    console.log(` :: Getting rows from ${TABLE_NAME}`)
    const base = new Airtable({
        apiKey: API_KEY
    }).base(BASE)
    const records = await getAllRecords(base, TABLE_NAME)
    const rows = records.map(row => row.fields).map(row => {
        let nRow = {}
        Object.entries(row).forEach(([key, value]) => {
            //flatten array fields
            if(Array.isArray(value)){
               nRow[key] = value.join(',')
            }else{
                nRow[key] = value
            }
        })
        return nRow
    }).sort((a, b) => a.id - b.id)

    console.log(' :: Updating data files')
    const csv = json2csvParser.parse(rows);
    await fs.writeFileSync(path.join(directory, 'rows.csv'), csv , 'utf8');

}

main()