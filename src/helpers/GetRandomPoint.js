import dimensions from '../data/constants';
const { width, height } = dimensions;

import GetRandomNumber from './GetRandomNumber';

const GetRandomPoint = (gridX, gridY) => {
  const gridXPart = (width / gridX);
  const gridYPart = (height / gridY);
  const x = Math.floor(GetRandomNumber() * gridX);
  const y = Math.floor(GetRandomNumber() * gridY);

  return {
    x: x * gridXPart + gridXPart / 2,
    y: y * gridYPart + gridYPart / 2
  }
}


export default GetRandomPoint;