import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log(docRef);
  } catch (err) {
    console.log("write to db ", err);
  }
}

export async function deleteFromDB(deletedId, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, deletedId));
  } catch (err) {
    console.log("delete from DB ", err);
  }
}

export async function updateDB(id, data, collectionName) {
  try {
    await setDoc(doc(database, collectionName, id), data, { merge: true });
  } catch (err) {
    console.log("update DB ", err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    //get all the documents in the collection
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapshot) => {
      deleteDoc(doc(database, collectionName, docSnapshot.id));
    });
  } catch (err) {
    console.log("delete all ", err);
  }
}

export async function addDocToSubcollection(data, collectionName, subCollectionName, docId) {
  try {
    const docRef = await addDoc(
      collection(database, collectionName, docId, subCollectionName),
      data
    );
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error("Error adding document: ", err);
  }
}

export async function getDocsFromSubcollection(collectionName, subCollectionName, docId) {
  try {
    const querySnapshot = await getDocs(
      collection(database, collectionName, docId, subCollectionName)
    );
    let documents = [];
    querySnapshot.forEach((docSnapshot) => {
      documents.push({ ...docSnapshot.data(), id: docSnapshot.id });
    });
    return documents;
  } catch (err) {
    console.error("Error getting documents: ", err);
    return [];
  }
}

