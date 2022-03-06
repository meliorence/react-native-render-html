import React from 'react';
import TryOnExpoCard from './TryOnExpoCard';

export default function ExpoDiscoveryCard({
  className
}: {
  className?: string;
}) {
  return (
    <TryOnExpoCard
      white
      className={className}
      name="Discovery"
      projectUrl={'https://expo.dev/@jsamr/react-native-render-html-discovery'}
      imagePath="/img/discovery-expo-qr.png"
    />
  );
}
