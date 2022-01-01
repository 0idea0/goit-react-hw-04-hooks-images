import React, { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import Spinner from './components/Spinner/Spinner';

import fetchImages from './services/apiServices';

import './App.css';

export default function App() {
  const [modalContent, setModalContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [visibleImages, setVisibleImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    const getData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchImages(searchQuery, page);
        setVisibleImages(visibleImages => [...visibleImages, ...data.hits]);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [searchQuery, page]);

  const toggleModal = () => {
    setOpenModal(openModal => !openModal);
  };

  const handleChangeQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setVisibleImages([]);
  };

  const handleNextPage = () => {
    setPage(page => page + 1);
  };

  const modalContentSet = itemId => {
    const element = visibleImages.find(({ id }) => id === itemId);
    setModalContent(element.largeImageURL);
  };

  const isNotLastPage = visibleImages.length / page === 12;
  const btnEnable = visibleImages.length > 0 && !isLoading && isNotLastPage;
  return (
    <div className="App">
      <SearchBar onSubmit={handleChangeQuery} />

      <ImageGallery
        images={visibleImages}
        onClick={toggleModal}
        onItemClick={modalContentSet}
      />

      {openModal && <Modal content={modalContent} onBackdrop={toggleModal} />}
      {isLoading && <Spinner />}

      {btnEnable && <Button name="Load more" onPress={handleNextPage} />}
    </div>
  );
}

//export default App;
