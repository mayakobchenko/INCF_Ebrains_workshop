
const express = require('express');
const { exec, spawn } = require('child_process');
const app = express();

app.use(express.json());

app.post('/process-data', async (req, res) => {
    const jsonData = JSON.stringify(req.body);
    
    // Execute Python script directly
    const command = `python scripts/domystuff.py -p '${jsonData}'`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).json({ error: 'Python script failed' });
        }
        
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
        }
        
        try {
            const result = JSON.parse(stdout);
            res.json(result);
        } catch (e) {
            res.json({ output: stdout });
        }
    });
});