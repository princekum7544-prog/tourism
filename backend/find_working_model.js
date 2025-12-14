const https = require('https');
require("dotenv").config();

const API_KEY = process.env.GEMINI_API_KEY;

const models = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-002",
    "gemini-1.5-pro",
    "gemini-1.5-pro-latest",
    "gemini-1.5-pro-001",
    "gemini-1.5-pro-002",
    "gemini-pro",
    "gemini-1.0-pro",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite-preview-02-05",
    "gemini-2.0-flash-exp",
    "gemini-2.0-pro-exp"
];

const testModel = (model) => {
    return new Promise((resolve) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
        const data = JSON.stringify({
            contents: [{ parts: [{ text: "Hi" }] }]
        });

        const req = https.request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                console.log(`${model}: ${res.statusCode}`);
                if (res.statusCode !== 200) {
                    // console.log(body); // Uncomment to see error details
                }
                resolve({ model, status: res.statusCode });
            });
        });

        req.on('error', (e) => {
            console.log(`${model}: Error ${e.message}`);
            resolve({ model, status: 'error' });
        });

        req.write(data);
        req.end();
    });
};

async function run() {
    console.log("Checking models...");
    for (const model of models) {
        await testModel(model);
    }
}

run();
