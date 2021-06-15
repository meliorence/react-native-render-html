import React from 'react';
import TryOnExpoCard from './TryOnExpoCard';

export default function ExpoDiscoveryCard({
  className
}: {
  className?: string;
}) {
  return (
    <TryOnExpoCard
      className={className}
      name="Discovery"
      projectUrl={'https://expo.io/@jsamr/react-native-render-html-discovery'}
      imagePath="/img/discovery-expo-qr.png"
    />
  );
}
