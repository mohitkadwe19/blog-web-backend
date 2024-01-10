const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage')
const firebaseService = require('../../services/firebase.service');

async function uploadImage(file, quantity, email, password) {
  try {
    const uploadedImages = [];
    const storageFB = getStorage();

    const auth = await firebaseService.loginUser(email, password);

    if (!auth) {
      throw new Error('Authentication failed');
    }

    if (quantity === 'single') {
      const dateTime = Date.now();
      const fileName = `images/${dateTime}${file.originalname}`
      const storageRef = ref(storageFB, fileName)
      const metadata = {
        contentType: file.type,
      }
      await uploadBytesResumable(storageRef, file.buffer, metadata);
      // Get the download URL for the uploaded image
      const downloadURL = await getDownloadURL(ref(storageFB, fileName));
      
      uploadedImages.push({
        url: downloadURL,
        fileName: fileName,
        size: file.size,
        mimetype: file.mimetype,
        updatedBy : email
      });
      return downloadURL;
    }

    if (quantity === 'multiple') {

      for (let i = 0; i < file?.length; i++) {
        const dateTime = Date.now();
        const fileName = `images/${dateTime}${file[i].originalname}`
        const storageRef = ref(storageFB, fileName)
        const metadata = {
          contentType: file[i].mimetype,
        }

        await uploadBytesResumable(storageRef, file[i].buffer, metadata);
        const downloadURL = await getDownloadURL(ref(storageFB, fileName));
        uploadedImages.push({
          url: downloadURL,
          fileName: fileName,
          size: file[i].size,
          mimetype: file[i].mimetype,
          updatedBy: email
        });
      }
      return uploadedImages;
    }
  }
  catch (error) {
    console.log('error from uploadImage', error);
    return error;
  }
}

module.exports = uploadImage;