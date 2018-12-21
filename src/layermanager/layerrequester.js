// import data from './data';
import LayerListStore from './layerliststore';
import readAsync from './readasync';

// const requestAll = () => {
//   return 
// };

const layerRequester = async function layerRequester({
  type = 'all',
  url
}  = {}) {
  if (type === 'all') {
    const { error, data } = await readAsync(fetch(url).then(response => response.json()));
    if (error) {
      console.log(error);
    } else {
      LayerListStore.updateList(data.layers);
    }
  }
  return [];
};

export default layerRequester;