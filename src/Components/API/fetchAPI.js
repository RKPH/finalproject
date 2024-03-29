export const fetchAPI = async () => {
    try {
      const response = await fetch('https://englishforum.zeabur.app/api/v1/posts?pageNo=0&pageSize=222&sortBy=id&sortDir=ASC');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  };