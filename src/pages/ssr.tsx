export async function getServerSideProps(context: any) {
  return {
    props: { message: `Next.js is awesome` }, // will be passed to the page component as props
  }
}

export default function ssr({ message }: any) {
  
  return <div>
    {message}
  </div>

}