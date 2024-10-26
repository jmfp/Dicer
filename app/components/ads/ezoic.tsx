'use client'
import React, { useEffect } from 'react'

export default function Ezoic() {
    useEffect(() => {
        const handleEzoicLoad = () => {
          try {
            const ezoic = window.ezstandalone;
            if (ezoic) {
              ezoic.define(103, 104, 105, 106);
              if (!ezoic.enabled) {
                ezoic.enable();
                ezoic.display();
                ezoic.refresh();
              }
            } else {
              // Ezoic script is not loaded yet, try again later
              setTimeout(handleEzoicLoad, 500);
            }
          } catch (ex) {
            console.error("Error with Ezoic:", ex);
          }
        };
    
        handleEzoicLoad();
      }, []);
  return (
    <div>
        <div id="ezoic-pub-ad-placeholder-106"> </div>
    </div>
  )
}
