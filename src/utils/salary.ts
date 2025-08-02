/**
 * Format salary amount to Vietnamese currency format
 * @param amount - Salary amount in VND
 * @returns Formatted salary string
 */
export function formatSalary(amount: number): string {
  if (amount >= 1000000000) {
    // Billions - format as "X.X tỷ"
    const billions = amount / 1000000000;
    return `${billions.toFixed(1).replace('.0', '')} tỷ`;
  } else if (amount >= 1000000) {
    // Millions - format as "X triệu" or "XX triệu"
    const millions = amount / 1000000;
    return `${millions.toFixed(0)} triệu`;
  } else if (amount >= 1000) {
    // Thousands - format as "X.XXX"
    return amount.toLocaleString('vi-VN');
  } else {
    return amount.toString();
  }
}

/**
 * Format salary range for display
 * @param min - Minimum salary
 * @param max - Maximum salary
 * @param currency - Currency code (default: VND)
 * @param period - Salary period (default: monthly)
 * @returns Formatted salary range string
 */
export function formatSalaryRange(
  min: number,
  max: number,
  currency: string = 'VND',
  period: string = 'monthly'
): string {
  const formattedMin = formatSalary(min);
  const formattedMax = formatSalary(max);
  
  const periodText = period === 'monthly' ? '/tháng' : 
                    period === 'yearly' ? '/năm' : 
                    period === 'hourly' ? '/giờ' : '';
  
  if (min === max) {
    return `${formattedMin} ${currency}${periodText}`;
  }
  
  return `${formattedMin} - ${formattedMax} ${currency}${periodText}`;
}
