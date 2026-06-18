// Mirrors react-app/src/components/PropCard.tsx
// Uses injectComponent from headlo-angular, createService from headlo
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { NgIf } from '@angular/common'
import { injectComponent } from 'headlo-angular'
import { createService } from 'headlo'

const prop = createService({
  publishableKey: (window as any).__env?.HEADLO_PROP_KEY ?? '',
  url:            (window as any).__env?.HEADLO_API_URL  ?? '',
})

@Component({
  selector:   'prop-card',
  standalone: true,
  schemas:    [CUSTOM_ELEMENTS_SCHEMA],
  imports:    [NgIf],
  template: `
    <div style="background:#fff;border:1px solid #e8e5df;border-radius:10px;padding:20px 24px;margin-bottom:16px">
      <div style="font-size:13px;font-weight:700;margin-bottom:14px;color:#1a1a18">PROP Components &amp; Services</div>

      <!-- Component status — mirrors useComponent('headlo-auth-button') -->
      <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:8px;font-size:14px;flex-wrap:wrap">
        <span style="font-size:11px;color:#8a8a80;text-transform:uppercase;letter-spacing:.05em;min-width:80px">Component</span>
        <code style="font-size:12px;font-family:monospace;color:#1a1a18">headlo-auth-button</code>
        <span [style.color]="authButton.loaded() ? '#2a6a3a' : authButton.error() ? '#991b1b' : '#8a8a80'" style="font-size:12px">
          {{ authButton.loaded() ? '✓ loaded' : authButton.error() ? authButton.error()!.message : 'loading…' }}
        </span>
      </div>

      <!-- Live custom element — same as <headlo-auth-button> in react-app -->
      <div *ngIf="authButton.loaded()"
        style="margin-top:12px;padding:14px 16px;background:#f5f2eb;border-radius:8px">
        <div style="font-size:11px;color:#8a8a80;text-transform:uppercase;letter-spacing:.05em;min-width:80px">Live element</div>
        <headlo-auth-button style="margin-top:8px;display:block"></headlo-auth-button>
      </div>

      <!-- API buttons -->
      <div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">
        <button (click)="fetchDef()" [disabled]="apiLoading"
          style="padding:8px 14px;background:#1a1a18;color:#faf9f6;border:none;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer">
          component('headlo-auth-button').def()
        </button>
        <button (click)="fetchManifest()" [disabled]="apiLoading"
          style="padding:8px 14px;background:#2a4a7a;color:#faf9f6;border:none;border-radius:6px;font-size:12px;font-weight:500;cursor:pointer">
          service('headlo-auth', 'v1').manifest()
        </button>
      </div>

      <pre *ngIf="result"
        style="margin-top:12px;background:#111;color:#e8e8e8;border-radius:8px;padding:12px 14px;font-size:11px;font-family:monospace;overflow:auto;white-space:pre-wrap;word-break:break-word;max-height:320px">{{ result }}</pre>
    </div>
  `,
})
export class PropCardComponent {
  // injectComponent mirrors useComponent('headlo-auth-button')
  authButton = injectComponent('headlo-auth-button')

  apiLoading = false
  result: string | null = null

  async fetchDef(): Promise<void> {
    this.apiLoading = true
    this.result     = null
    try {
      const json  = await prop.component('headlo-auth-button').def()
      this.result = JSON.stringify(json, null, 2)
    } catch (e) {
      this.result = String(e)
    } finally {
      this.apiLoading = false
    }
  }

  async fetchManifest(): Promise<void> {
    this.apiLoading = true
    this.result     = null
    try {
      const json  = await prop.service('headlo-auth', 'v1').manifest()
      this.result = JSON.stringify(json, null, 2)
    } catch (e) {
      this.result = String(e)
    } finally {
      this.apiLoading = false
    }
  }
}
