"use client";

import { formatDistanceToNow, format, subMonths, isAfter } from "date-fns";
import { ja } from "date-fns/locale";

type DynamicDateFormatProps = {
  date: string;
  className?: string;
};

const DynamicDateFormat = ({ date, className }: DynamicDateFormatProps) => {
  const targetDate = new Date(date);

  // 6ヶ月以内かどうかをチェック
  const sixMonthsAgo = subMonths(new Date(), 7);
  const isNew = isAfter(targetDate, sixMonthsAgo);

  const formattedDate = isNew
    ? formatDistanceToNow(targetDate, { addSuffix: true, locale: ja })
    : format(targetDate, "yyyy年MM月dd日", { locale: ja });

  return (
    <time className={className} dateTime={date}>
      {formattedDate}
    </time>
  );
};

export default DynamicDateFormat;
