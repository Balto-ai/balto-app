import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'
import {storage} from './firebase'

export default function uploadFileProgress(file, subFolder, imageName, setProgress) {
  return new Promise((resolve, reject)=>{
    const storageRef = ref(storage, subFolder + '/' + imageName)
    const upload = uploadBytesResumable(storageRef,file)
    upload.on('state_changed', (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
    }, error=>{
        reject(error)
    }, async()=>{
        try {
            const url = await getDownloadURL(storageRef)
            resolve(url)
        } catch (error) {
            reject(error)
        }
    } )
  })
}
