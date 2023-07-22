import React, { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Помилка при отриманні даних користувачів:', error));
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${selectedUserId}`)
        .then((response) => response.json())
        .then((data) => setAlbums(data))
        .catch((error) => console.error('Помилка при отриманні даних альбомів:', error));
    }
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedAlbumId) {
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbumId}`)
        .then((response) => response.json())
        .then((data) => setPhotos(data))
        .catch((error) => console.error('Помилка при отриманні даних фотографій:', error));
    }
  }, [selectedAlbumId]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setSelectedAlbumId(null);
  };

  const handleAlbumClick = (albumId) => {
    setSelectedAlbumId(albumId);
  };

  return (
    <div>
      <h1>Список користувачів</h1>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h2 onClick={() => handleUserClick(user.id)} style={{ cursor: 'pointer' }}>
              {user.name}
            </h2>
            {selectedUserId === user.id && (
              <div>
                {albums.map((album) => (
                  <div key={album.id}>
                    <button onClick={() => handleAlbumClick(album.id)}>Album {album.id}</button>
                    {selectedAlbumId === album.id && (
                      <div>
                        {photos
                          .filter((photo) => photo.albumId === album.id)
                          .map((photo) => (
                            <img key={photo.id} src={photo.thumbnailUrl} alt={`Фото ${photo.id}`} />
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;