const DB = {
  document(doc: firebase.firestore.QueryDocumentSnapshot) {
    const newDocument = doc.data()
    newDocument.id= doc.id
    return newDocument
  },
  object(customObject): Object {
    return JSON.parse(JSON.stringify(customObject))
  },
  id(): string {
    return (new Date().getTime()).toString(36) + Math.random().toString(36).substr(2, 9)
  },
  timestamp(): number {
    return (new Date((new Date()).toUTCString())).getTime()
  }
}



export default DB 