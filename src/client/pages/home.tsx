import React from 'react';
import { NextPage } from 'next';

// import useSession from "../hooks/use-session"

const Home: NextPage<{ data: string }> = (props) => {
  const { data } = props;
  // const {isAuthenticated} = useSession() 
  // console.log({isAuthenticated})


  return (
    <div>
      <h1>Hello from NextJS! - Home</h1>
      {data}
    </div>
  );
};

Home.getInitialProps = ({ query }) => {
  return {
    data: `some initial props including query params and controller data: ${JSON.stringify(
      query,
    )}`,
  };
};

export default Home;
