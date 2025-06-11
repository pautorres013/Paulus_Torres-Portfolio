import { fire_db } from "./firebase_config.js"; // ✅ Import Firestore directly
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  doc,
  query,
  orderBy,
  limit,
  getDoc,
  Timestamp,
} from "firebase/firestore";

// Generic Firestore operations
export async function addData(collectionName, data) {
  try {
    const dataRef = await addDoc(collection(fire_db, collectionName), data);
    console.log("Document written with ID:", dataRef.id);
    return dataRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    return null;
  }
}

export async function updateData(collectionName, dataId, updates) {
  try {
    const dataRef = doc(fire_db, collectionName, dataId);
    await updateDoc(dataRef, updates);
    console.log("Document updated successfully.");
  } catch (e) {
    console.error("Error updating document:", e);
  }
}

export async function deleteData(collectionName, dataId) {
  try {
    const dataRef = doc(fire_db, collectionName, dataId);
    await deleteDoc(dataRef);
    console.log("Document deleted successfully.");
  } catch (e) {
    console.error("Error deleting document:", e);
  }
}

// Viewer-specific logic
let viewerID = "";

export async function verifyViewer(isIndex) {
  if (isIndex) {
    viewerID = await registerViewer();
  } else {
    viewerID = await fetchLatestViewerID();
  }
  return viewerID;
}

export function getViewerID() {
  return viewerID;
}

async function fetchLatestViewerID() {
  try {
    const viewerQuery = query(
      collection(fire_db, "viewer"), 
      orderBy("timestamp", "desc"), 
      limit(1)
    );
    const snapshot = await getDocs(viewerQuery);
    
    if (!snapshot.empty) {
      const latestViewer = snapshot.docs[0].id;
      console.log("Latest Viewer ID:", latestViewer);
      return latestViewer;
    }
    return null;
  } catch (error) {
    console.error("Error fetching latest viewer ID:", error);
    return null;
  }
}

async function registerViewer() {
  const data = { timestamp: Timestamp.now() };
  const docID = await addData("viewer", data);
  console.log("Registered Viewer with Firebase ID:", docID);
  return docID;
}


export async function getViewerData(viewerID) {
  const docRef = doc(fire_db, "viewer", viewerID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No viewer data found!");
    return null;
  }
}