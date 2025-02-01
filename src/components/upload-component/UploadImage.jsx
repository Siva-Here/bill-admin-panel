// const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`
// // console.log(process.env.REACT_APP_CLOUD_NAME)

// const UploadImage = async(image,filename) => {
//     const formData = new FormData()
//     formData.append('file',image)
//     formData.append("upload_preset","billManagement")
//     formData.append("public_id",filename);
//     const dataResponse = await fetch(url,{
//         method:'POST',
//         body:formData
//     })
//     return dataResponse.json()
// }

// export default UploadImage



const url = `https://api.cloudinary.com/v1_1/dgelue5vg/image/upload`

const UploadImage = async(image,filename) => {
    const formData = new FormData()
    formData.append('file',image)
    formData.append("upload_preset","Bill_Management")
    formData.append("public_id", filename);
    const dataResponse = await fetch(url,{
        method:'POST',
        body:formData
    })
    return dataResponse.json()
}

export default UploadImage