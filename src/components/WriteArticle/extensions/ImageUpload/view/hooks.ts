
 import { DragEvent, useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { API } from '../../../lib/api'
// import { url } from 'inspector'
import axios from 'axios'



export const useUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const [loading, setLoading] = useState(false)

  const uploadFile = useCallback(async () => {
    setLoading(true)
    try {
      const url = await API.uploadImage()
      console.log('IMaheUrlss:', url)
      // onUpload(url)

  
    } catch (errPayload: any) {
      const error = errPayload?.response?.data?.error || 'Something went wrong'
      toast.error(error)
    }
    setLoading(false)
  }, [onUpload])

  return { loading, uploadFile }
}

export const useFileUpload = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const fileInput = useRef<HTMLInputElement>(null)

  const handleUploadClick = useCallback(() => {
    fileInput.current?.click()
  }, [])

  const uploadToImgBB = async (imageData:any) => {
    try {
      const formData = new FormData();
      formData.append('image',imageData)
      const res = await axios.post('https://api.imgbb.com/1/upload?key=6658c40a365aea022ec363dd205f77f6',formData);
      console.log(res.data.data.url); // Log the URL to verify
      return res.data.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error appropriately, e.g., show error message to user
      return null;
    }
  };

  const handleChange = useCallback (async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // const reader = new FileReader()
      // reader.onload = e => {
      //   if (e.target?.result && typeof e.target.result === 'string') {
      //     // Set the image URL for preview (data URL format)
      //     setImageUrl(e.target.result)
      //     onUpload(e.target.result)
      //   }
      // }
      // reader.readAsDataURL(file)
      try {
        const imageUrl = await uploadToImgBB(file);
        if (imageUrl) {
          // Update your articleData with the imageUrl
          setImageUrl(imageUrl);
          onUpload(imageUrl)// Log the imageUrl to verify
        }
      } catch (error) {
        // Handle error appropriately, e.g., show error message to user
        console.error('Error uploading image:', error);
      }
    }
  }, [])

  const [imageUrl, setImageUrl] = useState<string | null>(null)

  return { ref: fileInput, handleUploadClick, handleChange, imageUrl }
}

export const useDropZone = ({ uploader }: { uploader: (file: File) => void }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [draggedInside, setDraggedInside] = useState<boolean>(false)

  useEffect(() => {
    const dragStartHandler = () => {
      setIsDragging(true)
    }

    const dragEndHandler = () => {
      setIsDragging(false)
    }

    document.body.addEventListener('dragstart', dragStartHandler)
    document.body.addEventListener('dragend', dragEndHandler)

    return () => {
      document.body.removeEventListener('dragstart', dragStartHandler)
      document.body.removeEventListener('dragend', dragEndHandler)
    }
  }, [])

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      setDraggedInside(false)
      if (e.dataTransfer.files.length === 0) {
        return
      }

      const fileList = e.dataTransfer.files

      const files: File[] = []

      for (let i = 0; i < fileList.length; i += 1) {
        const item = fileList.item(i)
        if (item) {
          files.push(item)
        }
      }

      if (files.some(file => file.type.indexOf('image') === -1)) {
        return
      }

      e.preventDefault()

      const filteredFiles = files.filter(f => f.type.indexOf('image') !== -1)

      const file = filteredFiles.length > 0 ? filteredFiles[0] : undefined

      if (file) {
        uploader(file)
      }
    },
    [uploader],
  )

  const onDragEnter = () => {
    setDraggedInside(true)
  }

  const onDragLeave = () => {
    setDraggedInside(false)
  }

  return { isDragging, draggedInside, onDragEnter, onDragLeave, onDrop }
}
