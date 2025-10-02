// Result from running Paterl analysis on Erlang code
export interface PaterlResult {
  success: boolean;
  output: string;
  error?: string;
}

// Represents an Erlang example file with formatted name and content
export interface ExampleFile {
  name: string;
  content: string;
}

// Service for interacting with Paterl static analysis tool via Docker
export class PaterlService {
  private static readonly BASE_PATH = '/stardust/MailboxerDemo';

  // Executes Paterl commands inside Docker container via backend API
  private static async executeDockerCommand(command: string): Promise<string> {
    try {
      const response = await fetch(`${this.BASE_PATH}/api/execute-paterl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.output;
    } catch (error) {
      throw new Error(`Failed to execute paterl command: ${error}`);
    }
  }

  // Reads Erlang example file from server and formats the name for display
  static async readExampleFile(exampleName: string): Promise<ExampleFile> {
    try {
      console.log('Service: Reading example file:', exampleName);
      const response = await fetch(`${this.BASE_PATH}/api/read-example?file=${exampleName}.erl`);
      
      if (!response.ok) {
        throw new Error(`Failed to read example file: ${response.status}`);
      }

      const result = await response.json();
      console.log('Service: Server response:', result);
      return {
        // Format name: replace underscores with spaces and capitalize words
        name: exampleName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        content: result.content
      };
    } catch (error) {
      throw new Error(`Failed to read example file: ${error}`);
    }
  }

  // Runs Paterl analysis on a predefined example file
  static async runPaterl(exampleName: string): Promise<PaterlResult> {
    try {
      const command = `bash -c "cd /workspace && /home/developer/Development/paterl/src/paterl ${exampleName}.erl -I include"`;
      
      const output = await this.executeDockerCommand(command);     
      
      // Clean ANSI escape sequences and color codes from terminal output
      let cleanedOutput = output.replace(/\u001b\[[0-9;]*m/g, ''); // ANSI escape sequences
      cleanedOutput = cleanedOutput.replace(/\[\d+m/g, ''); // Color codes
      cleanedOutput = cleanedOutput.replace(/\[0m/g, ''); // Reset codes
      cleanedOutput = cleanedOutput.replace(/^\s*\[\s*/gm, '['); // Clean up bracket formatting
      cleanedOutput = cleanedOutput.replace(/\s*\[\s*$/gm, ''); // Remove trailing brackets
      
      // Filter output to show only [WRITE], [PAT], and Error: lines
      const lines = cleanedOutput.split('\n');
      const filteredLines = lines.filter((line: string) => {
        const trimmedLine = line.trim();
        return trimmedLine.startsWith('[WRITE]') || 
               trimmedLine.startsWith('[PAT]') || 
               trimmedLine.match(/^\d+\.\s*Error:/) || // Lines starting with "3. Error:" etc.
               trimmedLine.match(/^stderr:\s*\d+\.\s*Error:/) || // Lines starting with "stderr: 3. Error:" etc.
               trimmedLine.includes('Error:'); // Any line containing "Error:"
      });
      
      const filteredOutput = filteredLines.join('\n').trim();
      
      // Improved error detection: look for actual error patterns, not just the word "error"
      const hasActualError = this.detectActualErrors(output);
      
      return {
        success: !hasActualError,
        output: filteredOutput,
      };
    } catch (error) {
      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Runs user-provided Erlang code through Paterl analysis
  static async runCodeContent(code: string, exampleName: string): Promise<PaterlResult> {
    try {
      const response = await fetch(`${this.BASE_PATH}/api/run-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, exampleName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const output = result.output;
    
      
      // Clean ANSI escape sequences and color codes from terminal output
      let cleanedOutput = output.replace(/\u001b\[[0-9;]*m/g, ''); // ANSI escape sequences
      cleanedOutput = cleanedOutput.replace(/\[\d+m/g, ''); // Color codes
      cleanedOutput = cleanedOutput.replace(/\[0m/g, ''); // Reset codes
      cleanedOutput = cleanedOutput.replace(/^\s*\[\s*/gm, '['); // Clean up bracket formatting
      cleanedOutput = cleanedOutput.replace(/\s*\[\s*$/gm, ''); // Remove trailing brackets
      
      // Filter output to show only [WRITE], [PAT], and Error: lines
      const lines = cleanedOutput.split('\n');
      const filteredLines = lines.filter((line: string) => {
        const trimmedLine = line.trim();
        return trimmedLine.startsWith('[WRITE]') || 
               trimmedLine.startsWith('[PAT]') || 
               trimmedLine.match(/^\d+\.\s*Error:/) || // Lines starting with "3. Error:" etc.
               trimmedLine.match(/^stderr:\s*\d+\.\s*Error:/) || // Lines starting with "stderr: 3. Error:" etc.
               trimmedLine.includes('Error:'); // Any line containing "Error:"
      });
      
      const filteredOutput = filteredLines.join('\n').trim();
      
      // Improved error detection: look for actual error patterns, not just the word "error"
      const hasActualError = this.detectActualErrors(output);
      
      return {
        success: !hasActualError,
        output: filteredOutput,
      };
    } catch (error) {
      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Improved error detection that looks for actual error patterns
  private static detectActualErrors(output: string): boolean {
    const lowerOutput = output.toLowerCase();
    
    // Look for actual error patterns, not just the word "error"
    const errorPatterns = [
      /^\d+\.\s*error:/i,           // Lines starting with "3. Error:"
      /^stderr:\s*\d+\.\s*error:/i, // Lines starting with "stderr: 3. Error:"
      /error:\s*[^\n]+/i,           // "Error: " followed by error description
      /failed\s+to\s+compile/i,     // "Failed to compile"
      /compilation\s+failed/i,      // "Compilation failed"
      /syntax\s+error/i,            // "Syntax error"
      /type\s+error/i,              // "Type error"
      /exception:\s*[^\n]+/i        // "Exception: " followed by exception details
    ];
    
    // Check if any error patterns match
    const hasErrorPattern = errorPatterns.some(pattern => pattern.test(output));
    
    // Also check for specific error indicators in the output
    const hasSpecificErrors = lowerOutput.includes('error:') && 
                             !lowerOutput.includes('no errors') &&
                             !lowerOutput.includes('0 errors') &&
                             !lowerOutput.includes('errors: 0');
    
    return hasErrorPattern || hasSpecificErrors;
  }
}