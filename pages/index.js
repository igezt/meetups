import React, { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import { MongoClient } from "mongodb";
import Head from "next/head";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://www.comp.nus.edu.sg/images/resources/20190225_School_Facade_About_Page.jpg",
    address: "NUS School of Computing, COM1, 13, Computing Dr, 117417",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://www.comp.nus.edu.sg/images/resources/20190225_School_Facade_About_Page.jpg",
    address: "NUS School of Computing, COM1, 13, Computing Dr, 117417",
    description: "This is a second meetup",
  },
];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups."
        />
      </Head>
      <MeetupList meetups={props.meetings} />;
    </>
  );
};

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://1234:1234@nextjs.t5ovj8w.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = (await meetupsCollection.find().toArray()).map((meetup) => ({
    title: meetup.title,
    address: meetup.address,
    image: meetup.image,
    id: meetup._id.toString(),
  }));

  client.close();

  return {
    props: {
      meetings: meetups,
    },
  };
}

// export async function getServerSideProps({ req: request, res: result }) {
//   // fetch data from an API

//   const client = MongoClient.connect(
//     "mongodb+srv://1234:1234@nextjs.t5ovj8w.mongodb.net/meetups?retryWrites=true&w=majority"
//   );

//   const db = client.db();

//   const meetupsCollection = db.collection("meetups");

//   await meetupsCollection.find();

//   return {
//     props: {
//       meetings: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
