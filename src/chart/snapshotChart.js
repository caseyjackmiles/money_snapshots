const TEST_DATA = {
  datasets: [
    {
      label: 'Account 1',
      stack: 'accounts',
      backgroundColor: 'SteelBlue',
      data: [
        {x: '2019-04-01', y: 20},
        {x: '2019-05-01', y: 15},
        {x: '2019-06-01', y: 12}
      ]
    },
    {
      label: 'Account 2',
      stack: 'accounts',
      backgroundColor: 'CadetBlue',
      data: [
        {x: '2019-04-01', y: -5},
        {x: '2019-05-01', y: 4},
        {x: '2019-06-01', y: 0},
        {x: '2019-12-22', y: 15}
      ]
    }
  ],
};

const CHART_CONFIG = {
  type: 'bar',
  data: TEST_DATA,
  options: {
    responsive: false,
    scales: {
      xAxes: [{
        type: 'time',
        ticks: {
          source: 'data',
        },
        stacked: true
      }]
    }
  }
};

const SnapshotChart = {
  oncreate: (vnode) => {
    new Chart(vnode.dom, CHART_CONFIG);
  },

  view: (vnode) => {
    return m(
      'canvas#snapshotChart',
      { width: '400', height: '400' },
    );
  }
}

export default SnapshotChart;