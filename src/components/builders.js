import {
  START_YEAR,
  NUM_OF_YEARS,
  MONTH_NAMES,
  MONTHS_PER_YEAR,
  NUM_OF_MONTHS,
  MAX_TRACK_START_GAP,
  MAX_ELEMENT_GAP,
  MAX_MONTH_SPAN,
  MIN_MONTH_SPAN,
} from './constants'

import { hexToRgb, colourIsLight, addMonthsToYearAsDate, createDate, nextColor, randomTitle } from './utils'

export const buildMonthCells = () => {
  const v = []
  for (let i = 0; i < MONTHS_PER_YEAR * NUM_OF_YEARS; i += 1) {
    const startMonth = i
    const start = addMonthsToYearAsDate(START_YEAR, startMonth)
    const end = addMonthsToYearAsDate(START_YEAR, startMonth + 1)
    v.push({
      id: `m${startMonth}`,
      title: MONTH_NAMES[i % 12],
      start,
      end,
    })
  }
  return v
}

export const buildTimebar = () => [ 
  {
    id: 'months',
    title: 'Months',
    cells: buildMonthCells(),
    useAsGrid: true,
    style: {},
  },
]

export const buildElement = ({ variety, start, end, type }) => {
  const bgColor = nextColor()
  const color = colourIsLight(...hexToRgb(bgColor)) ? '#000000' : '#ffffff'
  console.log("type in build: "+ type);
  return {
    id: `${variety}-${type}`,
    title: `${type}`,
    start,
    end,
    style: {
      backgroundColor: `#${bgColor}`,
      color,
      borderRadius: '4px',
      boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
      textTransform: 'capitalize',
    },
  }
}

export const buildTrackStartGap = () => Math.floor(Math.random() * MAX_TRACK_START_GAP)
export const buildElementGap = () => Math.floor(Math.random() * MAX_ELEMENT_GAP)

export const buildElements = tree => {
  const v = []
  const variety = tree.variety;
  console.log("variety: " + variety);
  let type = 'Bloom';
  let start;
  let end;

  if (tree.bloom === 'early') {
    start = createDate(START_YEAR, 4, 10);
    end = createDate(START_YEAR, 4, 20);
  } else if (tree.bloom === 'mid') {
    start = createDate(START_YEAR, 4, 21);
    end = createDate(START_YEAR, 5, 1);
  } else if (tree.bloom === 'early mid') {
    start = createDate(START_YEAR, 4, 15);
    end = createDate(START_YEAR, 4, 28);
   } else if (tree.bloom === "late") {
    start = createDate(START_YEAR, 5, 2);
    end = createDate(START_YEAR, 5, 12);
  } else if (tree.bloom === "mid late") {
    start = createDate(START_YEAR, 4, 29);
    end = createDate(START_YEAR, 5, 8);
  } else {
    start = createDate(START_YEAR, 4, 1);
    end = createDate(START_YEAR, 5, 28);
  }

  v.push(
    buildElement({
      variety,
      start,
      end,
      type
    })
  );

  type = 'Harvest';
  if (tree.harvest === 'september') {
    start = createDate(START_YEAR, 9, 1);
    end = createDate(START_YEAR, 10, 1);
  } else if (tree.harvest === 'mid september') {
    start = createDate(START_YEAR, 9, 10);
    end = createDate(START_YEAR, 9, 20);
  } else if (tree.harvest === 'late september') {
    start = createDate(START_YEAR, 9, 21);
    end = createDate(START_YEAR, 10, 1);
  } else if (tree.harvest === 'mid october') {
    start = createDate(START_YEAR, 10, 10);
    end = createDate(START_YEAR, 10, 20);
  } else {
    start = createDate(START_YEAR, 10, 21);
    end = createDate(START_YEAR, 11, 1);
  }

  v.push(
    buildElement({
      variety,
      start,
      end,
      type
    })
  );

  return v
}

export const buildTrack = tree => {
  return {
    id: `${tree.variety}`,
    title: `${tree.variety}`,
    elements: buildElements(tree),
    // hasButton: true,
    // link: 'www.google.com',
    // isOpen: true,
  }
}