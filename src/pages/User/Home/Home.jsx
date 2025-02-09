// return popularbooks
import ListPopularAuthors from "../../../components/Popular/PopularAuthors";
import ListPopularBooks from '../../../components/Popular/PopularBooks';
import ListPopularCategories from "../../../components/Popular/PopularCategories";
const Home = () => {
  return (
    <div style={{backgroundColor: "#f4f7fc"}}>
      <ListPopularAuthors />
      <hr/>
      <ListPopularBooks />
      <hr/>
      <ListPopularCategories/>
    </div>
  );
};

export default Home;
