const CHART_CONFIG = {
  type: 'bar',
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
    const { data } = vnode.attrs;
    const chartData = Object.assign({ data }, CHART_CONFIG);
    new Chart(vnode.dom, chartData);
  },

  view: (vnode) => {
    return m(
      'canvas#snapshotChart',
      { width: '400', height: '400' },
    );
  }
}

export default SnapshotChart;