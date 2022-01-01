const api = '24008986-b9e59c87644741a78fcf9dc58';
const url = 'https://pixabay.com/api/?';

const fetchImages = (searchQuery, page) => {
  const fetchUrl = `${url}q=${searchQuery}&page=${page}&key=${api}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(fetchUrl).then(res => res.json());
};

export default fetchImages;
