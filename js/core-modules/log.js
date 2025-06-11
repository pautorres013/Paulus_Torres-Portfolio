
// Description: This module is responsible for logging viewer data.
export class logData {
    viewer_id = "";
    
    
    init(){
        this.logViewerID();
    }
    async logViewerID(){
        
        const response = await fetch("./json/core-db/viewer_db.json"); // Fetch JSON
        const getdata = await response.json(); // Convert to JavaScript object
        
        //generate new ID for new viewer
        viewer_id = "viewer"+(Object.keys(data).length);
        
        fs.readFile('viewer_db.json', 'utf8', (err, data) => {
            // Write the updated data back to the file
            fs.writeFile('viewer_db.json', JSON.stringify(this.viewer_id), 'utf8', (err) => {
              if (err) {
                console.error('Error writing to the file:', err);
                return;
              }
              console.log('Data successfully saved!');
            });
          });
        

    }
}
