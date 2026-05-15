import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  container?: HTMLElement;
}

export const Portal = ({ children, container: customContainer }: PortalProps) => {
  const [portalContainer] = useState(() => {
    if (customContainer) return customContainer;
    const div = document.createElement('div');
    div.setAttribute('data-portal-root', '');
    return div;
  });

  useEffect(() => {
    if (customContainer) return;

    document.body.appendChild(portalContainer);

    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') || 
                     document.body.classList.contains('dark');
      portalContainer.classList.toggle('dark', isDark);
    };

    // Initial sync
    updateTheme();

    // Observe changes to html and body classes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
      if (document.body.contains(portalContainer)) {
        document.body.removeChild(portalContainer);
      }
    };
  }, [portalContainer, customContainer]);

  return createPortal(children, portalContainer);
};

