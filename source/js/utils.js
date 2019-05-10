const _getDifferenceColor = () => {
  let color = {
    background: {
      h: getRandomInteger(0, 103),
      s: getRandomInteger(0, 40),
      l: getRandomInteger(40, 60)
    },
    text: {
      h: getRandomInteger(153, 256),
      s: getRandomInteger(60, 100),
      l: getRandomInteger(40, 60)
    },
  };
  return color;
};

export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const getrandomColor = () => {
  let color = {};
  const hsl = _getDifferenceColor();
  const colorBackground = `(${hsl.background.h.toString()}, ${hsl.background.s.toString()}%, ${hsl.background.l.toString()}%)`;
  const colorText = `(${hsl.text.h.toString()}, ${hsl.text.s.toString()}%, ${hsl.text.l.toString()}%)`;
  color.background = colorBackground;
  color.text = colorText;
  return color;
};

export const getPosition = (e) => {
  let posx = 0;
  let posy = 0;

  if (!e) {
    e = window.event;
  }

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy
  };
};
