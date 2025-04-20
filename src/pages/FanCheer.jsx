import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FanCheer.css';

const FanCheer = () => {
  const [cheers, setCheers] = useState([]);
  const [input, setInput] = useState({ nickname: "", message: "" });

  // 응원 메시지 불러오기
  const fetchCheers = async () => {
    try {
      const res = await axios.get('https://guest3-00001-9np-1007621736298.us-central1.run.app/api/cheers');
      console.log(res.data);
      setCheers(res.data);
    } catch (error) {
      console.error("응원 메시지 불러오기 실패:", error);
    }
  };

  // 메시지 등록
  const submitCheer = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://guest3-00001-9np-1007621736298.us-central1.run.app/api/cheers', input);
      setInput({ nickname: "", message: "" });
      fetchCheers(); // 새로고침
    } catch (error) {
      console.error("응원 메시지 등록 실패:", error);
    }
  };

  useEffect(() => {
    fetchCheers();
  }, []); // 빈 배열로 마운트 시 1회만 실행

  return (
    <div className="cheer-container">
      <h1>⚾ BEARS 응원의 한마디</h1>
      
      <form onSubmit={submitCheer} className="cheer-form">
        <input
          type="text"
          placeholder="닉네임 (최대 10자)"
          value={input.nickname}
          onChange={(e) => setInput({ ...input, nickname: e.target.value.slice(0, 10) })}
          required
        />
        <textarea
          placeholder="응원 메시지를 남겨주세요! (최대 100자)"
          value={input.message}
          onChange={(e) => setInput({ ...input, message: e.target.value.slice(0, 100) })}
          required
        />
        <button type="submit">응원하기</button>
      </form>

      <div className="cheer-list">
        {cheers.map((cheer) => (
          <div key={cheer.id} className="cheer-item">
            <h3>{cheer.nickname}</h3>
            <p>{cheer.message}</p>
            <span>{new Date(cheer.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FanCheer;
