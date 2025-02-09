import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'; // Importation des métriques de performance depuis 'web-vitals'
                                                                         // Importing performance metrics from 'web-vitals'

const reportWebVitals = (onPerfEntry) => { // Définition de la fonction reportWebVitals
                                            // Defining the reportWebVitals function
                                            
  if (onPerfEntry && onPerfEntry instanceof Function) { // Vérification que onPerfEntry est une fonction
                                                          // Checking if onPerfEntry is a function
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Importation dynamique des métriques de performance
      // Dynamic import of performance metrics

      getCLS(onPerfEntry); // Mesure du Cumulative Layout Shift (CLS)
                           // Measure Cumulative Layout Shift (CLS)

      getFID(onPerfEntry); // Mesure du First Input Delay (FID)
                           // Measure First Input Delay (FID)

      getFCP(onPerfEntry); // Mesure du First Contentful Paint (FCP)
                           // Measure First Contentful Paint (FCP)

      getLCP(onPerfEntry); // Mesure du Largest Contentful Paint (LCP)
                           // Measure Largest Contentful Paint (LCP)

      getTTFB(onPerfEntry); // Mesure du Time to First Byte (TTFB)
                            // Measure Time to First Byte (TTFB)
    });
  }
};

export default reportWebVitals; // Exportation de la fonction reportWebVitals
                                 // Exporting the reportWebVitals function