# QuickSqlServerSnippets

**QuickSqlServerSnippets** is a Visual Studio Code extension that simplifies the process of managing and executing SQL queries on SQL Server databases directly from the editor.

## Features

- **Quick Show Form:** Prompt the user to enter a SQL Server connection string, SQL query, and a name for the SQL command. Save these details for later use.
- **Quick Run Saved Query:** Run a previously saved SQL query and display the results in a new editor window.
- **Quick Delete Saved Query:** Delete a previously saved SQL query.

## Requirements

<!-- - Visual Studio Code version 1.91.0 or higher.
- Node.js and npm installed. -->
- SQL Server instance accessible with valid credentials.

## Installation

1. Install the extension from the VSCode Marketplace.
2. Reload or restart Visual Studio Code.

## Usage

### 1. Quick Show Form

1. Open the Command Palette (Ctrl+Shift+P).
2. Type `QSSS: Quick Show Form` and press Enter.
3. Enter the SQL Server connection string, SQL query, and a name for the SQL command when prompted.
4. The query will be saved for later use.

### 2. Quick Run Saved Query

1. Open the Command Palette (Ctrl+Shift+P).
2. Type `QSSS: Quick Run Saved Query` and press Enter.
3. Select a saved SQL command from the list.
4. The query will be executed, and the results will be displayed in a new editor window.

### 3. Quick Delete Saved Query

1. Open the Command Palette (Ctrl+Shift+P).
2. Type `QSSS: Quick Delete Saved Query` and press Enter.
3. Select a saved SQL command from the list.
4. Confirm the deletion. The selected query will be deleted.

## Notes

- **Windows Authentication:** This extension does not support Windows Authentication at the moment (Under development). Please use SQL Server Authentication.
- **TCP Connection:** If you encounter issues, try enabling TCP connections in SQL Server Configuration Manager.

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Open a pull request.

## Issues

If you encounter any issues or have suggestions for improvements, please open an issue on the GitHub repository.

## License

This extension is licensed under the MIT License.

## Acknowledgements

This extension uses the following libraries:
- [mssql](https://www.npmjs.com/package/mssql)
- [msnodesqlv8](https://www.npmjs.com/package/msnodesqlv8)

---
## Development

To set up a development environment:

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Use `npm run watch` to start the TypeScript compiler in watch mode.
4. Press `F5` to start debugging the extension.
