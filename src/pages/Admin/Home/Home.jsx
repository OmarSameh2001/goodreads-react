import ListPopularAuthors from "../../../components/Popular/PopularAuthors";
import ListPopularBooks from "../../../components/Popular/PopularBooks";
import ListPopularCategories from "../../../components/Popular/PopularCategories";
function AdminHome() {
  return (
    <>
      <ListPopularAuthors user={"admin"}/>
      <hr />
      <ListPopularBooks user={"admin"}/>
      <hr />
      <ListPopularCategories user={"admin"}/>
    </>
  );
}

export default AdminHome;
