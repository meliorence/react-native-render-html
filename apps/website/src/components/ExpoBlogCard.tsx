import React from 'react';
import TryOnExpoCard from './TryOnExpoCard';

export default function ExpoBlogCard({ className }: { className?: string }) {
  return (
    <TryOnExpoCard
      themed={true}
      className={className}
      name="React Native Blog"
      projectUrl={'https://expo.io/@jsamr/react-native-blog'}
      imagePath="/img/blog-expo-qr.png"
    />
  );
}
