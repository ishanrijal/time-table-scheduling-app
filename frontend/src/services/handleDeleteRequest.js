import axios from 'axios';

const deleteRecords = async (slug, id) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/${slug}/${id}/`);
  } catch (error) {
    throw new Error('Failed to delete record');
  }
};

export default deleteRecords;