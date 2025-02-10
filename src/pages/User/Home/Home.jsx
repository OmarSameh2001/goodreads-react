// return popularbooks
import HeroSection from "../../../components/Hero/Hero";
import ListPopularAuthors from "../../../components/Popular/PopularAuthors";
import ListPopularBooks from '../../../components/Popular/PopularBooks';
import ListPopularCategories from "../../../components/Popular/PopularCategories";
const Home = () => {
  return (
    <div style={{backgroundColor: "#f4f7fc"}}>
      <HeroSection />
      <ListPopularAuthors />
      <ListPopularBooks />
      {/* <ListPopularCategories/> */}
    </div>
  );
};

export default Home;
