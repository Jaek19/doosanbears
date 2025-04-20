import React from "react";
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const menuItems = [
  {
    title: "BEARS",
    path: '/bears',
    subMenu: [
       {title: '구단 소개', path: '/bears/intro'},
       {title: '베어스 스토리', path: '/bears/story'},
       {title: '베어스 브랜드', path: '/bears/brand'},
       {title: '베어스 홈구장', path: '/bears/stadium'},
       {title: '스폰/제휴사 소개', path: '/bears/partner'},
       {title: '전자공고', path: '/bears/announce'}
    ]
  },
  {
    title: "PLAYER",
    path: '/member',
    subMenu: [
      {title: '코칭스태프', path: '/member/coachstaff'},
      {title: '투수', path: '/member/pitchers'},
      {title: '타자', path: '/member/batters'},
      {title: '육성선수', path: '/member/education'}
    ]
  },
  {
    title: "GAME",
    path: '/game',
    subMenu: [
      {title: '1군 경기일정', path: '/game/first'},
      {title: '퓨처스 경기일정', path: '/game/futures'},
      {title: '응원단', path: '/game/cheering'},
    ]
  },
  {
    title: 'STATS',
    path: '/stats',
    subMenu: [
      {title: '팀기록', path: '/stats/team'},
      {title: '선수기록', path: '/stats/player'},
      {title: '예상달성기록', path: '/stats/expect'},
      {title: '역대구단성적', path: '/stats/history'},
    ]
  },
  {
    title: 'STORY',
    path: '/doorundoorun',
    subMenu: [
      {title: '블로그', path: '/doorundoorun/blog'},
      {title: 'BEARS TV', path: '/doorundoorun/bearstv'},
      {title: '갤러리', path: '/doorundoorun/gallery'},
      {title: '이벤트', path: '/doorundoorun/event'},
      {title: '공지사항', path: '/doorundoorun/notice'},
      {title: '구단소식', path: '/doorundoorun/news'},
    ]
  },
  {
    title: 'TICKET',
    path: '/ticket',
    subMenu: [
      {title: '티켓예매', path: '/ticket/buy'},
      {title: '단체관람', path: '/ticket/group'},
      {title: '베어스라운지', path: '/ticket/lounge'},
      {title: '시즌권', path: '/ticket/season'},
    ]
  },
 
  {
    title: 'FAN',
    path: '/fan',
    subMenu: [
      {title: '응원하기', path: '/fan/cheer'},
      {title: 'SHOP', path: '/fan/shop'},
    ]
  }
];

// timeout을 컴포넌트 외부에 선언
let closeTimeout = null;

const Navbar = () => {
  const [current, setCurrent] = useState(null);
  const [bead, setBead] = useState(0);
  const [menuPositions, setMenuPositions] = useState([]);
  const [isSubmenuHovered, setIsSubmenuHovered] = useState(false);
  const [navActive, setNavActive] = useState(false);
  
  // 메뉴 위치 계산 함수
  const calculateMenuPositions = () => {
    const menuElements = document.querySelectorAll('.navbar-menu-item');
    const positions = Array.from(menuElements).map(el => {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left,
        width: rect.width,
        center: rect.left + rect.width / 2
      };
    });
    setMenuPositions(positions);
    
    if (current !== null && positions[current]) {
      setBead(positions[current].center);
    }
  };
  
  useEffect(() => {
    calculateMenuPositions();
    
    window.addEventListener('resize', calculateMenuPositions);
    return () => window.removeEventListener('resize', calculateMenuPositions);
  }, []);
  
  useEffect(() => {
    if (current !== null && menuPositions[current]) {
      setBead(menuPositions[current].center);
    }
  }, [current, menuPositions]);
  
  // 마우스가 래퍼 영역을 벗어나면 메뉴 닫기 (단, 딜레이 적용)
  const handleNavLeave = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    closeTimeout = setTimeout(() => {
      if (!isSubmenuHovered) {
        setCurrent(null);
        setNavActive(false); // 비활성화
      }
    }, 500);
  };
  
  // 서브메뉴에서 마우스가 떠날 때
  const handleSubmenuLeave = () => {
    setIsSubmenuHovered(false);
    if (closeTimeout) clearTimeout(closeTimeout);
    setCurrent(null);
    setNavActive(false); 
  };
  
  const handleSubmenuEnter = () => {
    setIsSubmenuHovered(true);
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
    setNavActive(true); // 활성화
  };
  
  // 메인 메뉴에 마우스 진입 시
  const handleMenuEnter = (idx) => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setCurrent(idx);
    setNavActive(true);
  };
  
  return (
    <div className="navbar-container">
      <nav
        className={`navbar ${navActive ? 'active' : ''}`}
        onMouseLeave={handleNavLeave}
      >
        <div className="navbar-logo">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="bears_logo"/>
          </Link>
        </div>
        <ul className="navbar-menu">
          {menuItems.map((item, idx) => (
            <li
              className={`navbar-menu-item ${current === idx ? 'active' : ''}`}
              key={item.title}
              onMouseEnter={() => handleMenuEnter(idx)}
            >
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <div className="navbar-underline">
          <div
            className="navbar-bead"
            style={{left: bead, opacity: current !== null ? 1 : 0}}
          ></div>
        </div>
      </nav>
      
      {/* submenu */}
      <div
        className={`navbar-submenu-bar ${current !== null ? 'show' : ''}`}
        onMouseEnter={handleSubmenuEnter}
        onMouseLeave={handleSubmenuLeave}
      >
        {current !== null && menuPositions[current] && (
          <div
            className="submenu-items-container"
            style={{
              left: menuPositions[current].left, 
              width: menuPositions[current].width
            }}
          >
            {menuItems[current].subMenu.map((sub, idx) => (
              <Link 
                to={sub.path} 
                key={sub.title} 
                className="navbar-submenu-item" 
                style={{transitionDelay: `${0.05 + (idx * 0.05)}s`}}>
                  {sub.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;