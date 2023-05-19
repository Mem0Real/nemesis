import Link from "next/link";
import { useRouter } from "next/router";

const Categories = () => {
  const router = useRouter();

  const { cat } = router.query;

  let title = cat;
  return <h1>Categoris</h1>;
};
