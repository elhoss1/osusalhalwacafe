import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QUOTE_CONFIG } from '../../config/quote-config';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-success.html',
  styleUrl: './order-success.scss'
})
export class OrderSuccessComponent implements OnInit {
  reference = '';
  copied = false;
  readonly whatsappUrl = QUOTE_CONFIG.salesWhatsapp ? `https://wa.me/${String(QUOTE_CONFIG.salesWhatsapp).replace(/\D/g, '')}` : '';
  async copyReference(): Promise<void> {
    if (!this.reference || !navigator.clipboard) return;
    try { await navigator.clipboard.writeText(this.reference); this.copied = true; setTimeout(() => this.copied = false, 2200); }
    catch { this.copied = false; }
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const navigationState = this.router.getCurrentNavigation()?.extras.state as { orderConfirmed?: boolean } | undefined;
    const confirmed = navigationState?.orderConfirmed || history.state?.orderConfirmed;
    if (!confirmed) {
      void this.router.navigateByUrl('/');
      return;
    }
    this.reference = this.route.snapshot.paramMap.get('reference') || '';
  }
}
