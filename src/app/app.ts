import { Component, computed, signal } from '@angular/core';

type TabKey = 'varnmala' | 'barakhadi';

interface Letter {
  symbol: string;
  transliteration: string;
  exampleWord: string;
  meaning: string;
  icon: string;
}

const vowels: Letter[] = [
  { symbol: 'अ', transliteration: 'A', exampleWord: 'अनार', meaning: 'Pomegranate', icon: '🍎' },
  { symbol: 'आ', transliteration: 'Aa', exampleWord: 'आम', meaning: 'Mango', icon: '🥭' },
  { symbol: 'इ', transliteration: 'I', exampleWord: 'इमली', meaning: 'Tamarind', icon: '🍋' },
  { symbol: 'ई', transliteration: 'Ee', exampleWord: 'ईख', meaning: 'Sugarcane', icon: '🎋' },
  { symbol: 'उ', transliteration: 'U', exampleWord: 'उरग', meaning: 'Snake', icon: '🐍' },
  { symbol: 'ऊ', transliteration: 'Oo', exampleWord: 'ऊँट', meaning: 'Camel', icon: '🐪' },
  { symbol: 'ऋ', transliteration: 'Ri', exampleWord: 'ऋतु', meaning: 'Season', icon: '🌦️' },
  { symbol: 'ए', transliteration: 'E', exampleWord: 'एल्विश', meaning: 'Aloe', icon: '🌿' },
  { symbol: 'ऐ', transliteration: 'Ai', exampleWord: 'ऐनक', meaning: 'Spectacles', icon: '🕶️' },
  { symbol: 'ओ', transliteration: 'O', exampleWord: 'ओखली', meaning: 'Mortar', icon: '🥣' },
  { symbol: 'औ', transliteration: 'Au', exampleWord: 'औषधि', meaning: 'Medicine', icon: '🌼' },
  { symbol: 'अं', transliteration: 'An', exampleWord: 'अंगूर', meaning: 'Grapes', icon: '🍇' },
  { symbol: 'अः', transliteration: 'Ah', exampleWord: 'अः', meaning: 'Sound of breath', icon: '✨' },
];

const consonants: Letter[] = [
  { symbol: 'क', transliteration: 'Ka', exampleWord: 'कमल', meaning: 'Lotus', icon: '🪷' },
  { symbol: 'ख', transliteration: 'Kha', exampleWord: 'खजूर', meaning: 'Dates', icon: '🌴' },
  { symbol: 'ग', transliteration: 'Ga', exampleWord: 'गुलाब', meaning: 'Rose', icon: '🌹' },
  { symbol: 'घ', transliteration: 'Gha', exampleWord: 'घड़ी', meaning: 'Clock', icon: '⏰' },
  { symbol: 'ङ', transliteration: 'Nga', exampleWord: 'ङ', meaning: 'Nasal sound', icon: '🎵' },
  { symbol: 'च', transliteration: 'Cha', exampleWord: 'चमक', meaning: 'Sparkle', icon: '✨' },
  { symbol: 'छ', transliteration: 'Chha', exampleWord: 'छत', meaning: 'Roof', icon: '🏠' },
  { symbol: 'ज', transliteration: 'Ja', exampleWord: 'जलेबी', meaning: 'Jalebi', icon: '🍮' },
  { symbol: 'झ', transliteration: 'Jha', exampleWord: 'झूला', meaning: 'Swing', icon: '🎠' },
  { symbol: 'ञ', transliteration: 'Nya', exampleWord: 'ञ', meaning: 'Sound', icon: '🎶' },
  { symbol: 'ट', transliteration: 'Ta', exampleWord: 'टमाटर', meaning: 'Tomato', icon: '🍅' },
  { symbol: 'ठ', transliteration: 'Tha', exampleWord: 'ठेला', meaning: 'Bag', icon: '👜' },
  { symbol: 'ड', transliteration: 'Da', exampleWord: 'डमरू', meaning: 'Damaru', icon: '🥁' },
  { symbol: 'ढ', transliteration: 'Dha', exampleWord: 'ढोल', meaning: 'Drum', icon: '🥁' },
  { symbol: 'ण', transliteration: 'Na', exampleWord: 'ण', meaning: 'Sound', icon: '🎵' },
  { symbol: 'त', transliteration: 'Ta', exampleWord: 'तारा', meaning: 'Star', icon: '⭐' },
  { symbol: 'थ', transliteration: 'Tha', exampleWord: 'थाली', meaning: 'Plate', icon: '🍽️' },
  { symbol: 'द', transliteration: 'Da', exampleWord: 'दूध', meaning: 'Milk', icon: '🥛' },
  { symbol: 'ध', transliteration: 'Dha', exampleWord: 'धूप', meaning: 'Sunshine', icon: '☀️' },
  { symbol: 'न', transliteration: 'Na', exampleWord: 'नमक', meaning: 'Salt', icon: '🧂' },
  { symbol: 'प', transliteration: 'Pa', exampleWord: 'पपीता', meaning: 'Papaya', icon: '🍈' },
  { symbol: 'फ', transliteration: 'Pha', exampleWord: 'फल', meaning: 'Fruit', icon: '🍍' },
  { symbol: 'ब', transliteration: 'Ba', exampleWord: 'बगीचा', meaning: 'Garden', icon: '🌳' },
  { symbol: 'भ', transliteration: 'Bha', exampleWord: 'भोर', meaning: 'Morning', icon: '🌅' },
  { symbol: 'म', transliteration: 'Ma', exampleWord: 'मछली', meaning: 'Fish', icon: '🐟' },
  { symbol: 'य', transliteration: 'Ya', exampleWord: 'यह', meaning: 'This', icon: '👀' },
  { symbol: 'र', transliteration: 'Ra', exampleWord: 'रोटी', meaning: 'Bread', icon: '🍞' },
  { symbol: 'ल', transliteration: 'La', exampleWord: 'लड्डू', meaning: 'Sweet', icon: '🍬' },
  { symbol: 'व', transliteration: 'Va', exampleWord: 'वन', meaning: 'Forest', icon: '🌲' },
  { symbol: 'श', transliteration: 'Sha', exampleWord: 'शेर', meaning: 'Lion', icon: '🦁' },
  { symbol: 'ष', transliteration: 'Sha', exampleWord: 'षट', meaning: 'Six', icon: '🔢' },
  { symbol: 'स', transliteration: 'Sa', exampleWord: 'सूरज', meaning: 'Sun', icon: '☀️' },
  { symbol: 'ह', transliteration: 'Ha', exampleWord: 'हाथी', meaning: 'Elephant', icon: '🐘' },
  { symbol: 'क्ष', transliteration: 'Ksha', exampleWord: 'क्षेत्र', meaning: 'Field', icon: '🌾' },
  { symbol: 'ज्ञ', transliteration: 'Gya', exampleWord: 'ज्ञान', meaning: 'Knowledge', icon: '🧠' },
];

const barakhadiMap: Record<string, string[]> = {
  क: ['क', 'का', 'कि', 'की', 'कु', 'कू', 'के', 'कै', 'को', 'कौ', 'कं', 'कः'],
  ख: ['ख', 'खा', 'खि', 'खी', 'खु', 'खू', 'खे', 'खै', 'खो', 'खौ', 'खं', 'खः'],
  ग: ['ग', 'गा', 'गि', 'गी', 'गु', 'गू', 'गे', 'गै', 'गो', 'गौ', 'गं', 'गः'],
  घ: ['घ', 'घा', 'घि', 'घी', 'घु', 'घू', 'घे', 'घै', 'घो', 'घौ', 'घं', 'घः'],
  ङ: ['ङ', 'ङा', 'ङि', 'ङी', 'ङु', 'ङू', 'ङे', 'ङै', 'ङो', 'ङौ', 'ङं', 'ङः'],
  च: ['च', 'चा', 'चि', 'ची', 'चु', 'चू', 'चे', 'चै', 'चो', 'चौ', 'चं', 'चः'],
  छ: ['छ', 'छा', 'छि', 'छी', 'छु', 'छू', 'छे', 'छै', 'छो', 'छौ', 'छं', 'छः'],
  ज: ['ज', 'जा', 'जि', 'जी', 'जु', 'जू', 'जे', 'जै', 'जो', 'जौ', 'जं', 'जः'],
  झ: ['झ', 'झा', 'झि', 'झी', 'झु', 'झू', 'झे', 'झै', 'झो', 'झौ', 'झं', 'झः'],
  ञ: ['ञ', 'ञा', 'ञि', 'ञी', 'ञु', 'ञू', 'ञे', 'ञै', 'ञो', 'ञौ', 'ञं', 'ञः'],
  ट: ['ट', 'टा', 'टि', 'टी', 'टु', 'टू', 'टे', 'टै', 'टो', 'टौ', 'टं', 'टः'],
  ठ: ['ठ', 'ठा', 'ठि', 'ठी', 'ठु', 'ठू', 'ठे', 'ठै', 'ठो', 'ठौ', 'ठं', 'ठः'],
  ड: ['ड', 'डा', 'डि', 'डी', 'डु', 'डू', 'डे', 'डै', 'डो', 'डौ', 'डं', 'डः'],
  ढ: ['ढ', 'ढा', 'ढि', 'ढी', 'ढु', 'ढू', 'ढे', 'ढै', 'ढो', 'ढौ', 'ढं', 'ढः'],
  ण: ['ण', 'णा', 'णि', 'णी', 'णु', 'णू', 'णे', 'णै', 'णो', 'णौ', 'णं', 'णः'],
  त: ['त', 'ता', 'ति', 'ती', 'तु', 'तू', 'ते', 'तै', 'तो', 'तौ', 'तं', 'तः'],
  थ: ['थ', 'था', 'थि', 'थी', 'थु', 'थू', 'थे', 'थै', 'थो', 'थौ', 'थं', 'थः'],
  द: ['द', 'दा', 'दि', 'दी', 'दु', 'दू', 'दे', 'दै', 'दो', 'दौ', 'दं', 'दः'],
  ध: ['ध', 'धा', 'धि', 'धी', 'धु', 'धू', 'धे', 'धै', 'धो', 'धौ', 'धं', 'धः'],
  न: ['न', 'ना', 'नि', 'नी', 'नु', 'नू', 'ने', 'नै', 'नो', 'नौ', 'नं', 'नः'],
  प: ['प', 'पा', 'पि', 'पी', 'पु', 'पू', 'पे', 'पै', 'पो', 'पौ', 'पं', 'पः'],
  फ: ['फ', 'फा', 'फि', 'फी', 'फु', 'फू', 'फे', 'फै', 'फो', 'फौ', 'फं', 'फः'],
  ब: ['ब', 'बा', 'बि', 'बी', 'बु', 'बू', 'बे', 'बै', 'बो', 'बौ', 'बं', 'बः'],
  भ: ['भ', 'भा', 'भि', 'भी', 'भु', 'भू', 'भे', 'भै', 'भो', 'भौ', 'भं', 'भः'],
  म: ['म', 'मा', 'मि', 'मी', 'मु', 'मू', 'मे', 'मै', 'मो', 'मौ', 'मं', 'मः'],
  य: ['य', 'या', 'यि', 'यी', 'यु', 'यू', 'ये', 'यै', 'यो', 'यौ', 'यं', 'यः'],
  र: ['र', 'रा', 'रि', 'री', 'रु', 'रू', 'रे', 'रै', 'रो', 'रौ', 'रं', 'रः'],
  ल: ['ल', 'ला', 'लि', 'ली', 'लु', 'लू', 'ले', 'लै', 'लो', 'लौ', 'लं', 'लः'],
  व: ['व', 'वा', 'वि', 'वी', 'वु', 'वू', 'वे', 'वै', 'वो', 'वौ', 'वं', 'वः'],
  श: ['श', 'शा', 'शि', 'शी', 'शु', 'शू', 'शे', 'शै', 'शो', 'शौ', 'शं', 'शः'],
  ष: ['ष', 'षा', 'षि', 'षी', 'षु', 'षू', 'षे', 'षै', 'षो', 'षौ', 'षं', 'षः'],
  स: ['स', 'सा', 'सि', 'सी', 'सु', 'सू', 'से', 'सै', 'सो', 'सौ', 'सं', 'सः'],
  ह: ['ह', 'हा', 'हि', 'ही', 'हु', 'हू', 'हे', 'है', 'हो', 'हौ', 'हं', 'हः'],
  क्ष: ['क्ष', 'क्षा', 'क्षि', 'क्षी', 'क्षु', 'क्षू', 'क्षे', 'क्षै', 'क्षो', 'क्षौ', 'क्षं', 'क्षः'],
  ज्ञ: ['ज्ञ', 'ज्ञा', 'ज्ञि', 'ज्ञी', 'ज्ञु', 'ज्ञू', 'ज्ञे', 'ज्ञै', 'ज्ञो', 'ज्ञौ', 'ज्ञं', 'ज्ञः'],
};

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly activeTab = signal<TabKey>('varnmala');
  protected readonly selectedLetter = signal<Letter | null>(null);
  protected readonly selectedConsonant = signal<string>('क');
  protected readonly barakhadiModalOpen = signal<boolean>(false);
  protected readonly pulseKey = signal<string | null>(null);

  protected readonly vowelLetters = vowels;
  protected readonly consonantLetters = consonants;
  protected readonly barakhadiOptions = Object.keys(barakhadiMap);

  protected readonly selectedBarakhadi = computed(() => barakhadiMap[this.selectedConsonant()] ?? []);

  protected setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  protected openLetter(letter: Letter): void {
    this.selectedLetter.set(letter);
    this.animate(letter.symbol);
    this.speak(letter.symbol);
  }

  protected closeLetter(): void {
    this.selectedLetter.set(null);
  }

  protected chooseConsonant(consonant: string): void {
    this.selectedConsonant.set(consonant);
    this.barakhadiModalOpen.set(true);
    this.animate(consonant);
    this.speak(consonant);
  }

  protected closeBarakhadiModal(): void {
    this.barakhadiModalOpen.set(false);
  }

  protected playBarakhadi(value: string): void {
    this.animate(value);
    this.speak(value);
  }

  protected speak(text: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    synth.speak(utterance);
  }

  private animate(key: string): void {
    this.pulseKey.set(key);
    window.setTimeout(() => {
      this.pulseKey.set(null);
    }, 500);
  }
}
