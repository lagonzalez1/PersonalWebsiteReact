import React, { useEffect } from "react";
import WebFont  from "webfontloader";
/*
Purpose: Load fonts to all components
*/

export default function FontLoader() {
    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Droid Sans', 'Chilanka', 'Roboto Mono']
          }
        });
      }, [])
      return ( <> </> )
}