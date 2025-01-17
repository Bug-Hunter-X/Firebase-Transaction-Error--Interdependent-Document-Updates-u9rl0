The solution involves restructuring the transaction to avoid the race condition. Instead of directly updating both documents based on each other's values, the update should be performed in a sequential manner or with a strategy that handles potential conflicts. 

```javascript
firebase.firestore().runTransaction(async (transaction) => {
  const doc1Ref = firebase.firestore().collection('myCollection').doc('document1');
  const doc2Ref = firebase.firestore().collection('myCollection').doc('document2');

  const doc2Snap = await transaction.get(doc2Ref);
  if (!doc2Snap.exists) {
    throw new Error('Document2 does not exist!');
  }
  const doc2Data = doc2Snap.data();

  // Update document1 using updated data from document2
  transaction.update(doc1Ref, { count: doc2Data.count + 1 });

  // Read updated document1, then update document2
  const updatedDoc1Snap = await transaction.get(doc1Ref);
  const updatedDoc1Data = updatedDoc1Snap.data();
  transaction.update(doc2Ref, { count: updatedDoc1Data.count +1 });

  return true; 
}).then(() => {
  console.log('Transaction success!');
}).catch((error) => {
  console.error('Transaction failed: ', error);
});
```
This sequential approach guarantees that the update of one document is based on the latest value of the other document, thus preventing data inconsistency.