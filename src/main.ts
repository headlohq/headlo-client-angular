import { bootstrapApplication } from '@angular/platform-browser'
import { AppComponent } from './app/app.component'
import { PropServerService } from 'headlo-angular'
import { importProvidersFrom } from '@angular/core'

// Mirrors react-app main.tsx: PropServer publishableKey + url wired at boot
bootstrapApplication(AppComponent, {
  providers: [
    {
      provide:    'PROP_CONFIG',
      useFactory: () => ({
        publishableKey: (window as any).__env?.HEADLO_PROP_KEY ?? '',
        url:            (window as any).__env?.HEADLO_API_URL  ?? '',
      }),
    },
  ],
}).then(appRef => {
  const server = appRef.injector.get(PropServerService)
  server.configure({
    publishableKey: (window as any).__env?.HEADLO_PROP_KEY ?? '',
    url:            (window as any).__env?.HEADLO_API_URL  ?? '',
  })
}).catch(err => console.error(err))
