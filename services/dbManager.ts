import {
  collection,
  db,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "@/firebaseConfig";
import { CollectionsType } from "@/utils/constants";

class DBManager {
  public static getAllDocumentsFromCollection = async (
    collectionName: CollectionsType
  ) => {
    try {
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);
      const documents: any = [];
      querySnapshot.forEach((doc: any) => {
        documents.push(doc.data());
      });
      return documents;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public static storeDataInDatabase = async (
    data: any,
    collectionName: CollectionsType,
    documentId: string
  ) => {
    try {
      await setDoc(doc(db, collectionName, documentId), data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  public static deleteDocFromDatabase = async (
    collectionName: CollectionsType,
    documentId: string
  ) => {
    try {
      await deleteDoc(doc(db, collectionName, documentId));
      console.log(`Document with ID ${documentId} deleted successfully`);
      return true;
    } catch (error) {
      console.error("Error deleting document:", error);
      return false;
    }
  };

  public static getDocumentFromDatabase = async (
    collectionName: CollectionsType,
    documentId: string,
    filters: any = null
  ) => {
    try {
      if (filters === null) {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          return null;
        }
      } else {
        const collectionRef = collection(db, collectionName);

        // Apply multiple filters if provided
        let queryRef = collectionRef;
        filters.forEach((filter: any) => {
          queryRef = query(queryRef, where(...filter));
        });

        const querySnapshot = await getDocs(queryRef);

        if (!querySnapshot.empty) {
          return querySnapshot.docs.map((doc: any) => doc.data());
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}

export default DBManager;
