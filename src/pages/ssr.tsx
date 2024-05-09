export async function getServerSideProps(context: any) {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")

  const data = await res.json()

  return {
    props: { message: `Next.js is awesome`, data: data }, // will be passed to the page component as props
  }
}

export default function ssr({ message, data }: any) {

  return <div>
    {message} { JSON.stringify(data)}
  </div>

}