export const PAYMENT_METHODS: Option[] = [
  { name: 'ביט', code: 0 },
  { name: 'אשראי', code: 1 },
  { name: 'מזומן', code: 2 },
];

interface Option {
  name: string;
  code: number;
}
