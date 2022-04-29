export const isWebp = () => {
  const testWebP = (cb) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => cb(webP.height == 2);
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  };

  testWebP((support) => {
    const className = support ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
};
