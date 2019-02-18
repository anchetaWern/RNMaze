var seed = 1;
const GetRandomNumber = () => {

  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
  
}

export default GetRandomNumber;