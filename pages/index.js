import MeetupList from '../components/meetups/MeetupList';
import {MongoClient} from 'mongodb'
import Head from 'next/head'

function HomePage(props) {
  return(
    <>
      <Head>
        <title>React Meetup</title>
        <meta 
          name="description"
          content="Browse a huge list of highly active React Meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  ) 
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    'mongodb+srv://gedharizka:lT8Yjp3iNmrUnBrN@cluster0.fjxcj.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups =  await meetupsCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map((meetup)=>({
        title:meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
        description: meetup.description

      }))
    },
    revalidate: 1
  }; 
}

export default HomePage;
