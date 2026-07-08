import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LucidePhone } from '@lucide/angular';
import { FadeInDirective } from '../../shared/fade-in.directive';
import { ParallaxDirective } from '../../shared/parallax.directive';
import { SectionLabelComponent } from '../../shared/section-label/section-label.component';

export interface MenuItem { name: string; description: string; price: string; highlight?: boolean; }
export interface MenuCategory { id: string; label: string; items: MenuItem[]; }

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'antipasti', label: 'Antipasti', items: [
    { name: 'Bruschetta al Pomodoro', description: 'Geröstetes Landbrot, marinierte Tomaten, Knoblauch, Basilikum und Olivenöl.', price: '€ 7,90' },
    { name: 'Burrata con Pomodorini', description: 'Cremige Burrata, bunte Tomaten, Basilikumöl und geröstete Pinienkerne.', price: '€ 12,90', highlight: true },
    { name: 'Vitello Tonnato', description: 'Rosa Kalbfleisch, feine Thunfisch-Kapern-Creme und Zitrone.', price: '€ 13,90' },
    { name: 'Arancini al Ragù', description: 'Knusprige Risottobällchen mit Ragùfüllung, Parmesan und Tomatensugo.', price: '€ 9,90' },
    { name: 'Carpaccio di Barbabietola', description: 'Rote Rübe, Ziegenkäse, Rucola, Walnuss und Balsamico.', price: '€ 10,90' },
    { name: 'Antipasti della Casa', description: 'Eine Auswahl aus Gemüse, Käse, Oliven und italienischen Spezialitäten.', price: '€ 15,90' },
  ] },
  { id: 'pasta', label: 'Pasta', items: [
    { name: 'Tagliatelle al Ragù', description: 'Bandnudeln mit langsam geschmortem Rinderragù und Parmesan.', price: '€ 15,90', highlight: true },
    { name: 'Spaghetti Carbonara', description: 'Guanciale, Ei, Pecorino und schwarzer Pfeffer – klassisch ohne Obers.', price: '€ 14,90' },
    { name: 'Penne all’Arrabbiata', description: 'Tomate, Knoblauch, Chili, Petersilie und Pecorino.', price: '€ 12,90' },
    { name: 'Gnocchi alla Sorrentina', description: 'Kartoffelgnocchi, Tomatensugo, Mozzarella und Basilikum.', price: '€ 14,50' },
    { name: 'Ravioli Burro e Salvia', description: 'Gefüllte Pasta, Salbeibutter, Parmesan und geröstete Haselnüsse.', price: '€ 16,90' },
    { name: 'Lasagne della Casa', description: 'Ofenlasagne mit Ragù, Béchamel und Parmesan.', price: '€ 15,50' },
  ] },
  { id: 'pizza', label: 'Pizza', items: [
    { name: 'Margherita', description: 'Tomate, Fior di Latte, Basilikum und Olivenöl.', price: '€ 10,90', highlight: true },
    { name: 'Marinara', description: 'Tomate, Knoblauch, Oregano und Olivenöl.', price: '€ 9,50' },
    { name: 'Diavola', description: 'Tomate, Fior di Latte, scharfe Salami und Chili.', price: '€ 13,90' },
    { name: 'Prosciutto e Funghi', description: 'Tomate, Fior di Latte, Prosciutto cotto und Champignons.', price: '€ 13,50' },
    { name: 'Verdure', description: 'Tomate, Fior di Latte, saisonales Gemüse und Kräuter.', price: '€ 13,50' },
    { name: 'Burrata', description: 'Tomate, Burrata, Kirschtomaten, Rucola und Basilikumöl.', price: '€ 15,90' },
  ] },
  { id: 'secondi', label: 'Secondi & Dolci', items: [
    { name: 'Melanzane alla Parmigiana', description: 'Aubergine, Tomatensugo, Mozzarella, Parmesan und Basilikum.', price: '€ 15,90' },
    { name: 'Cotoletta alla Milanese', description: 'Knusprig gebackenes Kalbsschnitzel mit Zitronen-Rucola-Salat.', price: '€ 22,90', highlight: true },
    { name: 'Branzino al Limone', description: 'Gebratenes Wolfsbarschfilet, Zitronenbutter und saisonales Gemüse.', price: '€ 23,90' },
    { name: 'Tiramisù Classico', description: 'Mascarpone, Espresso, Kakao und Löffelbiskuit.', price: '€ 7,50' },
    { name: 'Panna Cotta', description: 'Vanille-Panna-cotta mit saisonalem Fruchtkompott.', price: '€ 6,90' },
    { name: 'Affogato al Caffè', description: 'Vanillegelato mit frisch gebrühtem Espresso.', price: '€ 5,90' },
  ] },
];

@Component({
  selector: 'app-menu-section',
  imports: [FadeInDirective, ParallaxDirective, SectionLabelComponent, LucidePhone],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  readonly categories = MENU_CATEGORIES;
  readonly activeTab = signal('antipasti');
  readonly active = computed(() => this.categories.find((c) => c.id === this.activeTab())!);
}
