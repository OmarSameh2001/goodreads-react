// return popularbooks
import ListPopularAuthors from "../../../components/Popular/PopularAuthors";
import ListPopularBooks from '../../../components/Popular/PopularBooks';
import '../../../App.css'
const Home = () => {
  return (
    <>
      <ListPopularAuthors />
      <hr/>
      <ListPopularBooks />
    </>
  );
};

export default Home;
