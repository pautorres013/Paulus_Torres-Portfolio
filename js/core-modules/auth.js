export async function authID() {
    try {
        const response = await fetch("./json/core-db/viewer_db.json"); // Fetch JSON
        const data = await response.json(); // Convert to JavaScript object

        // Extract a specific viewer's ID (e.g., "viewer0")
        const viewerID = data["viewer" + (Object.keys(data).length -1)]; 
        
        return viewerID;
    } catch (error) {
        console.error("Error fetching viewer ID:", error);
    }
}