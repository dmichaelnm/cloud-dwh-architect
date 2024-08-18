import * as fs from 'firebase/firestore';
import * as fb from 'src/scripts/utilities/firebase';

/**
 * Defines the possible document types.
 */
export enum EFSDocumentType {
  /** Account document */
  account = 'account',
}

/**
 * Represents the structure of a document data in the Firestore database.
 * This data structure includes common properties, such as name and description,
 * as well as meta properties, such as creation and alteration information.
 *
 * Every document data interface should extend this interface since all documents
 * in Firestore have these properties.
 */
export interface IFSDocumentData {
  /** Common properties each document has */
  common: {
    /** The name of the document */
    name: string;
    /** An optional description of the document */
    description: string | null;
  };
  /** Meta properties of the document */
  meta?: {
    /** Information about the creation of the document */
    created: {
      /** The name of the user who created the document */
      by: string;
      /** The timestamp when the document was created */
      at: fs.Timestamp;
    };
    /** Information about the alteration of the document */
    altered: {
      /** The name of the user who altered the document */
      by: string | null;
      /** The timestamp when the document was altered */
      at: fs.Timestamp | null;
    };
  };
}

/**
 * This type describes a configuration object used to create a new Firestore document object.
 */
export type TFSDocumentConfig = {
  /** A path to the document in the Firestore database */
  path?: string;
  /** An ID of the document */
  id?: string;
  /** A data object of the document */
  data?: object;
  /** A reference to a document in the Firestore database */
  documentReference?: fs.DocumentReference;
  /** A Firetsore document object */
  document?: fs.DocumentSnapshot;
};

/**
 * This is the base class of all Firestore document classes in the entire application.
 * It provides basic functionallity to create, update, delete, query and read Firestore documents from the
 * backend database.
 *
 * @template D - The interface describing the structure of the data object.
 */
export class FSDocument<D extends IFSDocumentData> {
  /** The path to the document in the Firestore database */
  path: string;

  /** The document ID */
  id: string;

  /** The type of the document */
  type: EFSDocumentType;

  /** The data object of the document */
  data: D;

  /**
   * Creates a new Firestore document object based on the specified configuration object.
   * There are three possible ways of configuration.
   * - The path to the document, the document ID and the data object are specified.
   * - The Firestore document reference and the data object are specified.
   * - The Firestore document object is specified.
   *
   * @param {TFSDocumentConfig} config - The configuration object used to initialize the document.
   * @throws {Error} Invalid Firestore document configuration object.
   */
  constructor(config: TFSDocumentConfig) {
    if (config.path && config.id && config.data) {
      // The path, ID and data object is specified
      this.path = config.path;
      this.id = config.id;
      this.type = getDocumentTypeFromPath(config.path);
      this.data = config.data as D;
    } else if (config.documentReference && config.data) {
      // The document reference and the data object is specified
      this.path = getDocumentPathFromReference(config.documentReference);
      this.id = config.documentReference.id;
      this.type = getDocumentTypeFromPath(this.path);
      this.data = config.data as D;
    } else if (config.document) {
      // The document object is specified
      this.path = getDocumentPathFromReference(config.document.ref);
      this.id = config.document.id;
      this.type = getDocumentTypeFromPath(this.path);
      this.data = config.document.data() as D;
    } else {
      // Invalid configuration
      throw new Error('Invalid Firestore document configuration object');
    }
  }

  /**
   * Asynchronously updates the Firestore document with new data.
   *
   * @param updateMeta - (Optional) Specifies whether to update the meta information. Default is true.
   *
   * @return - A promise that resolves with void when the update is complete.
   */
  async update(updateMeta: boolean = true): Promise<void> {
    // Update the altered info if specified
    if (updateMeta && this.data.meta) {
      this.data.meta.altered.by = fb.getCurrentAccountName();
      this.data.meta.altered.at = fs.Timestamp.now();
    }
    // Update the Firestore document
    await fs.updateDoc(
      fs.doc(fb.firebaseStore, this.path, this.id),
      this.data as fs.WithFieldValue<any>
    );
  }
}

/**
 * Creates a new document in Firestore.
 *
 * @param {string} path - The path where the document will be created.
 * @param {D} data - The data to be stored in the document.
 * @param {string} [id] - Optional. The ID for the document. If not provided, an ID will be automatically generated by Firestore.
 *
 * @return {Promise<R>} - A promise that resolves to the new document instance.
 *
 * @template D - The type of the data object of the document.
 * @template R - The type of the document.
 */
export async function createDocument<
  D extends IFSDocumentData,
  R extends FSDocument<D>
>(path: string, data: D, id?: string): Promise<R> {
  // Apply meta data to the data object
  data.meta = {
    created: {
      by: fb.getCurrentAccountName(),
      at: fs.Timestamp.now(),
    },
    altered: {
      by: null,
      at: null,
    },
  };
  // The new document object
  let document: FSDocument<D>;
  if (id) {
    // If there is an id specified, create the document with that ID
    await fs.setDoc(fs.doc(fb.firebaseStore, path, id), data);
    // Create the new document object
    document = new FSDocument<D>({ path: path, id: id, data: data });
  } else {
    // Create document with a ID generated by Firestore
    const ref = await fs.addDoc(fs.collection(fb.firebaseStore, path), data);
    // Create the new document object
    document = new FSDocument<D>({ documentReference: ref, data: data });
  }
  // Return the document instance
  return document as R;
}

/**
 * Loads a document from the specified path and returns it as an instance of FSDocument
 * or undefined if the document does not exist.
 *
 * @param {string} path - The path of the document in the Firestore database.
 * @param {string} id - The unique identifier of the document.
 * @returns {Promise<FSDocument<D> | undefined>} The loaded document or undefined if not found.
 */
export async function load<D extends IFSDocumentData>(
  path: string,
  id: string
): Promise<FSDocument<D> | undefined> {
  // Create the document reference
  const ref = fs.doc(fb.firebaseStore, path, id);
  // Load the document
  const doc = await fs.getDoc(ref);
  // Check if the document exists
  if (doc.exists()) {
    // Create and return the document object
    return new FSDocument<D>({ document: doc });
  } else {
    // Document was not found
    return undefined;
  }
}

/**
 * Returns the path of a document given its reference.
 *
 * @param {fs.DocumentReference} ref - The reference of the document.
 * @returns {string} - The path of the document, excluding the document ID.
 */
function getDocumentPathFromReference(ref: fs.DocumentReference): string {
  // Get all segments of the path
  const segments = ref.path.split('/');
  // Return all but the last segment as path (The last segment is the ID of the document)
  return segments.slice(0, segments.length - 1).join('/');
}

/**
 * Returns the document type based on the given path.
 *
 * @param {string} path - The path of the document.
 * @return {EFSDocumentType} - The type of the document.
 */
function getDocumentTypeFromPath(path: string): EFSDocumentType {
  // Get all segments of the path
  const segments = path.split('/');
  // The last segment is the type of the document
  return segments[segments.length - 1] as unknown as EFSDocumentType;
}
