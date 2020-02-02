import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router';
import { useAuth } from "../../context/auth";
import { useRole } from "../../context/role";





const BasicLayout = (props) => {
  let history = useHistory();
  const { setAuthTokens } = useAuth();
  // const [isLoggedIn, setLoggedIn] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");
  const authTokens = localStorage.getItem("tokens");
  const { setRole } = useRole();

  function logOut () {
    // alert(authTokens);
    if (isLoggedIn !== 'true'){
      alert('You are not logged in !');
    } else {

    setAuthTokens();
    setRole();
    // setLoggedIn(false);
    // localStorage.setItem("tokens", JSON.stringify());
    // localStorage.setItem("isLoggedIn", JSON.stringify());
    // localStorage.setItem("role", JSON.stringify());
    localStorage.clear();
    console.log(isLoggedIn);
    alert('Logged out!');
    // window.location.reload("#layout");    
    history.push({
      pathname: '/'})
    }
  }

  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;
  // if (!isLoggedIn){

  // }

  return (

    <Layout id='layout'>
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to="/">ITRIP</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/destinations">DESTINATIONS</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/posts">COMMUNITY</Link></Menu.Item>
        
        { isLoggedIn !== 'true' && <Menu.Item key="4"><Link to="/signin">SIGNIN</Link></Menu.Item>}

        { isLoggedIn === 'true' && <Menu.Item key="5"><Link to={{pathname : "/profile/" + localStorage.getItem("username"), state : {username: localStorage.getItem("username")}}}>MY PROFILE</Link></Menu.Item>}
        
        { role === 'manager' && <Menu.Item key="6"><Link to="/manager">MANAGER</Link></Menu.Item>}
        
        { isLoggedIn === 'true' && <Menu.Item key="7" onClick={logOut}>SIGNOUT</Menu.Item>}
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="global" />
                CATEGORIES
              </span>
            }
          >
            <Menu.Item key="1"><Link to="/hotattractions">TOP ATTRACTIONS</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/hothotels">TOP HOTELS</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/hotrestaurants">TOP RESTAURANTS</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/autoplanner">AUTOPLANNER</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="team" />
                COMMUNITY
              </span>
            }
          >
            <Menu.Item key="5"><Link to={{pathname : "/profile", state : {username: localStorage.getItem("username")}}}>MY PROFILE</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/posts">POSTS</Link></Menu.Item>

          </SubMenu>
          {/* <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="notification" />
                subnav 3
              </span>
            }
          >
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>
       
       <Layout style={{ padding: '0 24px 24px' }}>
         <Breadcrumb style={{ margin: '16px 0' }}>
           {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
           <Breadcrumb.Item>List</Breadcrumb.Item>
           <Breadcrumb.Item>App</Breadcrumb.Item> */}
         </Breadcrumb>
         <Content
           style={{
             background: '#fff',
             padding: 24,
             margin: 0,
             minHeight: 280,
           }}
         >
          
         {props.children}



         </Content>
       </Layout>

    </Layout>
  </Layout>

    );
}


export default BasicLayout;

  