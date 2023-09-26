const subtractMinutes = (dateTimeString: string, minutes: number): string => {
  let timeDifference = new Date(dateTimeString);
  timeDifference.setMinutes(timeDifference.getMinutes() - minutes);
  return timeDifference.toISOString();
};

export const PedidosTimeService = {
  subtractMinutes,
};
