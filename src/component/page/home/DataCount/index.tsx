import { Container, SimpleGrid } from "@mantine/core";
import styles from './datacount.module.css'

type cardCountType = {
  count: number;
  title: string;
  description: string
  navlink: string
  link: string
}

const CardCount = ({ count, title, description, navlink, link }: cardCountType) => {
  return (<div className={styles.card}>
    <div className={styles.count}>{count}</div>
    <div className={styles.title}>{title}</div>
    <div className={styles.description}>{description}</div>
    <div className={styles.navlink}>{navlink}</div>
  </div>)
}

const dataCount: Omit<cardCountType, "link">[] = [{
  count: 128282,
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque debitis magni autem aliquam omnis quidem inventore officia tenetur distinctio ea, eveniet sunt, impedit amet reiciendis obcaecati cupiditate placeat earum temporibus?",
  title: 'Data Beli',
  navlink: 'Klik Disini'
},
{
  count: 128282,
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque debitis magni autem aliquam omnis quidem inventore officia tenetur distinctio ea, eveniet sunt, impedit amet reiciendis obcaecati cupiditate placeat earum temporibus?",
  title: 'Data Beli',
  navlink: 'Klik Disini'

},
{
  count: 128282,
  description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque debitis magni autem aliquam omnis quidem inventore officia tenetur distinctio ea, eveniet sunt, impedit amet reiciendis obcaecati cupiditate placeat earum temporibus?",
  title: 'Data Beli',
  navlink: 'Klik Disini'

}]

export default function DataCount() {
  return (<Container fluid
    px={{
      base: '20',
      sm: 100
    }}
    py={24}
    maw={1800}

    w='100%' >
    <SimpleGrid cols={{base: 1, md: 3}} spacing={24}>
      {dataCount.map((data, key) => <CardCount key={key} count={data.count} description={data.description} navlink={data.navlink} link="kaa" title={data.title} />)}
    </SimpleGrid>
  </Container>);
}