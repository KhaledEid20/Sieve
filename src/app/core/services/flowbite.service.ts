import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class FlowbiteService {
    private platformId = inject(PLATFORM_ID);

    async loadFlowbite(): Promise<void> {
        if (isPlatformBrowser(this.platformId)) {
            const { initFlowbite } = await import('flowbite');
            initFlowbite();
        }
    }
}
