export default [
    {
      selector: 'node',
      style: {
        'width': '150',
        'height': '150',
        'font-size': '18',
        'font-weight': 'bold',
        'content': `data(label)`,
        'text-valign': 'center',
        'text-wrap': 'wrap',
        'text-max-width': '140',
        'background-color': '#e0e7ff',
        'border-color': '#f4f4f5',
        'border-width': '8',
        'color': '#020617'
      }
    },
    {
        selector: 'node[type = "Niche"]',
        style: {
          'background-color': '#eef2ff'
        }
    },
    {
        selector: 'node[type = "Important"]',
        style: {
          'background-color': '#a5b4fc'
        }
    },
    {
      selector: 'node:selected',
      style: {
        'background-color': '#818cf8',
        color: 'white',
        'border-color': '#52525b',
        'line-color': '#0e76ba',
        'target-arrow-color': '#0e76ba'
      }
    },
    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'color': '#64748b',
        'text-background-color': '#ffffff',
        'text-background-opacity': '1',
        'text-background-padding': '3',
        'width': '6',
        'target-arrow-shape': 'triangle',
        'line-color': '#64748b',
        'target-arrow-color': '#64748b',
        'font-weight': 'bold'
      }
    },
    {
      selector: 'edge[label]',
      style: {
        'content': `data(label)`,
      }
    },
    {
      selector: 'edge.label',
      style: {
        'line-color': 'orange',
        'target-arrow-color': 'orange'
      }
    }
  ]