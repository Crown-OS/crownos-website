const LONG_DATE = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
  timeZone: "UTC",
});

export const formatLongDate = (isoDate: string) =>
  LONG_DATE.format(new Date(isoDate));
