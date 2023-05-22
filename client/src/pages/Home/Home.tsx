import { useRef, useState } from 'react';
import Spinner from '../../components/Loader/Spinner/Spinner';
import { FormFieldNames, IPost } from '../../constants/interfaces';
import Card from '../../components/Card/Card';
import useFetchAllPosts from '../../hooks/useFetchPosts';
import FormField from '../../components/Form/FormField/FormField';

const RenderCards = ({
  data,
  txtForNotFound,
}: {
  data: IPost[];
  txtForNotFound: string;
}) => {
  if (data?.length <= 0) {
    return (
      <h2 className="mt-5 whitespace-nowrap text-xl font-bold uppercase text-purple">
        {txtForNotFound}
      </h2>
    );
  }
  return (
    <>
      {data?.map((post: IPost) => (
        <Card key={post._id} {...post} />
      ))}
    </>
  );
};

const Home = () => {
  const { posts, isLoading, errMsg } = useFetchAllPosts();
  const [searchedResults, setSearchedResults] = useState<IPost[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const timeOutRef = useRef<number | null>(null);

  const searchChangeHandler = (input: string) => {
    // reset when input is empty
    if (searchText === '') {
      setSearchedResults(posts);
    }

    clearTimeout(timeOutRef.current as number);
    setSearchText(input);

    // the searchText is not updated immediately after the setSearchText but in the next batch update cycle

    // WRONG: post?.name?.toLowerCase().includes(searchText.toLowerCase())
    // RIGHT: post?.name?.toLowerCase().includes(input.toLowerCase())

    timeOutRef.current = setTimeout(() => {
      const filteredResults = posts.filter(
        (post: IPost) =>
          post?.name?.toLowerCase().includes(input.toLowerCase()) ||
          post?.prompt?.toLowerCase().includes(input.toLowerCase())
      );
      setSearchedResults(filteredResults);
    }, 1000);
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div className="home__title-wrapper">
        <h1 className="text-2xl font-extrabold capitalize text-fontDefault">
          the community showcase
        </h1>
        <p className="mt-2 max-w-lg text-sm text-darkGrey">
          Browse through a collection of imaginative and visually stunning
          images created by DALL-E AI.
        </p>
      </div>
      <div className="home__form-wrapper mt-16">
        <FormField
          label="Search posts"
          name={FormFieldNames.Search}
          type="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={searchChangeHandler}
        />
      </div>

      {errMsg ? (
        <h2 className="mt-5 inline-block self-start whitespace-nowrap rounded-md bg-rose-500 px-3 py-1 text-xl font-bold uppercase text-white">
          {errMsg}
        </h2>
      ) : null}

      <div className="home__gallery-container mt-10">
        {!isLoading ? (
          <>
            {searchText ? (
              <h2 className="mb-3 text-xl font-medium text-darkGrey">
                Showing results for
                <span className="font-bold italic text-fontDefault">
                  {' '}
                  {searchText}
                </span>
              </h2>
            ) : null}
            <div className="home__gallery grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  txtForNotFound={`No search results found`}
                />
              ) : (
                <RenderCards data={posts} txtForNotFound={`No posts found`} />
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
