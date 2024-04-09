export const PAYMENT_METHODS: Option[] = [
  { name: 'ביט', code: 0 },
  { name: 'מזומן', code: 1 },
  { name: 'אשראי', code: 2 },
];

interface Option {
  name: string;
  code: number;
}
