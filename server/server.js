const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Check if the Paterl Docker container is currently running
function checkPaterlContainer() {
  return new Promise((resolve) => {
    exec('docker ps --filter "name=paterl" --format "{{.Status}}"', (error, stdout) => {
      if (error || !stdout.trim()) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

// Setup middleware and static file serving
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Execute Paterl commands inside the Docker container
app.post('/api/execute-paterl', async (req, res) => {
  try {
    const { command } = req.body;
    
    if (!command) {
      return res.status(400).json({ error: 'Command is required' });
    }

    // Verify container is running before executing commands
    const paterlRunning = await checkPaterlContainer();
    if (!paterlRunning) {
      console.error('Paterl container is not running');
      return res.status(500).json({ 
        error: 'Paterl container is not running',
        details: 'Please ensure the paterl container is started',
        command: command
      });
    }

    // Build Docker exec command with 30 second timeout
    const dockerCommand = `docker exec paterl ${command}`;
    
    exec(dockerCommand, { timeout: 30000 }, (error, stdout, stderr) => {
      if (error) {
        console.error('Execution error:', error);
        console.error('Error code:', error.code);
        console.error('Error signal:', error.signal);
        console.error('stdout:', stdout);
        console.error('stderr:', stderr);
        
        return res.status(500).json({ 
          error: 'Failed to execute command',
          details: error.message,
          stderr: stderr || '',
          command: dockerCommand,
          errorCode: error.code,
          errorSignal: error.signal
        });
      }
      
      res.json({ 
        output: (stdout || '') + (stderr || ''),
        success: true,
        command: dockerCommand
      });
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Run user-provided Erlang code through Paterl analysis
app.post('/api/run-code', async (req, res) => {
  try {
    const { code, exampleName } = req.body;
    
    if (!code || !exampleName) {
      return res.status(400).json({ error: 'Code and exampleName are required' });
    }

    // Verify container is running before processing code
    const paterlRunning = await checkPaterlContainer();
    if (!paterlRunning) {
      console.error('Paterl container is not running');
      return res.status(500).json({ 
        error: 'Paterl container is not running',
        details: 'Please ensure the paterl container is started'
      });
    }

    // Create unique temporary file for user's code
    const tempFileName = `user_${exampleName}_${Date.now()}.erl`;
    const tempFilePath = path.join(__dirname, '..', 'examples', tempFileName);
    
    try {
      // Write user code to temp file for Paterl analysis
      fs.writeFileSync(tempFilePath, code, 'utf8');
      
             // Run Paterl on the temporary file with include path
       const dockerCommand = `docker exec paterl bash -c "cd /workspace && /home/developer/Development/paterl/src/paterl ${tempFileName} -I include"`;
       
       exec(dockerCommand, { timeout: 30000 }, (error, stdout, stderr) => {
        // Clean up the temporary file
        try {
          fs.unlinkSync(tempFilePath);
        } catch (cleanupError) {
          console.error('Failed to cleanup temp file:', cleanupError);
        }
        
                 if (error) {
           console.error('Execution error:', error);
           return res.status(500).json({ 
             error: 'Failed to execute command',
             details: error.message,
             stderr: stderr || '',
             command: dockerCommand
           });
         }
         
         res.json({ 
           output: (stdout || '') + (stderr || ''),
           success: true,
           command: dockerCommand
         });
      });

    } catch (fileError) {
      // Clean up on file error
      try {
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
      } catch (cleanupError) {
        console.error('Failed to cleanup temp file:', cleanupError);
      }
      throw fileError;
    }

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// Read Erlang example files from the examples directory
app.get('/api/read-example', (req, res) => {
  try {
    const { file } = req.query;
    
    if (!file) {
      return res.status(400).json({ error: 'File parameter is required' });
    }

    // Build path to examples directory
    const examplesPath = path.join(__dirname, '..', 'examples', file);
    
    // Security check: ensure file is within examples directory
    if (!fs.existsSync(examplesPath) || !examplesPath.startsWith(path.join(__dirname, '..', 'examples'))) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Read the file content
    const content = fs.readFileSync(examplesPath, 'utf8');
    
    res.json({ 
      content: content
    });

  } catch (error) {
    console.error('Error reading example file:', error);
    res.status(500).json({ 
      error: 'Failed to read example file',
      details: error.message 
    });
  }
});

// Health check for monitoring and debugging
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve React app for SPA routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Catch-all route for client-side routing (SPA fallback)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});
