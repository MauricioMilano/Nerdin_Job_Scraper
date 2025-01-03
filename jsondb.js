const fs = require('fs');

// Salvar JSON em um arquivo
 function saveJSONToFile(filePath, jsonData) {
  try {
    const jsonString = JSON.stringify(jsonData, null, 2); // 2 spaces for indentation
    fs.writeFileSync(filePath, jsonString);
    console.log(`JSON data saved to ${filePath}`);
  } catch (err) {
    console.error(`Error saving JSON to file: ${err}`);
  }
}

 function readJSONFromFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`File ${filePath} does not exist. Creating an empty file.`);
      fs.writeFileSync(filePath, '{}'); // Create an empty JSON file if it doesn't exist
      return {}; //Return an empty object
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading JSON from file: ${err}`);
    return null; // or throw the error, depending on your error handling strategy.
  }
}

module.exports = {
  saveJSONToFile, readJSONFromFile
}