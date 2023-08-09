import React from 'react';

const Main = () => {
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.removeItem('email');
    window.location.reload();
  };

  return (
    <div>
      <h1>메인 페이지</h1>
      {email ? (
        <div>
          <p>로그인한 이메일: {email}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <p>로그인 후 이용해주세요.</p>
      )}
    </div>
  );
};

export default Main;
