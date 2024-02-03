import React from 'react';
import { NextPage } from 'next';
import { Header } from '../components/Header';

const Admin: NextPage<{ data: string }> = (props) => {
  const { data } = props;

  return (
    <div>
      <Header />
      {data}
    </div>
  );
};

Admin.getInitialProps = ({ query }) => {
  return {
    data: `some initial props including query params and controller data: ${JSON.stringify(
      query,
    )}`,
  };
};

export default Admin;
