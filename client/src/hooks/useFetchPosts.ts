import { useEffect, useState } from 'react';
import { IFetchAllPostsResponse, IPost } from '../constants/interfaces';
import { fetchErrorHandler, fetchWrapper } from '../utils';

const useFetchAllPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const data = await fetchWrapper<IFetchAllPostsResponse>(
          `${import.meta.env.VITE_BACKEND_ENDPOINT}/posts`,
          {
            method: 'GET',
          }
        );

        setPosts(data.data);
      } catch (err) {
        const errMsg = fetchErrorHandler(err);
        setErrMsg(errMsg);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { posts, isLoading, errMsg };
};

export default useFetchAllPosts;
