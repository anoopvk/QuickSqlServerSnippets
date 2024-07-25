import * as vscode from 'vscode';
import * as sql from 'mssql';

interface SQLQueryData {
    connectionString: string;
    query: string;
}
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('quicksqlserversnippets.QuickShowForm', async () => {
        const connectionString = await vscode.window.showInputBox({
            prompt: 'Enter the SQL Server connection string',
            placeHolder: 'Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;'
        });

        if (!connectionString) {
            vscode.window.showErrorMessage('Connection string is required.');
            return;
        }

        const query = await vscode.window.showInputBox({
            prompt: 'Enter the SQL query',
            placeHolder: 'SELECT * FROM myTable;'
        });

        if (!query) {
            vscode.window.showErrorMessage('SQL query is required.');
            return;
        }

        const commandName = await vscode.window.showInputBox({
            prompt: 'Enter a name for this SQL command',
            placeHolder: 'mySQLCommand'
        });

        if (!commandName) {
            vscode.window.showErrorMessage('Command name is required.');
            return;
        }

        const queryData: SQLQueryData = {
            connectionString: connectionString,
            query: query
        };

        context.globalState.update(commandName, queryData);
        vscode.window.showInformationMessage('Query saved successfully');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('quicksqlserversnippets.QuickRunSavedQuery', async () => {
        const commandNames = context.globalState.keys();
        if (commandNames.length === 0) {
            vscode.window.showErrorMessage('No saved queries found');
            return;
        }

        const selectedCommandName = await vscode.window.showQuickPick(commandNames, {
            placeHolder: 'Select a saved SQL command to run'
        });

        if (!selectedCommandName) {
            return;
        }

        const savedQueryData = context.globalState.get<SQLQueryData>(selectedCommandName);
        if (savedQueryData) {
            const { connectionString, query } = savedQueryData;

            try {
                const pool = await sql.connect(connectionString);
                const result = await pool.request().query(query);
                const resultString = JSON.stringify(result.recordset, null, 2);

                const doc = await vscode.workspace.openTextDocument({ content: resultString });
                await vscode.window.showTextDocument(doc);
            } catch (err:any) {
                // (err);
				vscode.window.showErrorMessage(`SQL Error  ${err.message}`);
            }
        } else {
            vscode.window.showErrorMessage('No saved query found');
        }
    }));	
    context.subscriptions.push(vscode.commands.registerCommand('quicksqlserversnippets.QuickDeleteSavedQuery', async () => {
        const commandNames = context.globalState.keys();
        if (commandNames.length === 0) {
            vscode.window.showErrorMessage('No saved queries found');
            return;
        }
    
        const selectedCommandName = await vscode.window.showQuickPick(commandNames, {
            placeHolder: 'Select a saved SQL command to delete'
        });
    
        if (!selectedCommandName) {
            return;
        }
    
        const confirmed = await vscode.window.showQuickPick(['Yes', 'No'], {
            placeHolder: `Are you sure you want to delete the command: ${selectedCommandName}?`
        });
    
        if (confirmed === 'Yes') {
            await context.globalState.update(selectedCommandName, undefined);
            vscode.window.showInformationMessage(`Command ${selectedCommandName} deleted successfully`);
        }
    }));
    
}

export function deactivate() {}
