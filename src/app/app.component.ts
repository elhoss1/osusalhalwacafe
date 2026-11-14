import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './page/header/header';
import { QUOTE_CONFIG } from './config/quote-config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ossus-alhalwa-mini';
  whatsappLink = `https://wa.me/${QUOTE_CONFIG.salesWhatsapp}`;
}
