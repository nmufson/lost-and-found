const formatTime = (deciseconds: number) => {
  const minutes = Math.floor(deciseconds / 600);
  const seconds = Math.floor((deciseconds % 600) / 10);
  const deciSeconds = deciseconds % 10;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${deciSeconds}`;
};

export default formatTime;
