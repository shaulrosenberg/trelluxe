
export const uploadService = {
     uploadImg,
}
async function uploadImg(ev) {
     const CLOUD_NAME = 'dy2savmew'
     const UPLOAD_PRESET = 'ipuxbmml'
     const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

     try {
          const formData = new FormData()
          formData.append('upload_preset', UPLOAD_PRESET)
          formData.append('file', ev.target.files[0])

          const res = await fetch(UPLOAD_URL, {
               method: 'POST',
               body: formData,
          })
          const {url, created_at, original_filename, format} = await res.json()
          return {url, created_at, original_filename, format}
     } catch (err) {
          console.error('Failed to upload', err)
          throw err
     }
}
