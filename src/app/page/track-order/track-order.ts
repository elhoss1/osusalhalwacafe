import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { QUOTE_CONFIG } from '../../config/quote-config';

interface TrackedQuoteItem {
  name: string;
  sku: string;
  categories: string[];
  selectedOptions: Record<string, string>;
  quantity: number;
}
interface TrackedOrder {
  reference: string;
  businessName: string;
  contactName: string;
  city: string;
  mapLink: string;
  supplyFrequency: string;
  notes: string;
  createdAt: string;
  items: TrackedQuoteItem[];
}

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './track-order.html',
  styleUrl: './track-order.scss'
})
export class TrackOrderComponent {
  reference = '';
  phone = '';
  loading = false;
  errorMessage = '';
  order: TrackedOrder | null = null;

  constructor(private http: HttpClient) {}

  trackOrder(): void {
    this.errorMessage = '';
    this.order = null;
    const reference = this.reference.trim().toUpperCase();
    const phone = this.phone.trim();
    if (!reference || !phone) {
      this.errorMessage = 'أدخل الرقم المرجعي ورقم الجوال المسجّل للطلب.';
      return;
    }
    this.loading = true;
    this.http.post<TrackedOrder>(QUOTE_CONFIG.trackingEndpoint, { reference, phone }).subscribe({
      next: order => { this.order = order; this.loading = false; },
      error: error => {
        this.loading = false;
        this.errorMessage = typeof error?.error?.message === 'string'
          ? error.error.message
          : 'لم نعثر على طلب مطابق. تحقق من الرقم المرجعي ورقم الجوال وحاول مرة أخرى.';
      }
    });
  }

  frequencyLabel(value: string): string {
    const labels: Record<string, string> = {
      once: 'طلب لمرة واحدة', weekly: 'توريد أسبوعي', daily: 'توريد يومي', 'as-needed': 'توريد حسب الحاجة'
    };
    return labels[value] || value || 'غير محددة';
  }

  optionSummary(options: Record<string, string> | null | undefined): string {
    return Object.entries(options || {}).map(([key, value]) => `${key}: ${value}`).join('، ');
  }
}
