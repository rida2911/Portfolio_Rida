import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "portfolio-khyati-satija", appId: "1:267463640847:web:99454747893731d16aa07a", storageBucket: "portfolio-khyati-satija.firebasestorage.app", apiKey: "AIzaSyAcav-xBGRhtzEx6aUqRRMSWTO8-oV-dmc", authDomain: "portfolio-khyati-satija.firebaseapp.com", messagingSenderId: "267463640847", measurementId: "G-L4QTJS145F" })), provideAnalytics(() => getAnalytics()), ScreenTrackingService, provideAppCheck(() => {
//   // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
//   // const provider = new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */);
//   // return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
// }), providePerformance(() => getPerformance()), provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({ projectId: "portfolio-khyati-satija", appId: "1:267463640847:web:99454747893731d16aa07a", storageBucket: "portfolio-khyati-satija.firebasestorage.app", apiKey: "AIzaSyAcav-xBGRhtzEx6aUqRRMSWTO8-oV-dmc", authDomain: "portfolio-khyati-satija.firebaseapp.com", messagingSenderId: "267463640847", measurementId: "G-L4QTJS145F" })), provideAnalytics(() => getAnalytics()), ScreenTrackingService, provideAppCheck(() => {
//   // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
//   // const provider = new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */);
//   // return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
// }), providePerformance(() => getPerformance()), provideStorage(() => getStorage())]
// };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    providePerformance(() => getPerformance()), 
    provideStorage(() => getStorage()), 
    provideFirebaseApp(() => initializeApp({ 
      projectId: 'portfolio-khyati-satija'
      // your other Firebase config
    }))
  ]
};
