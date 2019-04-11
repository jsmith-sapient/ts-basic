const mockGetElementById = () => {
  const ids: { [key: string]: object } = {};

  return (id: string) => {
    let elm = ids[id];
    if (elm) return elm;

    elm = ids[id] = { textContent: '' };
    return elm;
  };
};

Object.defineProperty(window, 'document', {
  value: {
    addEventListener: jest.fn().mockName('addEventListener'),
    getElementById: mockGetElementById(),
  },
});
