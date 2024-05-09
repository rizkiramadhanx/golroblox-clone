import { notFound } from "next/navigation"

export async function getServerSideProps(context: any) {


  const { id } = context.query;

  const res = await fetch("https://jsonplaceholder.typicode.com/todos/"+ id)

  if (!res.ok) {
    return {
      notFound: true
    }
  }
  const data = await res.json()

  return {
    props: { message: `Next.js is awesome`, data: data, id: id}, // will be passed to the page component as props
  }
}

export default function ssr({ message, data ,id}: any) {

  return <div>
    {message} {JSON.stringify(data)} {JSON.stringify(id)}
  </div>

}