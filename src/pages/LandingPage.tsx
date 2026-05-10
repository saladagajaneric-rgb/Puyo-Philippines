import { useState } from 'react';
import HomeSection from './HomeSection';
import AboutSection from './AboutSection';
import PropertiesSection from './PropertiesSection';
import ContactSection from './ContactSection';
import PropertyDetailView from './PropertyDetailView';
import { Property } from '../types';
import { AnimatePresence } from 'motion/react';

export default function LandingPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <>
      <main>
        <HomeSection />
        <AboutSection />
        <PropertiesSection onSelectProperty={(p) => setSelectedProperty(p)} />
        <ContactSection />
      </main>

      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetailView 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
