import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { LucidePhone } from '@lucide/angular';
import { FadeInDirective } from '../../shared/fade-in.directive';
import { SectionLabelComponent } from '../../shared/section-label/section-label.component';

export interface MenuItem { name: string; description: string; price: string; highlight?: boolean; }
export interface MenuCategory { id: string; label: string; items: MenuItem[]; }

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'kebap', label: 'Kebap & Dürum', items: [
    { name: 'Lammkebap (Dürum)', description: 'Zart gegrilltes Lammhack, frische Kräuter, Tomaten, Zwiebeln im Fladenbrot.', price: '€ 9,90' },
    { name: 'Hähnchenkebap (Dürum)', description: 'Mariniertes Hähnchenbrustfleisch, knackiges Gemüse, Joghurtsauce.', price: '€ 8,90' },
    { name: 'Adana Kebap', description: 'Scharf gewürztes Hackfleisch vom Grill, serviert mit Fladenbrot und Salat.', price: '€ 11,90' },
    { name: 'Gemischter Kebap', description: 'Auswahl aus Lamm und Hähnchen, Beilagensalat, Fladenbrot.', price: '€ 12,90' },
    { name: 'Mantu', description: 'Handgefertigte Teigtaschen gefüllt mit Lammhack, serviert mit Tomatensauce, Joghurt und gebratener Minze.', price: '€ 11,90', highlight: true },
    { name: 'Aushak', description: 'Gefüllte Teigtaschen mit Lauch und Koriander, Joghurtsauce, Tomatensugo.', price: '€ 10,90' },
  ] },
  { id: 'grill', label: 'Grill & Fleisch', items: [
    { name: 'Lammkotelett', description: 'Saftige Lammkoteletts vom Grill, persischer Reis, Grillgemüse, Joghurtsauce.', price: '€ 21,90', highlight: true },
    { name: 'Joojeh Kebap', description: 'Ganzes Hähnchen, in Safran und Zitrone mariniert, über Holzkohle gegrillt.', price: '€ 16,90' },
    { name: 'Gegrilltes Hähnchen (halb)', description: 'Halbes Hähnchen, mit orientalischen Gewürzen, serviert mit Beilagensalat.', price: '€ 14,90' },
    { name: 'Gemischter Grillteller', description: 'Lammkebap, Hähnchenkebap, Kotelett – für den großen Hunger.', price: '€ 18,90' },
    { name: 'Chelo Kebap', description: 'Klassisches persisches Gericht: Safranreis, Grilltomate, Butter, Ei und Lammkebap.', price: '€ 17,90' },
  ] },
  { id: 'beilagen', label: 'Beilagen & Extras', items: [
    { name: 'Persischer Safranreis', description: 'Traditionell zubereiteter Basmati-Reis mit Safran und Butter (Tahdig).', price: '€ 3,50' },
    { name: 'Fladenbrot (Lavash)', description: 'Frisch gebackenes persisches Fladenbrot.', price: '€ 2,50' },
    { name: 'Gemischter Salat', description: 'Saisonaler Beilagensalat mit hausgemachtem Dressing.', price: '€ 4,90' },
    { name: 'Mast-o-Khiar', description: 'Persisches Joghurt mit Gurken, getrockneter Minze und Dill.', price: '€ 3,90' },
    { name: 'Zeytoun Parvardeh', description: 'Marinierte Oliven mit Granatapfelkernöl, Walnüssen und Kräutern.', price: '€ 4,50' },
    { name: 'Mirza Ghasemi', description: 'Geräuchertes Auberginenmus mit Tomaten, Knoblauch und Ei.', price: '€ 5,90' },
  ] },
];

@Component({
  selector: 'app-menu-section',
  imports: [FadeInDirective, SectionLabelComponent, LucidePhone],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  readonly categories = MENU_CATEGORIES;
  readonly activeTab = signal('kebap');
  readonly active = computed(() => this.categories.find((c) => c.id === this.activeTab())!);
}
