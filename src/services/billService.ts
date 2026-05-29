import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

/** Soft-delete a bill (same as web `deleteBill`). */
export async function softDeleteBill(billId: string): Promise<void> {
  await updateDoc(doc(db, "bills", billId), { isDeleted: true });
}
