import type { FC } from "react";
import Link from "next/link";
import Typography from "@/components/Typography";
import { Container, CategoryList } from "./styledComponents";

type Props = {
  categories: string[];
};

const Categories: FC<Props> = ({ categories }) => {
  return (
    <Container>
      <CategoryList>
        {categories.map((category, index) => (
          <li key={`${index}-${category}`}>
            <Link href={`/snippets/category/${category}`}>
              <Typography variant="body" component="span">
                {category}
              </Typography>
            </Link>
          </li>
        ))}
      </CategoryList>
    </Container>
  );
};

export default Categories;
