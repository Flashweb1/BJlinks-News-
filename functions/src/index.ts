import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()

// Callable function for admins to approve users. Caller must be authenticated and an admin.
export const setApproved = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Request has no auth context')
  const callerUid = context.auth.uid
  // Verify caller is admin by checking admins collection or custom claim
  const callerClaims = context.auth.token || {}
  let callerIsAdmin = false
  if (callerClaims.approved === true && callerClaims.role === 'admin') callerIsAdmin = true
  if (!callerIsAdmin) {
    const callerDoc = await db.doc(`admins/${callerUid}`).get()
    if (callerDoc.exists) callerIsAdmin = true
  }
  if (!callerIsAdmin) throw new functions.https.HttpsError('permission-denied', 'Caller is not an admin')

  const targetUid: string = data.uid
  const role: string = data.role || 'editor'
  if (!targetUid) throw new functions.https.HttpsError('invalid-argument', 'Missing target uid')

  try {
    // Set custom claim
    await admin.auth().setCustomUserClaims(targetUid, { approved: true, role })
    // Create admins doc for management UI
    await db.doc(`admins/${targetUid}`).set({ role, approvedAt: admin.firestore.FieldValue.serverTimestamp() })
    // Remove pendingUsers doc if exists
    await db.doc(`pendingUsers/${targetUid}`).delete().catch(() => {})
    return { success: true }
  } catch (e) {
    throw new functions.https.HttpsError('internal', 'Failed to set approval', { original: String(e) })
  }
})

export const revokeApproved = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Request has no auth context')
  const callerUid = context.auth.uid
  const callerClaims = context.auth.token || {}
  let callerIsAdmin = false
  if (callerClaims.approved === true && callerClaims.role === 'admin') callerIsAdmin = true
  if (!callerIsAdmin) {
    const callerDoc = await db.doc(`admins/${callerUid}`).get()
    if (callerDoc.exists) callerIsAdmin = true
  }
  if (!callerIsAdmin) throw new functions.https.HttpsError('permission-denied', 'Caller is not an admin')

  const targetUid: string = data.uid
  if (!targetUid) throw new functions.https.HttpsError('invalid-argument', 'Missing target uid')

  try {
    // Clear custom claims
    await admin.auth().setCustomUserClaims(targetUid, {})
    // Delete admins doc if exists
    await db.doc(`admins/${targetUid}`).delete().catch(() => {})
    return { success: true }
  } catch (e) {
    throw new functions.https.HttpsError('internal', 'Failed to revoke approval', { original: String(e) })
  }
})
