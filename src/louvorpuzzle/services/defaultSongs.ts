import type { Song } from '../types';

// Web Audio synth track generator function for royalty-free sample playback
export function createSynthAudioDataUrl(songType: 'SANTO' | 'VIVE' | 'LEAO' | 'GRANDE'): string {
  const sampleRate = 22050;
  const durationSec = 180;
  const numSamples = sampleRate * durationSec;
  const buffer = new Int16Array(numSamples);

  let chordFreqs = [261.63, 329.63, 392.00, 523.25];
  if (songType === 'SANTO') chordFreqs = [329.63, 392.00, 493.88, 659.25];
  if (songType === 'LEAO') chordFreqs = [293.66, 369.99, 440.00, 587.33];
  if (songType === 'GRANDE') chordFreqs = [349.23, 440.00, 523.25, 698.46];

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;
    for (let f = 0; f < chordFreqs.length; f++) {
      const freq = chordFreqs[f] + Math.sin(t * 1.5 + f) * 1.2;
      const wave = Math.sin(2 * Math.PI * freq * t) * 0.12;
      const sub = Math.sin(2 * Math.PI * (freq / 2) * t) * 0.08;
      sample += wave + sub;
    }
    const env = Math.min(1, t / 3.0) * Math.min(1, (durationSec - t) / 3.0);
    buffer[i] = Math.max(-32768, Math.min(32767, Math.floor(sample * env * 16384)));
  }

  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  view.setUint32(0, 0x52494646, false);
  view.setUint32(4, 36 + numSamples * 2, true);
  view.setUint32(8, 0x57415645, false);
  view.setUint32(12, 0x666d7420, false);
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  view.setUint32(36, 0x64617461, false);
  view.setUint32(40, numSamples * 2, true);

  const blob = new Blob([header, buffer], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}

export const DEFAULT_SONGS: Song[] = [
  {
    id: 'santo-pra-sempre',
    title: 'Santo Pra Sempre',
    artist: 'Gabriel Guedes / Fernandinho',
    category: 'ADORAÇÃO',
    coverGradient: 'from-amber-500 via-purple-600 to-indigo-900',
    audioUrl: '',
    duration: 180,
    phrases: [
      { id: 'sps-1', text: 'Um milhar de gerações', start: 0, end: 4.5, clozeText: 'Um milhar de _____' },
      { id: 'sps-2', text: 'Prostrados em adoração', start: 4.5, end: 9.0, clozeText: 'Prostrados em _____' },
      { id: 'sps-3', text: 'Cantam o cântico ao Cordeiro', start: 9.0, end: 13.5, clozeText: 'Cantam o cântico ao _____' },
      { id: 'sps-4', text: 'E aqueles que já foram', start: 13.5, end: 18.0, clozeText: 'E aqueles que já _____' },
      { id: 'sps-5', text: 'E os que dEle crerem', start: 18.0, end: 22.5, clozeText: 'E os que dEle _____' },
      { id: 'sps-6', text: 'Cantarão o cântico ao Cordeiro', start: 22.5, end: 27.0, clozeText: 'Cantarão o cântico ao _____' },
      { id: 'sps-7', text: 'Seu nome é o mais alto', start: 27.0, end: 31.5, clozeText: 'Seu nome é o mais _____' },
      { id: 'sps-8', text: 'Seu nome é o mais santo', start: 31.5, end: 36.0, clozeText: 'Seu nome é o mais _____' },
      { id: 'sps-9', text: 'Seu nome é sobre todos', start: 36.0, end: 40.5, clozeText: 'Seu nome é sobre _____' },
      { id: 'sps-10', text: 'Tronos e domínios', start: 40.5, end: 45.0, clozeText: 'Tronos e _____' },
      { id: 'sps-11', text: 'Seu nome é sobre tudo', start: 45.0, end: 49.5, clozeText: 'Seu nome é sobre _____' },
      { id: 'sps-12', text: 'Anjos cantam: Santo!', start: 49.5, end: 54.0, clozeText: 'Anjos cantam: _____!' },
      { id: 'sps-13', text: 'Toda a criação: Santo!', start: 54.0, end: 58.5, clozeText: 'Toda a criação: _____!' },
      { id: 'sps-14', text: 'Tu és Santo!', start: 58.5, end: 63.0, clozeText: 'Tu és _____!' },
      { id: 'sps-15', text: 'Santo para sempre!', start: 63.0, end: 68.0, clozeText: 'Santo para _____!' }
    ]
  },
  {
    id: 'porque-ele-vive',
    title: 'Porque Ele Vive',
    artist: 'Harpa Cristã / Adoração',
    category: 'HINO',
    coverGradient: 'from-emerald-500 via-teal-700 to-slate-900',
    audioUrl: '',
    duration: 160,
    phrases: [
      { id: 'pev-1', text: 'Deus enviou seu Filho amado', start: 0, end: 5.0, clozeText: 'Deus enviou seu _____ amado' },
      { id: 'pev-2', text: 'Para morrer em meu lugar', start: 5.0, end: 10.0, clozeText: 'Para morrer em meu _____' },
      { id: 'pev-3', text: 'Na cruz pagou pelos meus pecados', start: 10.0, end: 15.0, clozeText: 'Na cruz pagou pelos meus _____' },
      { id: 'pev-4', text: 'Mas o sepulcro vazio está', start: 15.0, end: 20.0, clozeText: 'Mas o sepulcro _____ está' },
      { id: 'pev-5', text: 'Porque Ele vive, posso crer no amanhã', start: 20.0, end: 25.5, clozeText: 'Porque Ele vive, posso crer no _____' },
      { id: 'pev-6', text: 'Porque Ele vive, temor não há', start: 25.5, end: 30.5, clozeText: 'Porque Ele vive, temor _____ há' },
      { id: 'pev-7', text: 'Mas eu bem sei que a minha vida', start: 30.5, end: 35.5, clozeText: 'Mas eu bem sei que a minha _____' },
      { id: 'pev-8', text: 'Está nas mãos do meu Jesus que vivo está', start: 35.5, end: 42.0, clozeText: 'Está nas mãos do meu Jesus que _____ está' }
    ]
  },
  {
    id: 'ruja-o-leao',
    title: 'Ruja o Leão / Que Se Abram Os Céus',
    artist: 'FHOP / Isaías Saad',
    category: 'LOUVOR',
    coverGradient: 'from-orange-500 via-red-600 to-purple-950',
    audioUrl: '',
    duration: 170,
    phrases: [
      { id: 'rol-1', text: 'Sobre o trono de justiça', start: 0, end: 4.5, clozeText: 'Sobre o trono de _____' },
      { id: 'rol-2', text: 'Está assentado o Rei dos reis', start: 4.5, end: 9.0, clozeText: 'Está assentado o _____ dos reis' },
      { id: 'rol-3', text: 'Que se abram os céus', start: 9.0, end: 13.0, clozeText: 'Que se abram os _____' },
      { id: 'rol-4', text: 'O Teu reino venha', start: 13.0, end: 17.0, clozeText: 'O Teu reino _____' },
      { id: 'rol-5', text: 'Nossa fé está firmada em Ti', start: 17.0, end: 21.5, clozeText: 'Nossa fé está firmada em _____' },
      { id: 'rol-6', text: 'Ruja o leão!', start: 21.5, end: 25.5, clozeText: 'Ruja o _____!' },
      { id: 'rol-7', text: 'Que a terra trema', start: 25.5, end: 29.5, clozeText: 'Que a terra _____' },
      { id: 'rol-8', text: 'Diante da Glória do Senhor', start: 29.5, end: 34.0, clozeText: 'Diante da Glória do _____' }
    ]
  },
  {
    id: 'quao-grande-e-o-meu-deus',
    title: 'Quão Grande É o Meu Deus',
    artist: 'Soraya Moraes / Chris Tomlin',
    category: 'POPULAR',
    coverGradient: 'from-cyan-500 via-blue-700 to-purple-900',
    audioUrl: '',
    duration: 175,
    phrases: [
      { id: 'qgm-1', text: 'Quão grande é o meu Deus', start: 0, end: 4.5, clozeText: 'Quão grande é o meu _____' },
      { id: 'qgm-2', text: 'Cantarei quão grande é o meu Deus', start: 4.5, end: 9.5, clozeText: 'Cantarei quão grande é o meu _____' },
      { id: 'qgm-3', text: 'E todos hão de ver quão grande é o meu Deus', start: 9.5, end: 15.0, clozeText: 'E todos hão de ver quão grande é o meu _____' },
      { id: 'qgm-4', text: 'Com esplendor de um Rei', start: 15.0, end: 19.5, clozeText: 'Com esplendor de um _____' },
      { id: 'qgm-5', text: 'Vestido de majestade', start: 19.5, end: 24.0, clozeText: 'Vestido de _____' },
      { id: 'qgm-6', text: 'A terra se alegra, a terra se alegra', start: 24.0, end: 29.0, clozeText: 'A terra se alegra, a terra se _____' },
      { id: 'qgm-7', text: 'Ele envolve a luz', start: 29.0, end: 33.0, clozeText: 'Ele envolve a _____' },
      { id: 'qgm-8', text: 'E as trevas vão fugir', start: 33.0, end: 37.5, clozeText: 'E as trevas vão _____' }
    ]
  }
];

export const DISTRACTOR_POOL = [
  'Eu Te adorarei',
  'Meu coração é Teu',
  'Para sempre amém',
  'Tu és digno de glória',
  'Aleluia ao Senhor',
  'Grande é o Teu nome',
  'O Teu amor me resgatou',
  'Vem Espírito Santo',
  'Rendo graças a Ti',
  'Glória nas alturas'
];
