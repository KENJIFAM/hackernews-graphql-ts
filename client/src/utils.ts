const timeDifference = (current: number, previous: number) => {
  const milliSecondPerMinute = 60 * 1000;
  const milliSecondPerHour = milliSecondPerMinute * 60;
  const milliSecondPerDay = milliSecondPerHour * 24;
  const milliSecondPerMonth = milliSecondPerDay * 30;
  const milliSecondPerYear = milliSecondPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondPerMinute / 3) {
    return 'just now';
  }

  if (elapsed < milliSecondPerMinute) {
    return 'less than 1 min ago';
  } else if (elapsed < milliSecondPerHour) {
    return Math.round(elapsed / milliSecondPerMinute) + ' min ago';
  } else if (elapsed < milliSecondPerDay) {
    return Math.round(elapsed / milliSecondPerHour) + ' h ago';
  } else if (elapsed < milliSecondPerMonth) {
    return Math.round(elapsed / milliSecondPerDay) + ' days ago';
  } else if (elapsed < milliSecondPerYear) {
    return Math.round(elapsed / milliSecondPerMonth) + ' months ago';
  } else {
    return Math.round(elapsed / milliSecondPerYear) + ' years ago';
  }
};

export const timeDifferenceForDate = (date: Date) => {
  const now = new Date().getTime();
  const updated = new Date(date).getTime();
  return timeDifference(now, updated);
}
