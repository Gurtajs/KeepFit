import { useState, createContext } from "react";

export type ImageContextType = {
  selectedImage: string,
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>,
}
const ImageContext = createContext<ImageContextType>({
  selectedImage: '',
  setSelectedImage: () => {},
});

const ImageProvider = ({children}: { children: React.ReactNode }) => {
  const [selectedImage, setSelectedImage] = useState<string>('')
  return (
    <ImageContext.Provider value={{selectedImage, setSelectedImage}}>
      {children}
    </ImageContext.Provider>
  )
}

export {ImageContext, ImageProvider}
