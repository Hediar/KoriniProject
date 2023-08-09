import React from 'react';

const Main = () => {
  const email = localStorage.getItem('email');

  return (
    <div>
      <h1>메인 페이지</h1>
      {email && <p>로그인한 이메일: {email}</p>}
    </div>
  );
};

export default Main;
