// return popularbooks
import ListPopularAuthors from "../../../components/Popular/PopularAuthors";
import ListPopularBooks from '../../../components/Popular/PopularBooks';
import ListPopularCategories from "../../../components/Popular/PopularCategories";
const Home = () => {
  return (
    <>
      <ListPopularAuthors />
      <hr/>
      <ListPopularBooks />
      <hr/>
      <ListPopularCategories/>
    </>
  );
};

export default Home;
