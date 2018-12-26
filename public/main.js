const getProp = (arr, prop) => {
  return arr.map(item => item[prop]);
};

const draw = (data, labels, colors) => {
  const ctx = document.getElementById('chart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Spread',
          data: data,
          backgroundColor: colors
        }
      ]
    },
    options: {
      tooltips: {
        cornerRadius: 0,
        caretSize: 0,
        xPadding: 16,
        yPadding: 10,
        backgroundColor: 'gray',
        titleFontStyle: 'normal',
        titleMarginBottom: 15
      }
    }
  });
};

fetch('/api')
  .then(res => res.json())
  .then(res => {
    draw(getProp(res, 'spread'), getProp(res, 'market'), getProp(res, 'color'));
  });
