import storage from "@react-native-firebase/storage";
import { Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";


export const updateProfileImage = async image => {
    return new Promise(async resolve => {
        try {
            const filename = image.substring(image.lastIndexOf('/') + 1)

            const pathForFirebaseStorage = await getPathForFirebaseStorage(image)

            await storage()
                .ref(filename)
                .putFile(pathForFirebaseStorage)

            await storage()
                .ref(filename)
                .getDownloadURL()
                .then(uri => {
                    resolve(uri)
                })
        } catch (error) {
            console.log("ERROR : ", error);
        }
    })
}


const getPathForFirebaseStorage = async uri => {
    if (Platform.OS === 'ios') return uri
    const stat = await RNFetchBlob.fs.stat(uri)
    return stat.path
}