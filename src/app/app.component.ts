// Mirrors react-app/src/App.tsx — layout shell
import { Component } from '@angular/core'
import { PropCardComponent } from './components/prop-card.component'
import { PropPreloadComponent } from 'headlo-angular'

@Component({
  selector:   'app-root',
  standalone: true,
  imports:    [PropCardComponent, PropPreloadComponent],
  template: `
    <!-- PropPreload — mirrors <PropPreload dist components> in react-app main.tsx -->
    <prop-preload
      [dist]="[{ runtime: 'react', version: '19' }]"
      [components]="['headlo-auth-button']"
    />

    <div style="background:#faf9f6;min-height:100vh">
      <header style="border-bottom:1px solid #e8e5df;padding:0 24px;height:52px;display:flex;align-items:center;gap:10px">
        <span style="font-size:14px;font-weight:600;font-family:sans-serif">Headlo Angular Example</span>
      </header>

      <main style="max-width:640px;margin:40px auto;padding:0 24px">
        <prop-card />
      </main>
    </div>
  `,
})
export class AppComponent {}
