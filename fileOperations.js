const fs = require('fs');

// Read a file
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    console.log('File content:', data);
});

// Write a file
const FileWrite = (filename, content) => {
    fs.writeFile(filename, content, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
            return;
        }
        console.log('Content successfully written to ${filename}.');
    });
}

//Delete a file
const deleteFile = (filename) => {
    fs.unlink(filename, (err) => {
        if (err) {
            console.error('Error deleting the file;', err);
            return;
        }
        console.log('Successfully deleted ${filename}.');
    });
}
