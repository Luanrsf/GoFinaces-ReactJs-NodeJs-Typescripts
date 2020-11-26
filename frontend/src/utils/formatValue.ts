const formatValue = (value: number): string =>
  Intl.NumberFormat('BRL', { style: 'currency', currency: 'BRL' }).format(value);


export default formatValue;
