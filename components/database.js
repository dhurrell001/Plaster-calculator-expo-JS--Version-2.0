import * as SQLite from "expo-sqlite";

// Open the database asynchronously
const dbPromise = SQLite.openDatabaseAsync("PlasterDatabase.db");

// Function to create the table and insert initial data if necessary
export const setupDatabase = async () => {
  try {
    // Open the database

    const db = await dbPromise;
    console.log("Database opened successfully: PlasterDatabase.db");
    // await db.execAsync("DROP TABLE IF EXISTS plasters;");
    // await db.execAsync("DROP TABLE IF EXISTS plasters;");

    // Create table if it doesn't exist
    console.log("Creating 'plasters' table if not exists...");
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS plasters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        plasterName TEXT,
        coveragePerMMperSQM FLOAT,
        bagSize INTEGER,
        plasterType TEXT,
        tdsFileName TEXT,
        isFavourite INTEGER DEFAULT 0
      );`
    );
    console.log("'plasters' table creation or verification complete.");

    // Check if records already exist, and insert initial data if none
    const result = await db.getFirstAsync(
      "SELECT COUNT(*) AS count FROM plasters;"
    );
    console.log(`db length ${result.length}`);
    if (result.count === 0) {
      console.log("No records found, inserting initial plaster data...");
      await db.execAsync(
        `INSERT INTO plasters (plasterName, coveragePerMMperSQM, bagSize, plasterType, tdsFileName, isFavourite)
        VALUES 
         ('British Gypsum Multi-Finish', 1.25, 25, 'INTERNAL','MultiFinishTDS.pdf', 0),
        ('British Gypsum Board Finish', 1.25, 25, 'INTERNAL','BoardFinishTDS.pdf', 0),
        ('British Gypsum Hardwall', 0.76, 25, 'INTERNAL','British-Gypsum-PDS-Thistle-HardWall.pdf', 0),
        ('British Gypsum Bonding', 1.21, 25, 'INTERNAL','British-Gypsum-PDS-Thistle-BondingCoat.pdf', 0),
        ('British Gypsum Pure Finish', 1.25, 25, 'INTERNAL', NULL, 0),
        ('British Gypsum One Coat', 0.85, 25, 'INTERNAL', NULL, 0),
        ('Thistle DriCoat', 0.70, 25, 'INTERNAL', NULL, 0),
        ('ThistlePro Fastset', 1.25, 25, 'INTERNAL', NULL, 0),
        ('K-Rend Silicone K1', 1.6, 25, 'EXTERNAL', NULL, 0),
        ('k-Rend HP12 Base', 1.8, 25, 'EXTERNAL', NULL, 0),
        ('K-Rend Silicone TC10', 1.8, 25, 'EXTERNAL', NULL, 0),
        ('K-Rend Silicone TC15', 2.5, 25, 'EXTERNAL', NULL, 0),
        ('K-Rend Silicone TC30', 5, 25, 'EXTERNAL', NULL, 0),
        ('Weberpral M', 1.66, 25, 'EXTERNAL', NULL, 0),
        ('Weberpral MF', 2.07, 25, 'EXTERNAL', NULL, 0),
        ('Webrend Onecoat Dash', 1.56, 25, 'EXTERNAL', NULL, 0),
        ('Webrend OCR', 1.79, 25, 'EXTERNAL', NULL, 0),
        ('Webrend LAC', 6.5, 20, 'EXTERNAL', NULL, 0),
        ('Webersil TF', 2.72, 15, 'EXTERNAL', NULL, 0),
        ('Weber Cullamix Tyrolean', 1, 25, 'EXTERNAL', NULL, 0),
        ('Ecorend MR1', 1.5, 25, 'EXTERNAL', NULL, 0)`
      );
      console.log("Initial plaster data inserted.");
    } else {
      console.log("Records already exist in the 'plasters' table.");
    }
  } catch (error) {
    console.error("Error setting up database: ", error);
  }
};

// Function to fetch plaster records from the database
export const getPlasters = async () => {
  try {
    console.log("Fetching plasters...");
    const db = await dbPromise;
    const result = await db.getAllAsync("SELECT * FROM plasters;");
    return result;
  } catch (error) {
    console.error("Error fetching data from database: ", error);
    throw error;
  }
};
export const getToggledPlasters = async (
  InternalisEnabled,
  ExternalisEnabled
) => {
  try {
    const db = await dbPromise;

    let query = "SELECT * FROM plasters"; // Base query
    if (InternalisEnabled && ExternalisEnabled) {
      // Both switches are on, fetch all plasters
      query = "SELECT * FROM plasters;";
    } else if (InternalisEnabled) {
      // Only internal plasters are enabled
      query = "SELECT * FROM plasters WHERE plasterType = 'INTERNAL';";
    } else if (ExternalisEnabled) {
      // Only external plasters are enabled
      query = "SELECT * FROM plasters WHERE plasterType = 'EXTERNAL';";
    }

    const result = await db.getAllAsync(query);
    return result;
  } catch (error) {
    console.error("Error fetching data from database: ", error);
    throw error;
  }
};

/**
 * Deletes a specific plaster record by its unique ID.
 * This function is asynchronous and executes a SQL query to delete a plaster based on its ID.
 *
 * @param {number} id - The unique identifier of the plaster record to delete.
 */
export const deletePlasterById = async (id) => {
  try {
    // Await the resolution of dbPromise to get a reference to the database
    const db = await dbPromise;

    // Execute a SQL command to delete a plaster record by its ID
    await db.execAsync("DELETE FROM plasters WHERE id = ?;", [id]); // Use parameterized query for security
    console.log(`Plaster with ID ${id} deleted.`); // Log the successful deletion
  } catch (error) {
    // Log any errors encountered while deleting the plaster by ID
    console.error("Error deleting plaster by ID: ", error);
  }
};
export const getPlasterByName = async (name) => {
  try {
    // Await the resolution of dbPromise to get a reference to the database
    const db = await dbPromise;

    // Execute a SQL command to delete a plaster record by its ID
    const result = await db.getFirstAsync(
      "SELECT * FROM plasters WHERE plasterName = ?;",
      [name]
    ); // Use parameterized query for security
    console.log(`Plaster with name ${name} recovered.`); // Log the successful deletion
    console.log(`get plaster by name result :${result}`);
    return result;
  } catch (error) {
    // Log any errors encountered while deleting the plaster by ID
    console.error("Error recovering plaster by ID: ", error);
  }
};
/**
 * Deletes all plaster records from the database.
 * This function is asynchronous and executes a SQL query to delete all records in the plasters table.
 */
export const deleteAllPlasters = async () => {
  try {
    // Await the resolution of dbPromise to get a reference to the database
    const db = await dbPromise;

    // Execute a SQL command to delete all records from the plasters table
    await db.execAsync("DELETE FROM plasters;"); // Directly delete all records
    console.log("All plaster records deleted."); // Log the successful deletion
  } catch (error) {
    // Log any errors encountered while deleting all plaster records
    console.error("Error deleting all plaster records: ", error);
  }
};

// Function to clear all plaster records from the database
export const clearDatabase = async () => {
  try {
    const db = await dbPromise;
    await db.execAsync("DELETE FROM plasters;");
    console.log("All records cleared from the 'plasters' table.");
  } catch (error) {
    console.error("Error clearing database: ", error);
  }
};
// This function is used to search for plasters by a query string.
// It uses a wildcard search to find plasters whose names contain the query string.
export const searchPlastersByQuery = async (query) => {
  try {
    const db = await dbPromise;

    // Use wildcards to match any part of the plasterName
    const result = await db.getAllAsync(
      `SELECT * FROM plasters WHERE plasterName LIKE ? ;`,
      [`%${query}%`]
    );

    return result;
  } catch (error) {
    console.error("Error searching plasters: ", error);
    throw error;
  }
};
export const addPlasterToFavourites = async (plasterId) => {
  try {
    const db = await dbPromise;
    await db.execAsync("UPDATE plasters SET isFavourite = 1 WHERE id = ?;", [
      plasterId,
    ]);
    console.log(`Plaster with ID ${plasterId} added to favourites.`);
  } catch (error) {
    console.error("Error adding plaster to favourites: ", error);
  }
};
export const removePlasterFromFavourites = async (plasterId) => {
  try {
    const db = await dbPromise;
    await db.execAsync("UPDATE plasters SET isFavourite = 0 WHERE id = ?;", [
      plasterId,
    ]);
    console.log(`Plaster with ID ${plasterId} removed from favourites.`);
  } catch (error) {
    console.error("Error removing plaster from favourites: ", error);
  }
};
