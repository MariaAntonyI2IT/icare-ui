export const getFilteredRequestData = (data,payload) => {
  if(payload.searchText) {
    data = data.filter(d => d.name.toLowerCase().indexOf(payload.searchText.toLowerCase()) > -1);
  }
  if(payload.filter.type) {
    data = data.filter(d => d.type === payload.filter.type);
  }
  if(payload.filter.priority) {
    data = data.filter(d => d.tag === payload.filter.priority);
  }
  if(payload.filter.category) {
    data = data.filter((d) => {
      const product = d.products.filter(p => p.category === payload.filter.category);
      return product.length > 0;
    });
  }
  return data;
}