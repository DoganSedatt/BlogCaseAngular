import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideToastr({ 
      timeOut:2000,
      positionClass:'toast-top-right',
      preventDuplicates: true, 
      progressBar:true,
      closeButton:true,
      tapToDismiss:true,
      newestOnTop:true
    })
  ]
};
