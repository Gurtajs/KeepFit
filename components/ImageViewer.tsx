import {Image} from 'react-native'

export default function ImageViewer({ selectedImage }: any) {

  return <Image source={{uri: selectedImage}} />;
}