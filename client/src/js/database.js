import { openDB } from "idb";

const initdb = async () =>
  // We are creating a new database named 'jate' which will be using version 1 of the database.
  openDB("jate", 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created 🖖");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the jate database');
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, text:content });
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (e) => {
  console.log('PUT to the jate database');
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
